import { useState } from 'react';
import MCeditable from '@/components/create-record/mc_editable';
import styles from './styles.module.css';

/**
 * Question component for rendering a dynamic form question.
 * @component
 * @param {Object} props - The properties of the Question component.
 * @param {string} props.id - The unique identifier for the question.
 * @param {string} props.question - The text of the question.
 * @param {boolean} props.required - Indicates whether the question is required.
 * @param {boolean} props.deletable - Indicates whether the question can be deleted.
 * @param {string} props.dbtype - The type of the question stored in the database.
 * @param {string[]} props.choices - An array of choices for multiple-choice questions.
 * @param {Function} props.changeQuestion - A function to handle changes to the question text.
 * @param {Function} props.changeType - A function to handle changes to the question type.
 * @param {Function} props.changeChoices - A function to handle changes to the question choices.
 * @param {Function} props.changeRequired - A function to handle changes to the question's required status.
 * @returns {JSX.Element} JSX.Element representing the Question component.
 */

const Question = ({ id, question, required, deletable, dbtype, choices, changeQuestion, changeType, changeChoices, changeRequired }) => {
    let defaultType = "text"
    if(dbtype) defaultType = dbtype
    let displayOnly = false
    if(!deletable) displayOnly = true
    const [type, setType] = useState(defaultType);
    // const [required, setRequired] = useState(true);

    /**
     * Handles changes to the question type and triggers the corresponding callback.
     * @constant {Function}
     * @param {string[]} choices - The choices for multiple-choice questions.
     * @param {Event} e - The change event for the question type dropdown.
     * @returns {void}
     */
    const handleTypeChange = (choices, e) => {
        setType(e.target.value);
        // console.log('TARGET', e.target.value);
        // console.log(e.target.value === 'checkbox')
        // if(e.target.value === 'checkbox') {
        //     setRequired(false);
        // }
        changeType(choices, e)
    }

    return (
        <div className={`${styles.formContainer} col`}>
            <div className={`${styles.formTitleContainer}`}>
                <input className={`${styles.input} ${styles.formAnswer} ${styles.formTransparent} w-100 fw-bold me-4`} id={id} type="text" defaultValue={question} onChange={changeQuestion} readOnly={displayOnly}></input>
                <select className={`${styles.formDropdown} custom-select custom-select-sm ms-auto`} name="formtype" id={id} required defaultValue={defaultType} onChange={(e)=>handleTypeChange(choices, e)} disabled={displayOnly}>
                    <option value="text" >Text</option>
                    <option value="number" >Number</option>
                    <option value="alphanumeric" >Alphanumeric</option>
                    <option value="radio" >Multiple Choice</option>
                    <option value="checkbox" >Checkbox</option>
                    <option value="date" >Date</option>
                </select>
            </div>
            <div className={`${styles.formChoiceGroup}`}>
                {(type === "text" || type === "number" || type === "alphanumeric") &&
                     (<input className={`${styles.input} ${styles.formAnswer} w-100`} type="text" disabled required={required}></input>)
                }
                {type === "radio" && (<MCeditable dbid={id} type={type} required={required} choices={choices} handleChange={changeChoices}/>)}
                {type === "checkbox" && (<MCeditable dbid={id} type={type} required={required} choices={choices} handleChange={changeChoices}/>)}
                {type === "date" && (<input className={`${styles.input} ${styles.formAnswer} w-100`} type="date" disabled required={required}></input>)}
            </div>
            {type !== 'checkbox' && <div className={`form-check form-switch my-2 d-flex`}>
                <input className={`${styles.input} form-check-input ms-auto me-2`} type="checkbox" id={id} defaultChecked={required} onChange={changeRequired} disabled={displayOnly}></input>
                <label className={`form-check-label fw-normal`}>Required</label>
            </div>}
        </div>
    );
};
export default Question;