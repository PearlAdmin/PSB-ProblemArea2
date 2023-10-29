import Head from 'next/head';

const Date = ({ question, required }) => {
    return (
        <div>
            <Head>
                <style dangerouslySetInnerHTML={{ __html: `        
                    .todoContainer {
                        width: 80rem;
                        background-color: #c5e2ea;
                        border-radius: 36px;
                        padding: 10px 20px;  
                        margin: 10px 25px;
                    }
                    .form-container-shadow {
                        padding: 0;
                        background-color: #0872a1;
                        border-radius: 36px;
                    }
                    .form-container {
                        font-size: 1.15em;
                        font-weight: bold;
                        background-color: #c5e2ea;
                        padding: 0.7em;
                        border-radius: 30px;
                    }
                    .form-header {
                        text-decoration: underline;
                    }
                    .form-title-required {
                        color: #cd3a3a;
                    }
                    .form-title {
                        font-weight: bolder;
                        font-size: 20px;
                    }
                `}} />
            </Head>
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
                    required={required} 
                />
            </div>
        </div>
    );
};

export default Date;