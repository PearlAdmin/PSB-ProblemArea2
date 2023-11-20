"use client";
import { useRouter } from 'next/navigation';
import { Cookies } from 'react-cookie';
import { useEffect } from 'react';

const Session = () => {
    const cookies = new Cookies();
    const router = useRouter();
    const basePath = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect( () => {
        const checkUserCookie = async () => {
            if (!cookies.get('user')) {
                console.log('No user cookie found! Redirecting to login page...');
                router.push(basePath + '/login');
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

    return null;
}

export default Session;