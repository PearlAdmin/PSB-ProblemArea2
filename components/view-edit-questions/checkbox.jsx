'use client'
import { useState, useRef } from 'react';
import styles from '@/components/create-record/styles.module.css';
import Popup from '../popup';

/**
 * Checkbox component for rendering a checkbox question in a form.
 *
 * @function
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.id - The unique identifier for the checkbox question.
 * @param {string} props.question - The question text.
 * @param {string[]} props.options - The available options for the checkbox.
 * @param {string[]} props.answer - The selected answer(s). 
 * TODO: look into required
 * @param {boolean} props.required - Indicates whether the question is required.
 * @param {number} props.order - The order of the question in the form.
 * @param {Function} props.didEdit - Callback function indicating whether the question was edited.
 * @returns {React.Element} - The Checkbox component JSX.
 */
const Checkbox = ({ id, question, options, answer, required, order, didEdit}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editableAnswers, setEditableAnswers] = useState(answer);
    const [isFormConfirmVisible, setFormConfirmVisible] = useState(false);
    const errorMsg = useRef('')

    /**
     * Handles the click event when the user wants to edit the checkbox question.
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
     * Handles the click event when the user wants to save the edited checkbox question.
     *
     * @function
     * @param {Event} e - The event object.
     */
    const handleSaveClick = (e) => {
        e.preventDefault(); // Prevent the default form submission
        setFormConfirmVisible(true);
    }

    /**
     * Handles the change event when the user selects or deselects an answer option.
     *
     * @function
     * @param {Event} event - The event object.
     */
    const handleAnswerChange = (event) => {
        const option = event.target.value;
        if (event.target.checked) {
        // Add the selected option to the array
        setEditableAnswers([...editableAnswers, option]);
        } else {
        // Remove the unselected option from the array
        setEditableAnswers(editableAnswers.filter(item => item !== option));
        }
    }

    /**
     * Handles acceptance of the form submission.
     *
     * @async
     * @function
     */
    const acceptSubmit = async () => {
        // Save your data if needed
        setFormConfirmVisible(false);
        errorMsg.current = ''

        const field = document.getElementById(id);
        const isValid = field.validity.valid;
        if (isValid){
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_VERCEL_URL+`/api/records?id=${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({[question]: {value:editableAnswers, options:options, required:required, type:"checkbox", order:order}}),
                });
        
                if (response.ok) {
                // Handle the successful response here
                console.log('PATCH request was successful');
                didEdit(true);
                } else {
                // Handle errors or non-2xx responses
                    const data = await response.json()
                    errorMsg.current = data.message
                    console.error('PATCH request failed: ', errorMsg.current);
                }
            } catch (error) {
                console.error('An error occurred:', error);
            };

            if(errorMsg.current === ''){
                setIsEditing(false);
            }
        }
    }
    
    /**
     * Handles the rejection of the form submission.
     *
     * @function
     */
    const declineSubmit = () => {
        setFormConfirmVisible(false);
        setEditableAnswers(answer)
        setIsEditing(false);
    }

    return (
        <div>
            <form onSubmit={handleSaveClick}>
                <div className={`${styles.formContainer} col mb-3`}>
                    <div className={`${styles.formTitleContainer}`}>
                        <label className={`${styles.formAnswer} ${styles.formTransparent} w-100 fw-bold d-flex me-4 ${!required ? 'flex-grow-1' : ''}`} htmlFor="question">
                            {question}
                            {required && <div className={`${styles.formTitleRequired}`}>*</div>}
                        </label>
                        {(!required && <div><i className={`form-title bi bi-pencil-square edit-icon ${styles.button}`} onClick={handleEditClick}></i></div>)}
                    </div>
                    {isEditing ? (
                    <div>
                        {options.map((option, index) => (
                        <div key={index}>
                            <label className={`${styles.formAnswer} ${styles.formChoice} w-100`}>
                            <input
                                className={`${styles.input} me-2`}
                                type="checkbox" 
                                name="answerOptions"
                                id={id}
                                value={option}
                                checked={editableAnswers.includes(option)}
                                required={required}
                                onChange={handleAnswerChange}
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
                        value={editableAnswers.length > 0 ? editableAnswers.join(', ') : ''}
                        disabled
                    />
                    )}
                    {isEditing && (
                    <button className={`mt-3 px-4 btn btn-primary save ${styles.button} ${styles.actionBtn} ${styles.bgBlue}`} onClick={handleSaveClick} style={{ marginTop: '5px' }}>
                        Save
                    </button>
                    )}
                </div>
            </form>
            {isFormConfirmVisible && <Popup question={"Are you sure you want to save edits?"} firstBtnLabel={"Yes"} secondBtnLabel={"No"} firstBtnFunc={acceptSubmit} secondBtnFunc={declineSubmit} isYesNoQuestion={true}/>}
        </div>
    );
};

export default Checkbox;