import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { setAuthToken } from '../utils/api';

const AuthSync = () => {
    const { getToken, isSignedIn } = useAuth();

    useEffect(() => {
        const syncToken = async () => {
            if (isSignedIn) {
                const token = await getToken();
                setAuthToken(token);
            } else {
                setAuthToken(null);
            }
        };

        // Initial sync
        syncToken();

        // Refresh token periodically (every 1 minute)
        const interval = setInterval(syncToken, 60000);
        return () => clearInterval(interval);
    }, [getToken, isSignedIn]);

    return null;
};

export default AuthSync;
