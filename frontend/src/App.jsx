import './App.css'
import {Toaster} from "react-hot-toast";
import Header from "./components/layout/Header.jsx";
import {Route, Routes} from "react-router-dom";

import StudentListPage from "./pages/student/ListPage.jsx";
import StudentCreatePage from "./pages/student/CreatePage.jsx";
import StudentEditPage from "./pages/student/EditPage.jsx";

import RegisterPage from "./pages/auth/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";

import UserListPage from "./pages/user/ListPage.jsx";
import UserEditPage from "./pages/user/EditPage.jsx";
import UserCreatePage from "./pages/user/CreatePage.jsx";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";
import AdminPrivateRoute from "./PrivateRoute/AdminPrivateRoute.jsx";

function App() {

    return (
        <div className=''>
            <Toaster/>
            <Header/>
            <Routes>
                <Route path='/create-student' element={
                    <PrivateRoute>
                        <StudentCreatePage />
                    </PrivateRoute>
                } />

                <Route path='/edit-student/:id' element={
                    <PrivateRoute>
                        <StudentEditPage />
                    </PrivateRoute>
                } />

                <Route path='/list-user' element={
                    <AdminPrivateRoute>
                        <UserListPage />
                    </AdminPrivateRoute>
                } />

                <Route path='/edit-user/:id' element={
                    <AdminPrivateRoute>
                        <UserEditPage />
                    </AdminPrivateRoute>
                } />

                <Route path='/create-user' element={
                    <AdminPrivateRoute>
                        <UserCreatePage />
                    </AdminPrivateRoute>
                } />

                <Route path='/' element={<HomePage />} />
                <Route path='/list-student' element={<StudentListPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
            </Routes>
        </div>
    )
}

export default App
