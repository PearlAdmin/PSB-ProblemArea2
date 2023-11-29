import { useEffect, useState } from 'react';
import styles from './styles.module.css';

/**
 * MCeditable component for rendering a multiple-choice editable input.
 * @component
 * @param {Object} props - The properties of the MCeditable component. 
 * @param {string} props.dbid - The unique identifier for the item in the Database.
 * @param {boolean} props.required - Indicates whether the input is required.
 * @param {string} props.type - The type of input (e.g., 'checkbox', 'radio').
 * @param {string[]} props.choices - An array of choices for the multiple-choice input.
 * @param {Function} props.handleChange - A function to handle changes to the input choices.
 * @returns {JSX.Element} JSX.Element representing the MCeditable component.
 */
const MCeditable  = ({ dbid, required, type, choices, handleChange }) => {
    let defaultOp = ['Edit Me']
    if(choices) defaultOp = choices
    const [options, setOptions] = useState(defaultOp);

    /**
     * Adds a new option to the list of choices.
     * @param {Event} e - The click event triggering the addition of a new option.
     */
    const addOption = (e) => {
        e.preventDefault();
        setOptions([...options, 'Edit Me']);
    };

    /**
     * Updates the value of a specific option in the list of choices.
     * @param {number} index - The index of the option to be updated.
     * @param {string} value - The new value for the option.
     */
    const updateOption = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    }
    /**
     * Removes a specific option from the list of choices.
     * @param {number} index - The index of the option to be removed.
     */
    const removeOption = (index) => {
        console.log("index: ", index)
        const updatedOptions = options.filter((_,i) => i !== index);
        console.log("options: ", updatedOptions)
        setOptions(updatedOptions);
    }

    useEffect(()=>handleChange(options, dbid), [options])

    return (
        <div>
            {options.map((option, index) => (
                <div key={index} className={`d-flex mb-1`}>
                    <input
                        type={type}
                        name="answerOptions"
                        value={option}
                        // onChange={(e) => updateOption(index, e.target.value)}
                        required={required}
                        disabled
                    />
                    <input className={`${styles.input} ${styles.formChoice} bg-transparent ms-2 me-2 w-100`} type="text" required={required} value={options[index]} onChange={(e) => updateOption(index, e.target.value)}></input>
                    {(options.length > 1 &&
                        <div className={`${styles.editBlockBtn} ${styles.bi} bi-x ms-auto pe-2`} onClick={() => removeOption(index)}></div>
                    )}
                </div>
             ))}
             <button className={`${styles.addOptBtn} fw-normal pt-2 text-secondary`} onClick={addOption}>+ Add More Options...</button>
        </div>
    );
};
export default MCeditable ;