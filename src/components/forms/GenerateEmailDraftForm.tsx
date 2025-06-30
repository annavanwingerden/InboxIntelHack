import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Wand2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Add props for campaignGoal and audience
type GenerateEmailDraftFormProps = {
  campaignGoal: string;
  audience: string;
};

export function GenerateEmailDraftForm({ campaignGoal, audience }: GenerateEmailDraftFormProps) {
  const [generatedDraft, setGeneratedDraft] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Remove prompt from form schema, no need for user input

  async function onSubmit() {
    setIsLoading(true);
    setGeneratedDraft(null);
    const toastId = toast.loading('Generating email draft...');

    try {
      const { data, error } = await api.generateDraft({ campaignGoal, audience });
      if (error) {
        throw new Error(error.message);
      }
      const draftContent = data?.draft?.body || 'No content generated.';
      setGeneratedDraft(draftContent);
      toast.success('Draft generated successfully!', { id: toastId });
    } catch (error: any) {
      toast.error('Failed to generate draft', { id: toastId, description: error.message });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={e => { e.preventDefault(); onSubmit(); }} className="space-y-4">
        <Button type="submit" disabled={isLoading} className="w-full">
          <Wand2 className="mr-2 h-4 w-4" />
          {isLoading ? 'Generating...' : 'Generate Draft'}
        </Button>
      </form>
      {(isLoading || generatedDraft) && (
        <div className="space-y-2 pt-4">
          <Label>Generated Draft</Label>
          <div className="border rounded-md p-4 bg-gray-50 min-h-[200px]">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : (
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{generatedDraft}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 