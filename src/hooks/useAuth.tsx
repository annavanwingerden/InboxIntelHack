import { useState, useEffect } from 'react';
import { createSupabaseClient } from '@/lib/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { useQueryClient } from '@tanstack/react-query';

const supabase = createSupabaseClient();

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (_event === 'SIGNED_IN') {
          queryClient.invalidateQueries({ queryKey: ['gmailConnection'] });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [queryClient]);

  return {
    session,
    loading,
    signUp: ({ email, password, options }) => supabase.auth.signUp({ email, password, options }),
    signIn: (params: any) => supabase.auth.signInWithPassword(params),
    signInWithGoogle: () => supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    }),
    signOut: () => supabase.auth.signOut(),
  };
}; 