-- Add emails_sent_count and goal_met to leads
ALTER TABLE leads
ADD COLUMN emails_sent_count integer NOT NULL DEFAULT 1,
    ADD COLUMN goal_met boolean NOT NULL DEFAULT false;
-- Add followed_up to replies
ALTER TABLE replies
ADD COLUMN followed_up boolean NOT NULL DEFAULT false;