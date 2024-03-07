import {useParams} from "react-router";
import {useAuthContext} from "../../store/AuthCtxProvider.jsx";
import {useNavigate} from "react-router-dom";
import useApiData from "../../hooks/useApiData.jsx";
import {baseApiUrl, roles} from "../../helper.js";
import {useFormik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import Select from "react-select";

export default function UserEditPage() {
    const {id} = useParams();

    const {token} = useAuthContext();

    const navigate = useNavigate();

    const options = roles;

    const [user, setUser] = useApiData(`${baseApiUrl}users/${id}`) ?? {
        email: '',
        scope: '',
        verified: false
    };

    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
            email: user.email ?? '',
            password: '',
            scope: user.scope ?? '',
            verified: user.verified ?? false
        },
        validationSchema: Yup.object({
            email: Yup.string().email().min(3).max(128).required('El. paštas privalomas laukas'),
            password: Yup.string().min(3).max(64).optional(),
            scope: Yup.string().oneOf(Array.from(options, (option) => option.value)).required(),
            verified: Yup.bool()
        }),
        onSubmit: (values) => {
            values = { ...values, verified: !!values.verified}
            sendPutData(values)
        }
    });

    function sendPutData(data) {
        axios
            .put(`${baseApiUrl}users/${id}`, data, {
                headers: {'Authorization': token}
            })
            .then((response) => {
                navigate('/list-user');
                toast.success(response.data.message);
            })
            .catch((error) => {
                toast.error(error.response.data.error);
            })
    }

    return (
        <div className="container mx-auto mt-5">
            <h1 className="text-3xl my-5">Vartotojo redagavimas</h1>
            <form className='w-full mx-auto max-w-sm' onSubmit={formik.handleSubmit}>
                <div className='mb-8'>
                    <label
                        htmlFor='email'
                        className='block text-gray-700 text-sm font-bold mb-2'
                    >
                        EL. paštas
                    </label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    {formik.touched['email'] && formik.errors['email'] && (
                        <p className='text-red-600'>{formik.errors['email']}</p>
                    )}
                </div>
                <div className="mb-8">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Slaptažodis
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    {formik.touched['password'] && formik.errors['password'] && (
                        <p className='text-red-600'>{formik.errors['password']}</p>
                    )}
                </div>
                <div className="mb-8">
                    <label
                        htmlFor="scope"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Rolė
                    </label>
                    <Select
                        name='scope'
                        id='scope'
                        options={options}
                        placeholder="Pasirinkite rolę"
                        value={options ? options.find(option => option.value === formik.values.scope) : ''}
                        defaultValue={formik.values.scope}
                        onBlur={formik.handleBlur}
                        onChange={(option) => formik.setFieldValue('scope', option.value)}
                        className='appearance-none rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    {formik.touched['scope'] && formik.errors['scope'] && (
                        <p className='text-red-600'>{formik.errors['scope']}</p>
                    )}
                </div>
                <div className="mb-8">
                    <label
                        htmlFor="verified"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Vartotojas patvirtintas
                    </label>
                    <input
                        type="checkbox"
                        id="verified"
                        name="verified"
                        value={formik.values.verified ? 1 : 0}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        onBlur={formik.handleBlur}
                        onChange={(e) => {formik.setFieldValue('verified',e.target.checked)}}
                        checked={formik.values.verified}
                    />
                    {formik.touched['verified'] && formik.errors['verified'] && (
                        <p className='text-red-600'>{formik.errors['verified']}</p>
                    )}
                </div>
                <div className='flex items-center justify-center'>
                    <button
                        type='submit'
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    >
                        Išsaugoti
                    </button>
                </div>
            </form>
        </div>
    );
}
