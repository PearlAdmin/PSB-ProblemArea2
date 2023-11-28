"use client";

import {React, useState, useEffect} from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Button, Stack, Form, InputGroup } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { Cookies, useCookies } from 'react-cookie';
import useSWR from 'swr';
import 'components/nav.styles.css';

/**
 * LogIn page. Displays the login page.
 * 
 * @page
 * @return {JSX.Element} The LogIn page.
 */
const LogIn = () => {
    const router = useRouter();
    const [cookies, setCookie] = useCookies(['user']);
    const [passwordVisible, setPasswordVisible] = useState(false); 
    const [isRememberMe, setIsRememberMe] = useState(false);
    const [showIncorrect, setIncorrect] = useState(false);
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const onLogin = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_VERCEL_URL+'/api/login', {
                cache: 'no-store',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: credentials.username,
                    password: credentials.password,
                }),
            });
            
            if (!response.ok) {
                setIncorrect(true);
                throw new Error('Invalid credentials');
            }
            const data = await response.json();
            const username = data.user.username;
            const role = data.user.role;
            const cookieValue = { username, role }

            if(isRememberMe){
                const ageValue = 30 * 24 * 60 * 60;
                setCookie(
                    'user',
                    JSON.stringify(cookieValue),
                    {
                        path: '/',
                        maxAge: ageValue,
                    }
                )
            } else {
                setCookie(
                    'user',
                    JSON.stringify(cookieValue),
                    { 
                        path: '/',
                        expires: 0,
                    }
                )
            }
        
            router.push('/')
        } catch (error) {
            console.log(error);
            return { success: false, error: error.message };
        }
    }


    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div>
            <Head>
                <style dangerouslySetInnerHTML={{ __html: `        
                #showPasswordButton {
                    position: absolute;
                    right: 10px;
                    background-color: transparent;
                    border: none;
                    z-index: 5;
                }

                #submit{
                    width: 100%;
                }

                .primary-text {
                    color: #0D6EFE;
                }
                
                `}} />
            </Head>
            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
                <div className="container" style={{ maxWidth: '600px', padding: '5%', textAlign: 'center' }}>
                    {/* Logo + Name */}
                    <Stack gap={2} className="col mx-auto" style={{ alignItems: 'center' }}>
                        <Image src="/logo.png" alt="Pearl S Buck Logo" width={150} height={150} draggable='false' /> 
                        <span className={`logo-name mb-3 fs-4`}>
                                Pearl S. Buck<span className='logo-name-light'> Foundation Philippines Inc.</span>
                        </span>
                    </Stack>
                    {/* Login Form */}
                    <Form onSubmit={onLogin}>
                        {/* Display if Login is Incorrect */}
                        {showIncorrect && (
                            <div style={{marginBottom: '1.25em', color:'red'}}>Incorrect Username or Password</div>
                        )}
                        {/* Username */}
                        <InputGroup>
                            <Form.Control className="mb-3" 
                                type="text" 
                                placeholder="Username" required 
                                onChange={event => setCredentials({ ...credentials, username: event.target.value})}
                            />
                        </InputGroup>
                        {/* Password */}
                        <InputGroup className="mb-3">
                            <Form.Control
                                type={passwordVisible ? 'text' : 'password'}
                                id="password"
                                placeholder="Password"
                                required
                                value={credentials.password}
                                onChange={(event) =>
                                    setCredentials({ ...credentials, password: event.target.value })
                                }
                            />
                            {/* Hide and Show Password */}
                            <Button
                            variant="light"
                            id="showPasswordButton"
                            onClick={togglePasswordVisibility}
                            >
                                <span className={`primary-text ${passwordVisible ? '' : ''}`}>
                                    {passwordVisible ? 'Hide' : 'Show'}
                                </span>
                            </Button>
                        </InputGroup>
                        {/* Remember Me */}
                        <Form.Check
                            className="mb-3"
                            type="checkbox"
                            id={`remember-me`}
                            label={`Remember Me`}
                            style={{ textAlign: 'left' }}
                            onChange = { (event) => setIsRememberMe(true) }
                        />
                        {/* Login Button */}
                        <Button variant="primary" type="submit" id="submit">Login</Button>{' '}
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default LogIn;