"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import './nav.styles.css';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import {PDFDownloadLink} from '@react-pdf/renderer';

/**
 * Navigation bar component for the application.
 * @component
 * @param {Object} props - Component properties.
 * @param {Object} props.PDF - PDF document content to enable the 'Download PDF' button.
 * @param {string} props.filename - The name to be used when downloading the PDF.
 * @param {string} props.recordId - The ID of the record for which to show edit logs.
 * @param {function} props.showLog - Function to toggle the visibility of edit logs.
 * @param {boolean} props.isLogVisible - Flag indicating whether edit logs are currently visible.
 * @returns {JSX.Element} JSX element representing the navigation bar.
 */
const Navbar = ({PDF, filename, recordId, showLog, isLogVisible}) => {
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    const router = useRouter();
    const [cookies, removeCookie] = useCookies(['user']);

    const user = cookies.user;

    // Add a state to track whether the component is mounted
    const [isMounted, setIsMounted] = useState(false);

    // Use useEffect to set isMounted to true once the component has mounted
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Avoid rendering components that depend on cookies during server-side rendering
    if (!isMounted) {
        return null;
    }

    return (
        <div style={{ marginBottom: '75px' }}>
            <div className="navbar navbar-light bg-light fixed-top" id="navbar">
                <div className="container-fluid">
                    <div className="navbar-left">
                        <a className="navbar-brand h-100 w-auto d-flex align-items-center" href="/">
                            <Image
                                className="d-inline-block me-1 "
                                id="navbar-logo-img"
                                draggable={false}
                                src="/logo.png"
                                alt=""
                                height={50}
                                width={50}
                            />
                            <span className={`h-75 d-none d-md-inline-block logo-name`}>
                                Pearl S. Buck<span className='logo-name-light'> Foundation Philippines Inc.</span>
                            </span>
                        </a>
                    </div>

                    <div className="navbar-right text-end d-flex align-items-center ms-auto">
                        {
                            recordId && showLog && (
                                <button className='btn btn-dark me-4 my-auto' onClick={showLog}>{!isLogVisible ? 'Show':'Hide'} Edit Logs</button>
                            )
                        }
                        {
                            PDF && (
                                <PDFDownloadLink document={PDF} fileName={filename}>
                                    {({ blob, url, loading, error }) =>
                                        loading ? <p className='me-5 my-auto'>Loading document...</p> : <button className='btn btn-dark me-5 my-auto'>Download PDF</button>
                                    }
                                </PDFDownloadLink>
                            )
                        }
                        <div className="nav-right col-md text-end d-flex align-items-center h-100">
                        <button className="navbar-menu-btn navbar-toggler-icon" id="navbar-menu-btn" onClick={toggleMenu}></button>
                        </div>

                        <div className={`navbar-menu-container bg-light end-0 flex-column ${showMenu ? 'show-menu' : ''}`} id="navbar-menu">
                            <div className="list-unstyled p-3" style={{ paddingRight:'5px!important'}}>
                                <li
                                    className="navbar-menu-option"
                                    onClick={() => router.push('/create')}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                        router.push('/create');
                                        }
                                    }}
                                    tabIndex="0"
                                    style={{ cursor: 'pointer' }}
                                >
                                    Create Record
                                </li>
                                <li 
                                    className="navbar-menu-option"
                                    onClick={() => router.push('/')}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                        router.push('/');
                                        }
                                    }}
                                    tabIndex="0"
                                    style={{ cursor: 'pointer' }}
                                >
                                    View Records
                                </li>
                                {user && user.role === 'admin' && ( 
                                    <li 
                                        className="navbar-menu-option"
                                        onClick={() => {
                                            router.push('/edit');
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                router.push('/edit');
                                            }
                                        }}
                                        tabIndex="0"
                                        style={{ cursor: 'pointer' }}
                                        >
                                        
                                            <div className="manage-user-dropdown">
                                                Edit Form
                                            </div>
                                    </li>
                                )}

                                {user && user.role === 'admin' && (
                                    <li className="navbar-menu-option"
                                        onClick={() => {
                                            router.push('/manage-user');
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                router.push('/manage-user');
                                            }
                                        }}
                                        tabIndex="0"
                                        style={{ cursor: 'pointer' }}
                                    >
                                            <div className="manage-user-dropdown">
                                                Manage Users
                                            </div>
                                    </li>
                                )}
                                {user && user.role === 'admin' && (
                                    <li 
                                        className="navbar-menu-option"
                                        onClick={() => {
                                            router.push('/deleted');
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                router.push('/deleted');
                                            }
                                        }}
                                        tabIndex="0"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="manage-user-dropdown">
                                            Deleted Records
                                        </div>
                                    </li>
                                )}
                                <li 
                                    className="navbar-menu-option red-text mb-auto"
                                    onClick={() => {
                                        removeCookie('user', {maxAge: -1})
                                        router.push('/login');
                                    }}
                                    onKeyDown={(e) => {
                                        removeCookie('user', {maxAge: -1})
                                        router.push('/login');
                                    }}
                                    tabIndex="0"
                                    style={{ cursor: 'pointer' }}
                                    >
                                    Log Out
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
