import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Helper to extract email from 'Name <email@domain.com>' or just return the email
function extractEmail(address: string): string {
  const match = address.match(/<([^>]+)>/);
  return match ? match[1] : address.trim();
}

serve(async (req) => {
  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 1. Get all replies where followed_up = false
    const { data: replies, error: repliesError } = await supabaseAdmin
      .from('replies')
      .select('*')
      .eq('followed_up', false);

    if (repliesError) throw new Error(`DB error fetching replies: ${repliesError.message}`);

    let processed = 0;
    for (const reply of replies) {
      // Extract just the email address from from_address
      const leadEmail = extractEmail(reply.from_address);
      // 2. Find the corresponding lead
      const { data: leads, error: leadError } = await supabaseAdmin
        .from('leads')
        .select('*')
        .ilike('email', leadEmail)
        .eq('campaign_id', reply.campaign_id);
      if (leadError || !leads || leads.length === 0) {
        console.error(`Could not find lead for reply: ${reply.id} (email: ${leadEmail}, campaign: ${reply.campaign_id})`);
        continue;
      }
      const lead = leads[0];
      if (!lead.goal_met && lead.emails_sent_count < 3) {
        // 3. Get campaign info
        const { data: campaign, error: campaignError } = await supabaseAdmin
          .from('campaigns')
          .select('goal, audience_description')
          .eq('id', reply.campaign_id)
          .single();
        if (campaignError) {
          console.error(`Could not fetch campaign info: ${campaignError.message}`);
          continue;
        }
        // 4. Generate follow-up email
        const genRes = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/generate-email-draft`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            campaignGoal: campaign.goal,
            audience: campaign.audience_description,
            thread_context: reply.snippet,
            user_notes: reply.snippet,
            campaignId: reply.campaign_id,
          }),
        });
        if (!genRes.ok) {
          console.error(`Failed to generate follow-up email: ${await genRes.text()}`);
          continue;
        }
        const { email: generatedEmail } = await genRes.json();
        // 5. Send the follow-up email
        const emailPayload = {
          recipientEmail: lead.email,
          subject: generatedEmail.subject,
          body: generatedEmail.body,
          campaignId: reply.campaign_id,
          threadId: reply.thread_id,
          inReplyTo: reply.message_id,
          references: reply.message_id,
          fromAddress: lead.email
        };
        console.log('Sending follow-up email with payload:', emailPayload);
        const sendRes = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-email`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailPayload),
        });
        if (!sendRes.ok) {
          console.error(`Failed to send follow-up email: ${await sendRes.text()}`);
          continue;
        }
        // 6. Update lead and reply
        await supabaseAdmin
          .from('leads')
          .update({ emails_sent_count: lead.emails_sent_count + 1 })
          .eq('id', lead.id);
        await supabaseAdmin
          .from('replies')
          .update({ followed_up: true })
          .eq('id', reply.id);
        processed++;
      }
    }
    return new Response(
      JSON.stringify({ success: true, message: `Processed ${processed} follow-up(s).` }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Error in followup-processor function:", err.message || err);
    return new Response(
      JSON.stringify({ error: err.message || String(err) }),
      { headers: { "Content-Type": "application/json" }, status: 500 },
    );
  }
}); 