import useApiData from "../../hooks/useApiData.jsx";
import {baseApiUrl} from "../../helper.js";
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";
import toast from "react-hot-toast";
import {useAuthContext} from "../../store/AuthCtxProvider.jsx";
import {useMemo, useState} from "react";

export default function StudentListPage() {
    const [filterValue, setFilterValue] = useState('');

    const [studentList, setStudentList] = useApiData(`${baseApiUrl}students`);

    const {isUserAdmin, isUserLoggedIn, token} = useAuthContext();

    const navigate = useNavigate();

    const deleteStudent = async (studentId) => {
        axios
            .delete(`${baseApiUrl}students/${studentId}`, {
                headers: {'Authorization': token}
            })
            .then((response) => {
                navigate('/list-student');
                toast.success(`Studentas ID: ${studentId} sėkmingai ištrintas!`);

                const list = studentList.filter(student => student.id !== studentId); //only remove the selected row
                setStudentList(list);
            })
            .catch((error) => {
                toast.error(error.response.data.error);
            })
    }

    const filteredStudents = useMemo(() => {
       return studentList.filter(student => student.firstname.toLowerCase().includes(filterValue.toLowerCase()) || student.lastname.toLowerCase().includes(filterValue.toLowerCase()) || student.email.toLowerCase().includes(filterValue.toLowerCase()))
    }, [studentList, filterValue]);

    const handleFilterChange = event => {
        setFilterValue(event.target.value);
    }

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-4xl'>Studentu sarasas</h1>

            <div className="mt-5">
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    onChange={handleFilterChange}
                    value={filterValue}
                    placeholder="Pasieška"
                />
            </div>
            <div className='mt-5'>
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-600 text-white">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Vardas</th>
                        <th className="px-4 py-2">Pavardė</th>
                        <th className="px-4 py-2">El. paštas</th>
                        <th className="px-4 py-2"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredStudents.map((student) => (
                        <tr key={student.id} className="bg-gray-200">
                            <td className="border px-4 py-2">{student.id}</td>
                            <td className="border px-4 py-2">{student.firstname}</td>
                            <td className="border px-4 py-2">{student.lastname}</td>
                            <td className="border px-4 py-2">{student.email}</td>
                            <td className="border px-4 py-2">
                                { isUserLoggedIn && (
                                    <>
                                        <Link
                                            to={`/edit-student/${student.id}`}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Redaguoti
                                        </Link>

                                        { isUserAdmin && (
                                            <button
                                                className="bg-red-500 hover:bg-red-400 text-white font-bold ml-2 py-2 px-4 rounded"
                                                onClick={() => deleteStudent(student.id)}
                                            >
                                                Ištrinti
                                            </button>
                                        )}
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
