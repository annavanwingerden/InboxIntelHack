import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Wand2, Mail, Edit, Save, X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';

export function EmailTemplateSection({ campaign, onTemplateUpdate, initialTemplate = '' }) {
  // Parse initialTemplate if it's a JSON string with subject/body
  function parseTemplate(template) {
    if (typeof template === 'string') {
      try {
        const obj = JSON.parse(template);
        if (obj && typeof obj === 'object' && 'subject' in obj && 'body' in obj) {
          return obj;
        }
      } catch (e) {
        // Not JSON, treat as plain body
      }
    }
    return { subject: '', body: template || '' };
  }

  const [template, setTemplate] = useState(() => parseTemplate(initialTemplate).body);
  const [subject, setSubject] = useState(() => parseTemplate(initialTemplate).subject);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [draftTemplate, setDraftTemplate] = useState(template);
  const [draftSubject, setDraftSubject] = useState(subject);
  const [error, setError] = useState<string | null>(null);

  // Fetch template from Supabase on mount
  useEffect(() => {
    const fetchTemplate = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await api.fetchEmailTemplate(campaign.id);
        if (data) {
          setTemplate(data.body);
          setSubject(data.subject);
          setDraftTemplate(data.body);
          setDraftSubject(data.subject);
          if (onTemplateUpdate) onTemplateUpdate(data.body);
        }
      } catch (err: unknown) {
        if (typeof err === 'object' && err && 'code' in err && (err as { code?: string }).code !== 'PGRST116') {
          setError((err as { message?: string }).message || 'Failed to fetch template.');
        }
      }
      setIsLoading(false);
    };
    if (campaign?.id) fetchTemplate();
    // eslint-disable-next-line
  }, [campaign?.id]);

  // If initialTemplate changes, update state accordingly
  useEffect(() => {
    const parsed = parseTemplate(initialTemplate);
    setTemplate(parsed.body);
    setSubject(parsed.subject);
    setDraftTemplate(parsed.body);
    setDraftSubject(parsed.subject);
  }, [initialTemplate]);

  const handleGenerateTemplate = async () => {
    if (!campaign.goal || !campaign.audience_description) {
      toast.error("The campaign must have a goal and audience description to generate a template.");
      return;
    }
    setIsLoading(true);
    const toastId = toast.loading('Generating email template...');
    try {
      const payload = {
        campaignGoal: campaign.goal,
        audience: campaign.audience_description,
        campaignId: campaign.id
      };
      const { data, error } = await api.generateDraft(payload);
      if (error) throw new Error(error.message);
      const newBody = data?.email?.body || data?.draft?.body || 'No content generated.';
      const newSubject = data?.email?.subject || data?.draft?.subject || 'No subject.';
      setTemplate(newBody);
      setDraftTemplate(newBody);
      setSubject(newSubject);
      setDraftSubject(newSubject);
      setIsEditing(true);
      if(onTemplateUpdate) onTemplateUpdate(newBody);
      toast.success("Template generated successfully!", { id: toastId });
    } catch (err) {
      toast.error("Failed to generate template", { id: toastId, description: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setDraftTemplate(template);
    setDraftSubject(subject);
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const saved = await api.saveEmailTemplate(campaign.id, draftSubject, draftTemplate);
      setTemplate(saved.body);
      setSubject(saved.subject);
      setIsEditing(false);
      if(onTemplateUpdate) onTemplateUpdate(saved.body);
      toast.success('Template saved!');
    } catch (err: unknown) {
      setError((err as { message?: string }).message || 'Failed to save template.');
    }
    setIsLoading(false);
  };

  const handleCancel = () => {
    setDraftTemplate(template);
    setDraftSubject(subject);
    setIsEditing(false);
  };

  return (
    <Card className="shadow-sm border border-gray-100">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <div>
          <CardTitle>Email Template</CardTitle>
          <CardDescription>
            Craft the initial email for your campaign. Use our AI to generate a draft based on your campaign's goal and audience.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Button onClick={handleGenerateTemplate} disabled={isLoading} size="sm" className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            <Wand2 className="mr-2 h-4 w-4" />
            {isLoading ? 'Generating...' : 'Generate with AI'}
          </Button>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email-template">Email Body</Label>
          {isLoading ? (
            <div className="border rounded-md p-4 bg-gray-50 min-h-[200px]">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ) : (
            <div className="relative">
              {!isEditing ? (
                <div className="border rounded-lg bg-gray-50 p-4 min-h-[200px] flex flex-col gap-4">
                  <div className="flex justify-end mb-2">
                    <Button size="sm" variant="ghost" onClick={handleEdit}>
                      <Edit className="w-4 h-4 mr-1" /> Edit
                    </Button>
                  </div>
                  {/* Subject */}
                  {template && (
                    <div className="mb-2">
                      <span className="block text-xs font-semibold text-gray-500 mb-1">Subject</span>
                      <div className="bg-white border rounded px-3 py-2 text-sm font-medium text-gray-800 select-all">
                        {subject || 'No subject.'}
                      </div>
                    </div>
                  )}
                  {/* Body */}
                  <span className="block text-xs font-semibold text-gray-500 mb-1">Body</span>
                  <div className="bg-white border rounded px-3 py-2 text-sm text-gray-800 whitespace-pre-wrap select-all">
                    {template || 'No template yet. Generate one with AI!'}
                  </div>
                </div>
              ) : (
                <div className="border rounded-lg bg-white p-4 min-h-[200px] flex flex-col gap-2">
                  <Label htmlFor="email-subject">Subject</Label>
                  <Textarea
                    id="email-subject"
                    placeholder="Subject"
                    value={draftSubject}
                    onChange={e => setDraftSubject(e.target.value)}
                    className="min-h-[40px] resize-y mb-2"
                  />
                  <Label htmlFor="email-template">Body</Label>
                  <Textarea
                    id="email-template"
                    placeholder="Your email template will appear here. You can edit it directly."
                    value={draftTemplate}
                    onChange={e => setDraftTemplate(e.target.value)}
                    className="min-h-[150px] resize-y"
                  />
                  <div className="flex gap-2 justify-end mt-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={handleSave} disabled={isLoading}>
                      <Save className="w-4 h-4 mr-1" /> Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancel} disabled={isLoading}>
                      <X className="w-4 h-4 mr-1" /> Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}