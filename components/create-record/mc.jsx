import Head from 'next/head';

const MC  = ({ question, options, required }) => {
    return (
        <div>
            <Head>
                <style dangerouslySetInnerHTML={{ __html: `
                .form-container {
                    background-color: #c5e2ea;
                    padding: 10px 20px;  
                    margin: 10px 25px;
                    border-radius: 36px;
                }
                .form-title-required {
                    color: #cd3a3a;
                }
                .form-title {
                    font-weight: bold;
                    font-size: 20px;
                }
                ` }} />
            </Head>
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
                            type="radio"
                            name="answerOptions"
                            required={required} 
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