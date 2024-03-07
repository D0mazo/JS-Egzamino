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
        <div className='bg-stone-300'>
            <header className='container flex justify-end items-center'>
                <NavLink className='px-4 py-3 hover:bg-stone-500 hover:text-white' to={'/'}>Pradinis puslapis</NavLink>
                <NavLink className='px-4 py-3 hover:bg-stone-500 hover:text-white' to={'/list-student'}>
                    Studentų sąrašas
                </NavLink>
                {!isUserLoggedIn && (
                    <>
                        <NavLink className='px-4 py-3 hover:bg-stone-500 hover:text-white'
                                 to={'/login'}>Prisijungti</NavLink>
                        <NavLink className='px-4 py-3 hover:bg-stone-500 hover:text-white'
                                 to={'/register'}>Registracija</NavLink>
                    </>
                )}

                {isUserLoggedIn && (
                    <>
                        <NavLink className='px-4 py-3 hover:bg-stone-500 hover:text-white' to={'/create-student'}>
                            Sukurti studenta
                        </NavLink>
                        {isUserAdmin && (
                            <>
                                <NavLink className='px-4 py-3 hover:bg-stone-500 hover:text-white' to={'/create-user'}>
                                    Sukurti vartotoja
                                </NavLink>
                                <NavLink className='px-4 py-3 hover:bg-stone-500 hover:text-white' to={'/list-user'}>
                                    Vartotojai
                                </NavLink>
                            </>

                        )}
                        <button
                            className="px-4 py-3 hover:bg-stone-500 hover:text-white"
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
