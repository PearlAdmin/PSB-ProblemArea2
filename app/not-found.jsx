"use client";
import styles from '@/components/create-record/styles.module.css';

const Error = ({ errorCode, errorMessage }) => {
    return (
        <div className={`${styles.body} w-100 px-4 py-5 text-center`}>
            <div className={`${styles.formContainer} p-5 `} id="error-page">
                <div className={`${styles.bigText}`}>OH NO!</div>
                <div className={`${styles.errorCodeContainer}`}>
                    {errorCode && 
                        <div>Error {errorCode}</div>
                    }
                    {!errorCode &&
                        <div>Error 404: Page Not Found</div>
                    }
                </div>
                <div className={`${styles.errorMessageContainer}`}>
                    {errorMessage &&
                        <div>{errorMessage}</div>
                    }
                    {!errorMessage &&
                        <div>The page you tried to access either does not exist or is currently unavailable.</div>
                    }
                </div>
                <a className={`d-flex text-decoration-none justify-content-center`} href='/'>
                    <div className={`${styles.actionBtn} ${styles.bgBlue} ${styles.button} text-center text-white`}>
                        Reload Page
                    </div>
                </a>
            </div>
        </div>
    );
};

export default Error;