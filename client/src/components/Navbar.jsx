import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';


function Navbar() {
    const navigate = useNavigate()
    const [user, setUser] = useState([])
    const userId = JSON.parse(localStorage.getItem('userId'));
    const handleLogin = () => {
        navigate('/login')
    }


    const handleRegister = () => {
        navigate('/register')
    }

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('userId');
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "Successfully Logout User"
        });
        forceUpdate()
    }

    return (
        <header className="pb-6 bg-white lg:pb-0">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">

                <nav className="flex items-center justify-between h-16 lg:h-20">
                    <div className="flex-shrink-0">

                        <NavLink to="/" >
                            <img className="w-auto h-8 lg:h-10" src="https://cdni.iconscout.com/illustration/premium/thumb/todo-list-8916525-7285968.png" alt="" />
                        </NavLink>


                    </div>

                    <div className=" flex justify-between gap-4  " >
                        {userId ? (
                            <>
                                <div className=' flex   gap-4' >
                                    <p className=' text-black  font-medium text-lg' >  </p>

                                    <button onClick={handleLogout} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>


                                    <button onClick={handleLogin} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Login
                                    </button>
                                </div>
                                <div>

                                    <button onClick={handleRegister} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Register

                                    </button>
                                </div>
                            </>
                        )}

                    </div>
                </nav>



            </div>
        </header>
    )
}

export default Navbar