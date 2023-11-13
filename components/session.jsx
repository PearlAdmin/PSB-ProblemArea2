"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Cookies } from 'react-cookie';

const Session = () => {
    const cookies = new Cookies();
    const router = useRouter();

    useEffect( () => {
        const checkUserCookie = async () => {
            if (!cookies.get('user')) {
                router.push('/login');
            } else {
                try {
                    const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/api/cookies', {
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
}

export default Session;