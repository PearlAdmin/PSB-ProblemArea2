'use client'
import { FC, useState } from 'react';
import Head from 'next/head';
import { Card } from 'react-bootstrap';
import styles from '@/components/create-record/styles.module.css';
import Popup from '../popup';

const MC = ({ question, options, answer, required }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editableAnswer, setEditableAnswer] = useState(answer);
    const [isFormConfirmVisible, setFormConfirmVisible] = useState(false);


    const handleEditClick = () => {
        if(isEditing) {
            setIsEditing(false);
        } else {
            setIsEditing(true);
        }
    }

    const handleSaveClick = (e) => {
        e.preventDefault(); // Prevent the default form submission
        setFormConfirmVisible(true);
    }

    const handleAnswerChange = (event) => {
        setEditableAnswer(event.target.value);
    }

    const acceptSubmit = () => {
        // Save your data if needed
        setFormConfirmVisible(false);
        setIsEditing(false);
        setEditableAnswer(editableAnswer);
    }
    
    const declineSubmit = () => {
        setFormConfirmVisible(false);
    }

    return (
        <div>
        <form onSubmit={handleSaveClick} className={`${styles.formContainer} col mb-3`}>
            <div className={`${styles.formTitleContainer}`}>
                <label className={`${styles.formAnswer} ${styles.formTransparent} w-100 fw-bold d-flex me-4 ${!required ? 'flex-grow-1' : ''}`} htmlFor="question">
                    {question}
                    {required && <div className={`${styles.formTitleRequired}`}>*</div>}
                </label>
                <div><i className={`form-title bi bi-pencil-square me-3 edit-icon ${styles.button}`} onClick={handleEditClick}></i></div>
                <div><i className={`form-title bi bi-clock-history ${styles.button}`}></i></div>
            </div>
            {isEditing ? (
            <div>
                {options.map((option, index) => (
                <div key={index}>
                    <label className={`${styles.formAnswer} ${styles.formChoice} w-100`}>
                    <input
                        className={`${styles.input} me-2`}
                        type="radio" // You can use "checkbox" for multiple selection
                        name="answerOptions"
                        value={option}
                        checked={editableAnswer === option}
                        onChange={handleAnswerChange}
                        required={required}
                    />
                    {option}
                    </label>
                </div>
                ))}
            </div>
            ) : (
            <input
                className={`${styles.formAnswer} ${styles.formChoice} w-100`}
                type="text"
                value={editableAnswer}
                disabled
            />
            )}
            {isEditing && (
            <button className={`mt-3 btn btn-primary save ${styles.button} ${styles.actionBtn} ${styles.bgBlue}`} onClick={handleSaveClick} style={{ marginTop: '5px' }}>
                Save
            </button>
            )}
        </form>
        {isFormConfirmVisible && <Popup question={"Are you sure you want to save edits?"} firstBtnLabel={"Yes"} secondBtnLabel={"No"} firstBtnFunc={acceptSubmit} secondBtnFunc={declineSubmit} isYesNoQuestion={true}/>}
        </div>
    );
};
export default MC;