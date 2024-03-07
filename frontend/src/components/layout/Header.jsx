import {NavLink, useNavigate} from "react-router-dom";
import {useAuthContext} from "../../store/AuthCtxProvider.jsx";
import toast from "react-hot-toast";

export default function Header() {
    const {isUserLoggedIn, isUserAdmin, logout} = useAuthContext();

    const navigate = useNavigate();

    function handleLogout() {
        logout();
        toast.success('Sėkmingai atsijungta!');
        navigate('/login')
    }

    return (
        <div className='bg-blue-300'>
            <header className='container flex justify-end items-center'>
                <NavLink className='px-4 py-3 hover:bg-blue-400 hover:text-gray-800' to={'/'}>Pradinis puslapis</NavLink>
                <NavLink className='px-4 py-3 hover:bg-blue-400 hover:text-gray-800' to={'/list-student'}>
                    Skelbimai
                </NavLink>
                {!isUserLoggedIn && (
                    <>
                        <NavLink className='px-4 py-3 hover:bg-blue-400 hover:text-gray-800'
                                 to={'/login'}>Prisijungti</NavLink>
                        <NavLink className='px-4 py-3 hover:bg-blue-400 hover:text-gray-800'
                                 to={'/register'}>Registracija</NavLink>
                    </>
                )}

                {isUserLoggedIn && (
                    <>
                        <NavLink className='px-4 py-3 hover:bg-blue-400 hover:text-gray-800' to={'/create-student'}>
                            Sukurti Skelbimą
                        </NavLink>
                        {isUserAdmin && (
                            <>
                                <NavLink className='px-4 py-3 hover:bg-blue-400 hover:text-gray-800' to={'/create-user'}>
                                    Sukurti vartotoją
                                </NavLink>
                                <NavLink className='px-4 py-3 hover:bg-blue-400 hover:text-gray-800' to={'/list-user'}>
                                    Vartotojai
                                </NavLink>
                            </>

                        )}
                        <button
                            className="px-4 py-3 hover:bg-blue-400 hover:text-gray-800"
                            onClick={handleLogout}
                        >
                            Atsijungti
                        </button>
                    </>
                )}

            </header>
        </div>
    );
}
