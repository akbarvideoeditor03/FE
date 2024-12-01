import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, deleteUser } from "../../redux/action/user.action";
import Swal from "sweetalert2";

function UserList() {
    const dispatch = useDispatch();
    const { userList, isLoading, error } = useSelector((state) => state.userReducer);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const deleteData = (id) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUser(id));
                Swal.fire({
                    icon: 'success',
                    title: 'Dihapus!',
                    text: 'Data berhasil dihapus.',
                    timer: 2000,
                    showConfirmButton:false,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    timerProgressBar: true,
                }).then(() => {
                    window.location.reload();
                });
            }
        });
    }

    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Hm... Ada yang salah nih!, ${error.message}`,
                confirmButtonText: 'OK'
            });
        }
    }, [error]);

    return (
        <main className="container col-f f-center">
            <section className="container col-f full-width section-max">
                <input type="search" placeholder="Cari" className="m-bt2" />
                <div className="container row-f f-wrap">
                    <a href="/user/create" className="btn btn-primary">Tambah Pengguna</a>
                </div>
                <div className="container col-f">
                    <h1>Daftar Pengguna</h1>
                    {isLoading ? (
                        <div className="container col-f f-center-c"><p>Silahkan tunggu...</p></div>
                    ) : (
                        <div className="container col-f">
                            {userList.map((item) => {
                                return (
                                    <div key={item.id} className="menu-card container col-f full-width">
                                        <div className="container row-f f-wrap">
                                            <div className="container left-card-menu col-f f-1 fj-center">
                                                <a className="user-list" href={`/user/${item.id}`}>
                                                    <div className="container col-f f-wrap">
                                                        <h3>{item.nama}</h3>
                                                        <p className="cut-text">{item.email}</p>
                                                        <p>{item.no_telp}</p>
                                                    </div>
                                                </a>
                                            </div>
                                            <div style={{ zIndex: '10' }} className="container col-f full-width right-card-menu">
                                                <a href={`user/edit/${item.id}`} className="t-center btn btn-info">Ubah</a>
                                                <button onClick={() => deleteData(item.id)} className="t-center btn btn-danger">Hapus</button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}

export default UserList;