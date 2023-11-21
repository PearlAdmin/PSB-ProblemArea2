import styles from './styles.module.css';

const MC  = ({type, question, options, required, setValues }) => {
    return (
        <div className='mb-3'>
            <div className={`${styles.formContainer} col mb-3`}>
                <div className={`${styles.formTitleContainer}`}>
                    <label className={`${styles.formAnswer} ${styles.formTransparent} w-100 fw-bold d-flex me-4 ${!required ? 'flex-grow-1' : ''}`} htmlFor="question">
                        {question}
                        {required && <div className={`${styles.formTitleRequired}`}>*</div>}
                    </label>
                </div>
                <div>
                    {options.map((option, index) => (
                    <div key={index} className={`d-flex mb-1`}>
                        <label className={`${styles.formAnswer} ${styles.formChoice} w-100`}>
                        <input
                            className={`${styles.input} me-2`}
                            type={type}
                            name={question}
                            required={required}
                            value={option}
                            onChange={(e)=>setValues(e, options)}
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

export default MC;