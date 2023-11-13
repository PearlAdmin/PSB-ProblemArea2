"use client";

import {React, useState, useEffect} from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Button, Stack, Form, InputGroup } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { Cookies, useCookies } from 'react-cookie';

const LogIn = () => {
    const router = useRouter();
    const [cookies, setCookie] = useCookies(['user']);
    
    useEffect( () => {  
        const userCookie = new Cookies();
        if(userCookie.get('user')){
            //TODO: check if username is still a valid user
            router.push('/');
        }
    }, [])

    const [passwordVisible, setPasswordVisible] = useState(false); 
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const onLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await signIn(credentials);
    
            if(!response.success){
                throw new Error('Invalid credentials');
            }   
            // Sets the cookies
            const username = response.username;
            const role = response.role;
            //TODO: handle remember me when clicked in form
            const rememberMe = false;
            const cookieValue = { username, role, rememberMe};

            setCookie(
                'user',
                JSON.stringify(cookieValue),
                {path: '/'}
            )
            router.push('/');
        } catch (error) {
            console.log(error);
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
                    <Stack gap={2} className="col-md-5 mx-auto" style={{ alignItems: 'center' }}>
                        <Image src="/logo.png" alt="Pearl S Buck Logo" width={150} height={150} draggable='false' /> 
                        <Image src="/name.png" alt="Pearl S Buck Name" width={350} height={50} draggable='false' />
                    </Stack>
                    {/* Login Form */}
                    <Form onSubmit={onLogin}>
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