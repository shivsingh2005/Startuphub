-- Supabase Setup Script - Run this in SQL Editor

-- Create startups table (will fail gracefully if exists)
CREATE TABLE IF NOT EXISTS startups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  domain TEXT,
  stage TEXT DEFAULT 'idea',
  founded_date DATE,
  location TEXT,
  website TEXT,
  linkedin TEXT,
  team_size INTEGER DEFAULT 1,
  looking_for JSONB DEFAULT '[]',
  team_id TEXT UNIQUE,
  founder_id UUID NOT NULL,
  founder_name TEXT,
  execution_score INTEGER DEFAULT 50,
  validation_score INTEGER DEFAULT 50,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE startups ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Anyone can view startups" ON startups;
DROP POLICY IF EXISTS "Founders can insert startups" ON startups;
DROP POLICY IF EXISTS "Founders can update own startups" ON startups;

CREATE POLICY "Anyone can view startups" ON startups FOR SELECT USING (true);
CREATE POLICY "Founders can insert startups" ON startups FOR INSERT WITH CHECK (auth.uid() = founder_id);
CREATE POLICY "Founders can update own startups" ON startups FOR UPDATE USING (auth.uid() = founder_id);

-- Create indexes
DROP INDEX IF EXISTS idx_startups_founder_id;
CREATE INDEX idx_startups_founder_id ON startups(founder_id);

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID UNIQUE NOT NULL,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'founder',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view profiles" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

CREATE POLICY "Anyone can view profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);

-- Create milestones table
CREATE TABLE IF NOT EXISTS milestones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  progress INTEGER DEFAULT 0,
  tasks_completed INTEGER DEFAULT 0,
  total_tasks INTEGER DEFAULT 0,
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view milestones" ON milestones;
DROP POLICY IF EXISTS "Founders can manage milestones" ON milestones;

CREATE POLICY "Anyone can view milestones" ON milestones FOR SELECT USING (true);
CREATE POLICY "Founders can manage milestones" ON milestones FOR ALL USING (
  EXISTS (SELECT 1 FROM startups WHERE id = milestones.startup_id AND founder_id = auth.uid())
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  role TEXT,
  avatar TEXT,
  status TEXT DEFAULT 'active',
  tasks_completed INTEGER DEFAULT 0,
  tasks_assigned INTEGER DEFAULT 0,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view team members" ON team_members;
DROP POLICY IF EXISTS "Founders can manage team members" ON team_members;

CREATE POLICY "Anyone can view team members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Founders can manage team members" ON team_members FOR ALL USING (
  EXISTS (SELECT 1 FROM startups WHERE id = team_members.startup_id AND founder_id = auth.uid())
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
  milestone_id UUID REFERENCES milestones(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo',
  priority TEXT DEFAULT 'medium',
  assignee_id UUID REFERENCES team_members(id) ON DELETE SET NULL,
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view tasks" ON tasks;
DROP POLICY IF EXISTS "Founders can manage tasks" ON tasks;

CREATE POLICY "Anyone can view tasks" ON tasks FOR SELECT USING (true);
CREATE POLICY "Founders can manage tasks" ON tasks FOR ALL USING (
  EXISTS (SELECT 1 FROM startups WHERE id = tasks.startup_id AND founder_id = auth.uid())
);

-- Create pitch_requests table
CREATE TABLE IF NOT EXISTS pitch_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
  investor_name TEXT NOT NULL,
  investor_email TEXT,
  investor_type TEXT,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE pitch_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view pitch requests" ON pitch_requests;
DROP POLICY IF EXISTS "Founders can manage pitch requests" ON pitch_requests;

CREATE POLICY "Anyone can view pitch requests" ON pitch_requests FOR SELECT USING (true);
CREATE POLICY "Founders can manage pitch requests" ON pitch_requests FOR ALL USING (
  EXISTS (SELECT 1 FROM startups WHERE id = pitch_requests.startup_id AND founder_id = auth.uid())
);

-- Function to update updated_at timestamp
DROP FUNCTION IF EXISTS update_updated_at_column();
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
DROP TRIGGER IF EXISTS update_startups_updated_at ON startups;
CREATE TRIGGER update_startups_updated_at BEFORE UPDATE ON startups FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_milestones_updated_at ON milestones;
CREATE TRIGGER update_milestones_updated_at BEFORE UPDATE ON milestones FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_tasks_updated_at ON tasks;
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Done!
SELECT 'Setup complete! Tables created successfully.' as status;
