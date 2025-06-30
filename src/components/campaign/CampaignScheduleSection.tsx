import { useState, useEffect } from "react";
import { Calendar, Edit, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { api } from '@/lib/api';

interface CampaignScheduleSectionProps {
  campaignId: string;
  onScheduleUpdate: (startDate: string, endDate: string, isUserAction?: boolean) => void;
}

export function CampaignScheduleSection({ campaignId, onScheduleUpdate }: CampaignScheduleSectionProps) {
  console.log('CampaignScheduleSection campaignId:', campaignId);
  const [isEditing, setIsEditing] = useState(false);
  const [draftStartDate, setDraftStartDate] = useState<Date | undefined>(undefined);
  const [draftEndDate, setDraftEndDate] = useState<Date | undefined>(undefined);
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch schedule on mount
  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);
      setError(null);
      console.log('Fetching schedule for campaignId:', campaignId);
      try {
        const schedule = await api.fetchCampaignSchedule(campaignId);
        console.log('Schedule fetch result:', schedule);
        if (schedule) {
          setStartDate(schedule.start_date);
          setEndDate(schedule.end_date);
          setDraftStartDate(schedule.start_date ? new Date(schedule.start_date) : undefined);
          setDraftEndDate(schedule.end_date ? new Date(schedule.end_date) : undefined);
          onScheduleUpdate(schedule.start_date, schedule.end_date, false);
        } else {
          // No schedule found, allow user to create one
          setStartDate(undefined);
          setEndDate(undefined);
          setDraftStartDate(undefined);
          setDraftEndDate(undefined);
          onScheduleUpdate(undefined, undefined, false);
        }
      } catch (err: unknown) {
        console.error('Error fetching schedule:', err);
        if (typeof err === 'object' && err && 'code' in err && (err as { code?: string }).code !== 'PGRST116') {
          setError((err as { message?: string }).message || 'Failed to fetch schedule.');
        }
      }
      setLoading(false);
      console.log('Loading set to false');
    };
    if (campaignId) fetchSchedule();
    // eslint-disable-next-line
  }, [campaignId]);

  const startEditing = () => {
    const today = new Date();
    const weekFromToday = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    setDraftStartDate(startDate ? new Date(startDate) : today);
    setDraftEndDate(endDate ? new Date(endDate) : weekFromToday);
    setIsEditing(true);
  };

  const saveSchedule = async () => {
    if (!campaignId) {
      setError('Campaign ID is missing!');
      return;
    }
    if (draftStartDate && draftEndDate) {
      setLoading(true);
      setError(null);
      try {
        const saved = await api.saveCampaignSchedule(
          campaignId,
          draftStartDate.toISOString().split('T')[0],
          draftEndDate.toISOString().split('T')[0]
        );
        setStartDate(saved.start_date);
        setEndDate(saved.end_date);
        onScheduleUpdate(saved.start_date, saved.end_date, true);
        setIsEditing(false);
      } catch (err: unknown) {
        setError((err as { message?: string }).message || 'Failed to save schedule.');
      }
      setLoading(false);
    }
  };

  const cancelEditing = () => {
    setDraftStartDate(startDate ? new Date(startDate) : undefined);
    setDraftEndDate(endDate ? new Date(endDate) : undefined);
    setIsEditing(false);
  };

  const handleStartDateChange = (newStartDate: Date | undefined) => {
    setDraftStartDate(newStartDate);
    if (newStartDate && draftEndDate && draftEndDate <= newStartDate) {
      const endDateObj = new Date(newStartDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      setDraftEndDate(endDateObj);
    }
  };

  const handleEndDateChange = (newEndDate: Date | undefined) => {
    if (newEndDate && draftStartDate && newEndDate > draftStartDate) {
      setDraftEndDate(newEndDate);
    } else if (newEndDate && !draftStartDate) {
      setDraftEndDate(newEndDate);
    }
  };

  if (!campaignId) {
    return <div>Loading schedule...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle>Campaign Schedule</CardTitle>
            <CardDescription>
              Set the start and end dates for your campaign
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600 py-4">{error}</div>
        ) : !startDate && !endDate && !isEditing ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-4">No schedule configured</p>
            <Button onClick={startEditing} variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Set Schedule
            </Button>
          </div>
        ) : isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-date" className="mb-2 block">Start Date</Label>
                <DatePicker
                  date={draftStartDate}
                  onSelect={handleStartDateChange}
                  placeholder="Select start date"
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="end-date" className="mb-2 block">End Date</Label>
                <DatePicker
                  date={draftEndDate}
                  onSelect={handleEndDateChange}
                  placeholder="Select end date"
                  className="w-full"
                  disabled={!draftStartDate}
                />
                {draftStartDate && (
                  <p className="text-xs text-gray-500 mt-1">
                    Must be after {draftStartDate.toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={saveSchedule} className="bg-green-600 hover:bg-green-700" disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                Save Schedule
              </Button>
              <Button onClick={cancelEditing} variant="outline" disabled={loading}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Start Date: <span className="font-medium">{startDate ? new Date(startDate).toLocaleDateString() : ''}</span></p>
              <p className="text-sm text-gray-600">End Date: <span className="font-medium">{endDate ? new Date(endDate).toLocaleDateString() : ''}</span></p>
            </div>
            <Button onClick={startEditing} variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Schedule
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
