import { useQuery } from '@tanstack/react-query';
import { createSupabaseClient } from '@/lib/supabaseClient';

const supabase = createSupabaseClient();

const checkGmailConnection = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return false;

    const { count, error } = await supabase
        .from('user_tokens')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', session.user.id);
    
    // PGRST116 means no rows found, which is not an error in this case.
    // We can safely treat it as a valid state where the user has no token.
    if (error && error.code !== 'PGRST116') {
        console.error('Error checking gmail connection:', error);
        return false;
    }
    
    return (count ?? 0) > 0;
};

export const useGmailConnection = () => {
    return useQuery({
        queryKey: ['gmailConnection'],
        queryFn: checkGmailConnection,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}; 