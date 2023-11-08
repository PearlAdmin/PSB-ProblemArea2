'use client'
import {React, useState} from 'react';
import Head from 'next/head';
import Image from 'next/image';
import signIn from 'next-auth/react';
import { Button, Stack, Form, InputGroup } from 'react-bootstrap';

const getCredentials = async (user) => {
    console.log("hi");
} 


const LogIn = () => {
    const [passwordVisible, setPasswordVisible] = useState(false); 
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const onLogin = async (event) => {
        event.preventDefault();
        const username = credentials.username;
        const password = credentials.password;

        try {
        await signIn('credentials', {
            username, 
            password,
            callbackUrl: '/'
        });
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