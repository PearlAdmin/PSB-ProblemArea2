"use client";
import { useState } from 'react';
import Head from 'next/head';
import Navbar from "@/components/navigation"
import Header from '@/components/create-record/header';
import { Button } from 'react-bootstrap';
import CustomInput from '@/components/create-record/custominput';
import useSWR from 'swr';
import './styles.css';

const fetcher = (url) => fetch(url).then((res) => res.json());

function GetQuestion() {
    const { data, isLoading, error } = useSWR('/api/forms', fetcher);

    return {data, isLoading, error};
}

const CreateRecord = () => {
    const [isFormConfirmVisible, setFormConfirmVisible] = useState(false);
    const [values, setValues] = useState({});

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        // Use a copy of the current values object
        let updatedValues = values;
    
        if (type === "checkbox") {
            if (!updatedValues[name]){
                updatedValues[name] = [ value ];
            } else {
                if (checked) {
                    // If the checkbox is checked, add the value to the array
                    updatedValues[name] = [...updatedValues[name], value];
                } else {
                    // If the checkbox is unchecked, remove the value from the array
                    updatedValues[name] = updatedValues[name].filter((item) => item !== value);
                }
            }
        } else {
            // For non-checkbox inputs, update the value directly
            updatedValues[name] = value;
        }
    
        // Update the state with the modified values
        setValues(updatedValues);
    };

    const submitForm = (e) => {
        e.preventDefault(); // Prevent the default form submission
        setFormConfirmVisible(true);
        console.log(values)
    }

    const acceptSubmit = async () => {
        // Save your data if needed
        try {
            const response = await fetch('/api/records', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });
      
            if (response.ok) {
              // Handle the successful response here
              console.log('POST request was successful');
            } else {
              // Handle errors or non-2xx responses
              console.error('POST request failed');
            }
          } catch (error) {
            console.error('An error occurred:', error);
          
        };
        setFormConfirmVisible(false);
    }
    
    const declineSubmit = () => {
        setFormConfirmVisible(false);
    }

    const {data, isLoading, error} = GetQuestion();

    if (isLoading) return (<div>Loading...</div>);
    
    if (error) return (<div>{error.message}</div>);

    return (
        <div>
            <Navbar />
            <form onSubmit={submitForm}>
                <div className="flex-row justify-content-center align-items-center">
                    <Header header='Background Information'/>

                    {data.questions.map((item) => {
                        return (<CustomInput config={item} setValues={handleInputChange} />);
                    })}

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button className="primary" type='submit' style={{ width: '80%', margin: '10px 25px', borderRadius: '36px' }}>
                            Create Record
                        </Button>
                    </div>
                </div>
            </form>
            {isFormConfirmVisible && (
                <div id="form-confirm-container" style={{ display: 'block' }}>
                    <div className="popup-modal" id="form-confirm-container">
                        <div className="popup-modal-box-container d-flex align-items-center justify-content-center h-100 w-100">
                            <div className="popup-modal-box-shadow w-50 pe-2 pb-2">
                                <div className="popup-modal-box">
                                    <div className="popup-modal-box-top top-100 text-end">
                                        <button className="close-btn pe-4" onClick={declineSubmit}>&times;</button>
                                    </div>
                                    <div className="popup-modal-box-mid text-start ps-4">Are you sure you want to create record?</div>
                                    <div className="popup-modal-box-low text-start py-4 ps-4">
                                    <button className="confirm-btn yes-btn" onClick={acceptSubmit}>Yes</button>
                                    <button className="confirm-btn no-btn" onClick={declineSubmit}>No</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default CreateRecord;