import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function Dropdown() {
    const roleUser = 'A@k3!o8%Np';
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
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

    const handleLogout = () => {
        Swal.fire({
            title: 'Yakin mau keluar?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                Swal.fire({
                    icon: 'success',
                    title:'Berhasil',
                    text: 'Akun berhasil keluar',
                    timer: 2000,
                    showConfirmButton: false,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    timerProgressBar: true,
                }).then(() => {
                    window.location.href = '/';
                });
            }
        });
    };

    if (token && role === roleUser) {
        return (
            <div className="dropdown">
                <button className="hamburger-btn" onClick={toggleDropdown}>≡</button>
                <ul className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
                    <a href="/user" >Pengguna</a>
                    <button className="btn-dropdown" onClick={handleLogout}>
                        Keluar
                    </button>
                </ul>
            </div>
        )
    } else if (token && role === "user") {
        return (
            <div className="dropdown">
                <button className="hamburger-btn" onClick={toggleDropdown}>≡</button>
                <ul className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
                    <a href="/" >Beranda</a>
                    <a href="/home" >CV Saya</a>
                    <a href="/user/createpengalamankerja" >Tambah Pengalaman Kerja</a>
                    <button className="btn-dropdown" onClick={handleLogout}>
                        Keluar
                    </button>
                </ul>
            </div>
        )
    } else {
        return (
            <div className="dropdown">
                <button className="hamburger-btn" onClick={toggleDropdown}>≡</button>
                <ul className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
                <a href="/user/login" >Masuk</a>
                    <a href="/user/register" >Daftar</a>
                    <a href="#" >Pelajari Lebih Lanjut</a>
                    <a href="#" >Bantuan</a>
                    <a href="#" >Tentang Kami</a>
                </ul>
            </div>
        )
    }
}

export default Dropdown;