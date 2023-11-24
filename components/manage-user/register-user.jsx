"use client";
import { useState } from "react";
import {InputGroup, Button, Form} from '@/components/bootstrap';
import styles from '@/components/create-record/styles.module.css';

/**
 * React component for managing authorized users.
 * @component
 * @returns {JSX.Element} JSX.Element representing the Register component.
 */
const Register = () => {
    /**
     * State to manage the visibility of the password.
     * @type {boolean}
     */
    const [showPassword, setShowPassword] = useState(false);

    /**
     * State to manage the visibility of the password confirmation.
     * @type {boolean}
     */
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    /**
     * Function to toggle the visibility of the password.
     * @function
     */
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    /**
     * Function to toggle the visibility of the password confirmation.
     * @function
     */
    const togglePasswordConfirmation = () => {
        setShowPasswordConfirmation(!showPasswordConfirmation);
    };

    /**
     * State to store user registration data.
     * @type {Object}
     */
    const[data, setData] = useState({});

    /**
     * Handles the form submission for user registration.
     * @async
     * @function
     * @param {Event} e - The form submission event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/manage-user',{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.ok){
            window.location.reload();
            alert("User registered successfully");
        }else{
            alert("Failed to register user");
        }
    }

    return (
        <div>
            <div>                
                <h1 style={{ fontWeight: 'bolder', paddingTop: '10px', paddingBottom: '10px' }}>Register New User</h1>
                <Form action="#" onSubmit={handleSubmit}>
                    <div className="row">
                        {/* Username */}
                        <InputGroup className='mb-3'>
                            <InputGroup.Text>
                                <span className="bi bi-person-fill" style={{ borderColor: 'transparent' }}></span>
                            </InputGroup.Text>
                            <Form.Control
                                type="text" 
                                placeholder="Username" required 
                                onChange={(e) => setData({ ...data, username: e.target.value })}
                            />
                        </InputGroup>
                        {/* Password */}
                        <InputGroup className="mb-3">
                            <InputGroup.Text>
                                <span className="bi bi-lock-fill" style={{ borderColor: 'transparent' }}></span>
                            </InputGroup.Text>
                            <Form.Control
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Password"
                                required
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                            />
                            {/* Hide and Show Password */}
                            <Button
                            variant="light"
                            id="showPasswordButton"
                            onClick={togglePassword}
                            >
                                <span className={`primary-text ${showPassword ? '' : ''}`}>
                                    {showPassword ? 'Hide' : 'Show'}
                                </span>
                            </Button>
                        </InputGroup>
                        {/* Password Confirmation */}
                        <InputGroup className="mb-3">
                            <InputGroup.Text>
                                <span className="bi bi-lock-fill" style={{ borderColor: 'transparent' }}></span>
                            </InputGroup.Text>
                            <Form.Control
                                type={showPasswordConfirmation ? 'text' : 'password'}
                                id="passwordConfirmation"
                                placeholder="Confirm Password"
                                required
                            />
                            {/* Hide and Show Password */}
                            <Button
                            variant="light"
                            id="showPasswordConfirmationButton"
                            onClick={togglePasswordConfirmation}
                            >
                                <span className={`primary-text ${showPasswordConfirmation ? '' : ''}`}>
                                    {showPasswordConfirmation ? 'Hide' : 'Show'}
                                </span>
                            </Button>
                        </InputGroup>

                        {/* Submit Button */}
                        <div className="input-group">
                            <Button className={`${styles.button} ${styles.bgBlue} fw-bold w-100`} variant="primary" type="submit" id="submit">Create Account</Button>{' '}
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};
export default Register;