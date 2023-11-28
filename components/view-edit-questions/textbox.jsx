'use client'
import { useState, useRef } from 'react';
import styles from '@/components/create-record/styles.module.css';
import Popup from '../popup';

/**
 * Textbox component for displaying a textbox input.
 *
 * @function
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.id - The unique identifier for the textbox.
 * @param {string} props.question - The text of the textbox question.
 * @param {string} props.answer - The current answer for the question.
 * @param {boolean} props.required - Indicates whether the question is required.
 * @param {string} props.type - The type of the html input type.
 * @param {string} props.validation - The validation pattern for the textbox input.
 * @param {number} props.order - The order of the question in the form.
 * @param {Function} props.didEdit - Callback function triggered when the question is edited.
 * @returns {React.Element} - The Textbox component JSX.
 */
const Textbox = ({ id, question, answer, required, type, validation, order, didEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editableAnswer, setEditableAnswer] = useState(answer);
    const [isFormConfirmVisible, setFormConfirmVisible] = useState(false);
    const errorMsg = useRef('')

    /**
     * Validates the input for SCN (Sponsor Child Number).
     *
     * @function
     * @param {string} inputID - The identifier of the input element.
     */
    function validateSCN(inputID) {
        const input = document.getElementById(inputID);
        const validityState = input.validity;
      
        if (errorMsg.current == "SCN should be unique") {
          input.setCustomValidity(errorMsg.current);
        } else {
          input.setCustomValidity("");
        }
      
        input.reportValidity();
    }
    
    /**
     * Handles the click event when the user wants to edit the question.
     *
     * @function
     */
    const handleEditClick = () => {
        if(!isEditing) {
            setIsEditing(true);
        } else {
            setIsEditing(false);
        }
    }

    /**
     * Handles the click event when the user wants to save the edits.
     *
     * @function
     * @param {Event} e - The click event.
     */
    const handleSaveClick = (e) => {
        e.preventDefault(); // Prevent the default form submission
        setFormConfirmVisible(true);
    }

    /**
     * Handles the change event when the user types into the textbox.
     *
     * @function
     * @param {Event} event - The change event.
     */
    const handleAnswerChange = (event) => {
        document.getElementById(event.target.id).setCustomValidity("");
        setEditableAnswer(event.target.value);
    }
    
    /**
     * Handles the click event when the user confirms the submission.
     *
     * @async
     * @function
     */
    const acceptSubmit = async () => {
        // Save your data if needed
        setFormConfirmVisible(false);

        const field = document.getElementById(id);
        const isValid = field.validity.valid;
        if (isValid){
            errorMsg.current = ''

            try {
                const response = await fetch(process.env.NEXT_PUBLIC_VERCEL_URL+`/api/records?id=${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({[question]: {value:editableAnswer, required:required, type:type, order:order}}),
                });
        
                if (response.ok) {
                // Handle the successful response here
                    console.log('PATCH request was successful');
                    didEdit(true);
                } else {
                // Handle errors or non-2xx responses
                    const data = await response.json();
                    errorMsg.current = data.message;
                    console.error('PATCH request failed: ', errorMsg.current);
                }
            } catch (error) {
                console.error('An error occurred:', error);
            };
            if(question === 'SCN: ') validateSCN(id);

            if (errorMsg.current === ''){
                setIsEditing(false);
                setEditableAnswer(editableAnswer);
            }
        }
    }
    /**
     * Handles the click event when the user declines the submission.
     *
     * @function
     */
    const declineSubmit = () => {
        setFormConfirmVisible(false);
        setEditableAnswer(answer);
        setIsEditing(false);
    }
    return (
        <div>
            <form onSubmit={handleSaveClick} className={`${styles.formContainer} col mb-3`}>
                <div className={`${styles.formTitleContainer}`}>
                    <label className={`${styles.formAnswer} ${styles.formTransparent} w-100 fw-bold d-flex me-4 ${!required ? 'flex-grow-1' : ''}`} htmlFor="question">
                        {question}
                        {required && <div className={`${styles.formTitleRequired}`}>*</div>}
                    </label>
                    <div><i className={`form-title bi bi-pencil-square edit-icon ${styles.button}`} onClick={handleEditClick}></i></div>
                </div>
                {isEditing ? (
                    <input
                        className={`${styles.formAnswer} ${styles.formChoice} w-100`}
                        id={id}
                        type="text"
                        value={editableAnswer}
                        onChange={handleAnswerChange}
                        required={required}
                        pattern={validation}
                    />
                ) : (
                    <input
                        className={`${styles.formAnswer} ${styles.formChoice} w-100`}
                        type="text"
                        id="sponsor-name"
                        value={editableAnswer}
                        disabled
                    />
                )}
                {isEditing && (
                    <button className={`mt-3 px-4 btn btn-primary save ${styles.button} ${styles.actionBtn} ${styles.bgBlue}`} onClick={handleSaveClick} style={{ marginTop: '5px' }}>
                        Save
                    </button>
                )}
            </form>
            {isFormConfirmVisible && <Popup question={"Are you sure you want to save edits?"} firstBtnLabel={"Yes"} secondBtnLabel={"No"} firstBtnFunc={acceptSubmit} secondBtnFunc={declineSubmit} isYesNoQuestion={true}/>}
        </div>
        );
    };
export default Textbox;