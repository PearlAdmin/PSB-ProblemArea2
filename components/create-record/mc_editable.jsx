import { useEffect, useState } from 'react';
import styles from './styles.module.css';

const MCeditable  = ({ dbid, required, type, choices, handleChange }) => {
    let defaultOp = ['Edit Me']
    if(choices) defaultOp = choices
    const [options, setOptions] = useState(defaultOp);

    const addOption = (e) => {
        e.preventDefault();
        setOptions([...options, 'Edit Me']);
    };

    const updateOption = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    }

    const removeOption = (index) => {
        const updatedOptions = options.filter((_,i) => i !== index);
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
                    <input className={`${styles.input} ${styles.formChoice} bg-transparent ms-2 me-2 w-100`} type="text" required={required} defaultValue={options[index]} onChange={(e) => updateOption(index, e.target.value)}></input>
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