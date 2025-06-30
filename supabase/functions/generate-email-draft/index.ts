import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 1. Initialize clients and get the authenticated user
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )
    const { data: { user } } = await supabase.auth.getUser()
    // Allow service role key to bypass user check
    const isServiceRole = req.headers.get('Authorization')?.includes(Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'))
    if (!user && !isServiceRole) {
      throw new Error("User not authenticated");
    }

    // 2. Get request body
    const { campaignGoal, audience, thread_context, user_notes } = await req.json();
    
    if (!campaignGoal || !audience) {
      return new Response(JSON.stringify({ error: 'Campaign goal and audience are required' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    // 3. Get OpenAI API key
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) {
      throw new Error("OpenAI API key not configured");
    }

    // 4. Craft the prompt
    const personalization = '\nUse the following placeholders in the email:\n- [First Name] for the recipient\'s first name\n- [Company] for the recipient\'s company name (if available)\n- [Sender] for your name in the signature.';
    let prompt;
    if (thread_context && user_notes) {
      // Prompt for generating a follow-up email
      prompt = `You are an expert cold outreach specialist. A reply has been received for a cold email. Your task is to draft a follow-up email.\n\nOriginal Campaign Goal: ${campaignGoal}\nOriginal Target Audience: ${audience}${personalization}\n\nHere is the email thread so far:\n---\n${thread_context}\n---\n\nHere are the user's notes on the reply:\n---\n${user_notes}\n---\n\nRequirements:\n- Use the placeholders [First Name], [Company], and [Sender] in the subject and body where appropriate.\n- Do NOT use any real names.\n- Acknowledge the user's notes and the context of the reply.\n- Align the follow-up with the original campaign goal.\n- Keep it concise, professional, and under 150 words.\n- Include a clear call-to-action.\n\nGenerate a follow-up email that includes only the subject line and the email body. Do NOT include any labels like 'Subject Line:' or 'Subject:'. The body should not repeat the subject line. Personalize the greeting and signature using the placeholders.`;
    } else {
      // Original prompt for generating a cold email
      prompt = `You are an expert cold outreach specialist. Create a compelling, personalized cold email based on the following information:\n\nCampaign Goal: ${campaignGoal}\nTarget Audience: ${audience}${personalization}\n\nRequirements:\n- Use the placeholders [First Name], [Company], and [Sender] in the subject and body where appropriate.\n- Do NOT use any real names.\n- Keep it under 150 words\n- Make it personal and relevant to the audience\n- Include a clear call-to-action\n- Be professional but conversational\n- Avoid generic templates\n- Focus on value proposition\n\nGenerate a cold email that includes only the subject line and the email body. Do NOT include any labels like 'Subject Line:' or 'Subject:'. The body should not repeat the subject line. Personalize the greeting and signature using the placeholders.`;
    }

    // 5. Call OpenAI API
    const modelParams = {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert cold outreach specialist who creates compelling, personalized emails."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    };

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(modelParams)
    });

    if (!openaiResponse.ok) {
      const errorBody = await openaiResponse.text();
      console.error("OpenAI API error:", errorBody);
      throw new Error(`OpenAI API error: ${openaiResponse.status}`);
    }

    const openaiData = await openaiResponse.json();
    const generatedContent = openaiData.choices[0]?.message?.content;

    if (!generatedContent) {
      throw new Error("No content generated from OpenAI");
    }

    // 6. Parse the generated content (expecting JSON)
    let parsedEmail;
    try {
      parsedEmail = JSON.parse(generatedContent);
    } catch {
      // If JSON parsing fails, try to extract subject and body from text
      const lines = generatedContent.split('\n').map(l => l.trim());
      // Find the first non-empty line as subject
      const subjectIdx = lines.findIndex(line => line.length > 0);
      let subject = lines[subjectIdx] || "Cold Outreach";
      // Remove any 'Subject Line:' or 'Subject:' prefix
      subject = subject.replace(/^(Subject Line:|Subject:)\s*/i, '');
      // Body is everything after the subject line, skipping any subject label lines
      let bodyLines = lines.slice(subjectIdx + 1);
      // Remove any line that starts with 'Subject Line:' or 'Subject:'
      bodyLines = bodyLines.filter(line => !/^Subject( Line)?:/i.test(line));
      const body = bodyLines.join('\n').trim();
      parsedEmail = {
        subject,
        body
      };
    }

    // 7. Clean the fields
    function cleanField(str) {
      if (typeof str !== 'string') return str;
      // Remove leading/trailing quotes
      str = str.trim();
      if (str.startsWith('"') && str.endsWith('"')) {
        str = str.slice(1, -1);
      }
      // Replace escaped newlines with real newlines
      str = str.replace(/\\n/g, '\n');
      // Remove accidental double quotes inside
      str = str.replace(/^"+|"+$/g, '');
      // Remove any 'Subject Line:' or 'Subject:' prefix
      str = str.replace(/^(Subject Line:|Subject:)\s*/i, '');
      return str;
    }

    parsedEmail.subject = cleanField(parsedEmail.subject);
    parsedEmail.body = cleanField(parsedEmail.body);
    // Fix formatting: replace single newlines within paragraphs with a space, keep double newlines as paragraph breaks
    parsedEmail.body = parsedEmail.body
      .replace(/\r\n/g, '\n') // Normalize line endings
      .replace(/([^\n])\n([^\n])/g, '$1 $2');

    // 8. Return the generated email
    return new Response(JSON.stringify({
      success: true,
      email: parsedEmail
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (err) {
    console.error("Error in generate-email-draft function:", err);
    return new Response(JSON.stringify({ 
      error: err.message || 'An error occurred while generating the email draft'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}) 