"use client";
import { useRouter } from 'next/navigation';
import { Cookies } from 'react-cookie';
import { useEffect } from 'react';

/**
 * Session component for checking user authentication and redirecting to the login page if necessary.
 * @component
 * @returns {null} Null component, as it doesn't render anything.
 */
//TODO: Check if this is still being used. 
const Session = () => {
    const cookies = new Cookies();
    const router = useRouter();
    const basePath = process.env.NEXT_PUBLIC_VERCEL_URL;

    useEffect( () => {
        const checkUserCookie = async () => {
            if (!cookies.get('user')) {
                console.log('No user cookie found! Redirecting to login page...');
                router.push(basePath + '/login');
            } else {
                try {
                    const response = await fetch(process.env.NEXT_PUBLIC_VERCEL_URL + '/api/cookies', {
                        cache: 'no-store',
                        method: 'POST',
                        body: JSON.stringify({username: cookies.get('user').username})
                    });

                    if(!response.ok){
                        throw new Error('Please login!');
                    }
                } catch (error) {
                    router.push('/login');
                }
            }
        };
        checkUserCookie();
    }, []);

    return null;
}

export default Session;