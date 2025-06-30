import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSupabaseClient } from '@/lib/supabaseClient';

const supabase = createSupabaseClient();

const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      if (code) {
        // Gmail OAuth callback
        try {
          const session = (await supabase.auth.getSession()).data.session;
          if (!session) {
            setError('Not authenticated. Please log in first.');
            navigate('/auth');
            return;
          }
          const response = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/gmail-auth-token`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${session.access_token}`,
              },
              body: JSON.stringify({ code }),
            }
          );
          const data = await response.json();
          if (response.ok) {
            navigate('/dashboard');
          } else {
            setError(data.error || 'Failed to connect Gmail.');
            setTimeout(() => navigate('/dashboard'), 2000);
          }
        } catch (err) {
          setError('Unexpected error during Gmail connection.');
          setTimeout(() => navigate('/dashboard'), 2000);
        }
      } else {
        // Supabase auth callback
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          setError('Auth callback error: ' + error.message);
          navigate('/auth?error=auth_callback_failed');
          return;
        }
        if (data.session) {
          navigate('/dashboard');
        } else {
          navigate('/auth');
        }
      }
    };
    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">{error ? error : 'Completing sign in...'}</p>
      </div>
    </div>
  );
};

export default AuthCallback; 