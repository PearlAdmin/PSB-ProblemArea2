import styles from './styles.module.css';

/**
 * Checkbox component for rendering a question with multiple choice options.
 * @component
 * @param {Object} props - The properties of the Checkbox component.
 * @param {string} props.question - The text of the question.
 * @param {string[]} props.options - An array of options for the checkbox.
 * @param {boolean} props.required - Indicates whether the question is required.
 * @param {Function} props.setValues - A function to handle the onChange event and update values. 
 * @returns {JSX.Element} JSX.Element representing the Checkbox component.
 */
const Checkbox = ({ type, question, options, required, setValues }) => {
    return (
        <div>
            <div className={`${styles.formContainer} col mb-3`}>
                <div className={`${styles.formTitleContainer}`}>
                    <label className={`${styles.formAnswer} ${styles.formTransparent} w-100 fw-bold d-flex me-4 ${!required ? 'flex-grow-1' : ''}`} htmlFor="question">
                        {question}
                    </label>
                </div>
                <div>
                    {options.map((option, index) => (
                        <div key={index} className={`d-flex mb-1`}>
                            <label className={`${styles.formAnswer} ${styles.formChoice} w-100`}>
                            <input
                                className={`${styles.input} me-2`} 
                                type={type} //checkbox
                                name={question} 
                                value={option}
                                onChange={setValues}
                            />
                            {option}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Checkbox;