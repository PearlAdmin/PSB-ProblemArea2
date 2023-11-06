import { useState } from 'react';
import MCeditable from '@/components/create-record/mc_editable';
import styles from './styles.module.css';

const Question = ({ id, question, required, dbtype, choices, changeQuestion, changeType, changeChoices, changeRequired }) => {
    let defaultType = "text"
    if(dbtype) defaultType = dbtype
    const [type, setType] = useState(defaultType);

    const handleTypeChange = (choices, e)=>{
        setType(e.target.value)
        changeType(choices, e)
    }

    return (
        <div className={`${styles.formContainer} col`}>
            <div className={`${styles.formTitleContainer}`}>
                <input className={`${styles.input} ${styles.formAnswer} ${styles.formTransparent} w-100 fw-bold me-4`} id={id} type="text" defaultValue={question} onChange={changeQuestion}></input>
                <select className={`${styles.formDropdown} custom-select custom-select-sm ms-auto`} name="formtype" id={id} required defaultValue={defaultType} onChange={(e)=>handleTypeChange(choices, e)}>
                    <option value="text" >Text Box</option>
                    <option value="radio" >Multiple Choice</option>
                    <option value="checkbox" >Checkbox</option>
                    <option value="date" >Date</option>
                </select>
            </div>
            <div className={`${styles.formChoiceGroup}`}>
                {type === "text" && (<input className={`${styles.input} ${styles.formAnswer} w-100`} type="text" disabled required={required}></input>)}
                {type === "radio" && (<MCeditable dbid={id} type={type} required={required} choices={choices} handleChange={changeChoices}/>)}
                {type === "checkbox" && (<MCeditable dbid={id} type={type} required={required} choices={choices} handleChange={changeChoices}/>)}
                {type === "date" && (<input className={`${styles.input} ${styles.formAnswer} w-100`} type="date" disabled required={required}></input>)}
            </div>
            <div className={`form-check form-switch my-2 d-flex`}>
                <input className={`${styles.input} form-check-input ms-auto me-2`} type="checkbox" id={id} defaultChecked={required} onChange={changeRequired}></input>
                <label className={`form-check-label fw-normal`}>Required</label>
            </div>
        </div>
    );
};
export default Question;