import Head from 'next/head';

const Header = ({ header }) => {
    return (
        <div>
            <Head>
                <style dangerouslySetInnerHTML={{ __html: `        
                    .form-container-shadow {
                        padding: 0;
                        background-color: #0872a1;
                        border-radius: 36px;
                        margin: 10px 25px;
                    }
                    .form-container-header {
                        font-size: 1.5em;
                        font-weight: bold;
                        background-color: #c5e2ea;
                        padding: 10px 12px;  
                        border-radius: 30px;
                    }
                    .form-header {
                        text-decoration: underline;
                    }
                    .form-title {
                        font-weight: bolder;
                        font-size: 20px;
                    }
                `}} />
            </Head>
            <div className="form-container-shadow pe-2 pb-2">
                <div className="form-container-header">
                    <div className="d-flex align-items-center">
                        <div className="form-header p-0 mb-0 flex-grow-1 mr-1">
                            {header}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    };
export default Header;