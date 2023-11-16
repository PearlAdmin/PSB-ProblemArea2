"use client";
import '@/components/nav.styles.css'

const Error = ({ errorCode, errorMessage }) => {
    return (
        <div className='error'>
            <div id="error-page">
                <div className="content">
                    <h2 className="header">
                        {errorCode}
                    </h2>
                    <h4>
                        {errorMessage}
                    </h4>
                    <div className="btns">
                        <a>reload page</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;