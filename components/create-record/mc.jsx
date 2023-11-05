const MC  = ({type, question, options, required, setValues }) => {
    return (
        <div>
            <div className="form-container">
                <div className="d-flex align-items-center">
                    <label className={`form-title ${!required ? 'flex-grow-1' : ''}`} htmlFor="question">
                        {question}
                    </label>
                    {required && <div className="form-title form-title-required p-2 flex-grow-1">*</div>}
                </div>
                <div>
                    {options.map((option, index) => (
                    <div key={index}>
                        <label>
                        <input
                            type={type}
                            name={question}
                            required={required}
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

export default MC;