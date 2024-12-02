import React, { useEffect, useState } from "react";

function Dropdown() {

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }
    const closeDropdown = (event) => {
        if (event.target.closest('.dropdown') === null) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', closeDropdown);
        return () => {
            document.addEventListener('click', closeDropdown);
        };
    }, []);

    return (
        <div className="dropdown">
            <button className="hamburger-btn" onClick={toggleDropdown}>≡</button>
            <ul className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
                <a href="/register" >Daftar</a>
                <a href="/login" >Login</a>
                <a href="/user" >User</a>
                <a href="/home" >Home</a>
            </ul>
        </div>
    )
}

export default Dropdown;