"use client";
import { useState } from 'react';
import Head from 'next/head';
import Navbar from "@/components/navigation"
import Textbox from '@/components/create-record/textbox';
import Date from '@/components/create-record/date';
import MC from '@/components/create-record/mc';
import Checkbox from '@/components/create-record/checkbox';
import Dropdown from '@/components/create-record/dropdown';
import Header from '@/components/create-record/header';
import { Button } from 'react-bootstrap';

const CreateRecord = () => {
    const [isFormConfirmVisible, setFormConfirmVisible] = useState(false);

    const submitForm = (e) => {
        e.preventDefault(); // Prevent the default form submission
        setFormConfirmVisible(true);
    }

    const acceptSubmit = () => {
        // Save your data if needed
        setFormConfirmVisible(false);
    }
    
    const declineSubmit = () => {
        setFormConfirmVisible(false);
    }
    return (
        <div>
            <Head>
            <style dangerouslySetInnerHTML={{ __html: `
                .form-container {
                    background-color: #c5e2ea;
                    padding: 10px 20px;  
                    margin: 10px 25px;
                    border-radius: 36px;
                }
                .form-title-required {
                    color: #cd3a3a;
                }
                .form-title {
                    font-weight: bold;
                    font-size: 20px;
                }
                .popup-modal {
                    z-index: 1000;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    top: 0;
                    left: 0;
                    position: fixed;
                }
                .popup-modal-box-shadow {
                    padding: 0;
                    background-color: #0872a1;
                    border-radius: 36px;
                    position: absolute;
                    text-align: center;
                }
                .popup-modal-box {
                    font-size: 1.75em;
                    font-weight: bold;
                    background-color: #c5e2ea;
                    border-radius: 36px;
                    height: 100%;
                }
                .popup-modal-box-top {
                    font-size: 0.75em;
                }
                .confirm-btn {
                    border: 3px solid black;
                    font-size: 0.75em;
                    font-weight: bold;
                    width: 25%;
                    border-radius: 36px;
                    padding-block: 0.25em;
                }
                .yes-btn {
                    border-color: #00bf63; 
                }
                .no-btn {
                    border-color: #cd3a3a; 
                }
                .close-btn {
                    font-size: 1.15em;
                    color: #0872a1;
                    border: none;
                    background-color: inherit;
                }
                ` }} />
            </Head>

            <Navbar />
            <form onSubmit={submitForm}>
                <div className="flex-row justify-content-center align-items-center">
                    <Header header='Background Information'/>
                    <Textbox question={'Name'} required={true} />
                    <Date question={'Birthday'} required={true} />
                    <MC question="School Type" options={["Public", "Private"]} required={true} />
                    <Checkbox question="Favorite Subjects" options={["Math", "Science", "History", "Art"]} required={false} />
                    <Dropdown question="Family Income" options={["10k-50k", "50k-100k", "100k-150k"]} required={true} />
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