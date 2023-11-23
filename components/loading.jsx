"use client";

/** This component is responsible for setting the loading icon for SWR processes.
 * 
 * @returns loading symbol
 */
const Loading = () => {
    return (
        <div className='d-flex py-5 justify-content-center align-items-center'>
            <div class="spinner-border" role="status" style={{width: "3em", height: "3em"}}>
                <span class="sr-only"></span>
            </div>
        </div>
    );
};

export default Loading;