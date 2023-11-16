"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import './nav.styles.css';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

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
                        <Image
                            className="h-75 d-none d-md-inline-block"
                            id="navbar-name-img"
                            draggable={false}
                            src="/name.png"
                            alt=""
                            height={75}
                            width={350}
                        />
                        </a>
                    </div>

                    <div className="navbar-right text-end d-flex align-items-center ms-auto">
                        <div className="nav-right col-md text-end d-flex align-items-center h-100">
                        <button className="navbar-menu-btn navbar-toggler-icon" id="navbar-menu-btn" onClick={toggleMenu}></button>
                        </div>

                        <div className={`navbar-menu-container bg-light end-0 flex-column ${showMenu ? 'show-menu' : ''}`} id="navbar-menu">
                            <div className="list-unstyled p-3">
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
