import Head from 'next/head';

const Date = ({ question, required, setValues }) => {
    return (
        <div>
            <div className="form-container">
                <div className="d-flex align-items-center">
                    <label className={`form-title ${!required ? 'flex-grow-1' : ''}`} htmlFor="question">
                        {question}
                    </label>
                    {required && <div className="form-title form-title-required p-2 flex-grow-1">*</div>}
                </div>
                <input
                    className="form-answer w-100"
                    type="date"
                    id="answer"
                    name={question}
                    required={required}
                    onChange={setValues}
                />
            </div>
        </div>
    );
};

export default Date;