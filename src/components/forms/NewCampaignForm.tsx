import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCreateCampaign } from "@/hooks/useCampaigns";
import { toast } from "sonner";


const campaignFormSchema = z.object({
  name: z.string().min(3, "Campaign name must be at least 3 characters."),
  goal: z.string().min(5, "Campaign goal must be at least 5 characters."),
  audience_description: z.string().min(10, "Audience description must be at least 10 characters."),
});

type CampaignFormValues = z.infer<typeof campaignFormSchema>;

interface NewCampaignFormProps {
  onFormSubmit: () => void;
}

export function NewCampaignForm({ onFormSubmit }: NewCampaignFormProps) {
  const createCampaignMutation = useCreateCampaign();

  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      name: "",
      goal: "",
      audience_description: "",
    },
  });

  const onSubmit = (data: CampaignFormValues) => {
    createCampaignMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Campaign created successfully!");
        onFormSubmit(); // Close the dialog on success
      },
      onError: (error) => {
        toast.error("Failed to create campaign", {
          description: error.message,
        });
      }
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold text-gray-900">
          Create New Campaign
        </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Campaign Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Product Demo Outreach" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="goal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Campaign Goal</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Get 10 product demos" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="audience_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Audience Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., B2B SaaS founders with 10-50 employees..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="pt-4">
            <DialogClose asChild>
                <Button type="button" variant="outline">
                    Cancel
                </Button>
            </DialogClose>
            <Button type="submit" disabled={createCampaignMutation.isPending}>
              {createCampaignMutation.isPending ? "Creating..." : "Create Campaign"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
