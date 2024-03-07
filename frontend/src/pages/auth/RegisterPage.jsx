import {useFormik} from "formik";
import * as Yup from 'yup';
import axios from "axios";
import {baseApiUrl} from "../../helper.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom"

export default function RegisterPage() {
    const  navigate = useNavigate();

    const formik = useFormik({
       initialValues: {
           email: '',
           password: '',
           password_confirm: '',
       },
        validationSchema: Yup.object({
            email: Yup.string().email().min(3).max(128).required('El. paštas privalomas laukas'),
            password: Yup.string().min(3).max(64).required('Slaptažodis privalomas laukas'),
            password_confirm: Yup.string().required('Pakartotinas slaptažodis privalomas laukas').oneOf([Yup.ref('password'), null], 'Slaptažodžiai turi sutapti')
        }),
        onSubmit: (values) => {
           sendAxiosPost({
               email: values.email,
               password: values.password
           })
        }
    });

    function sendAxiosPost(data) {
        axios
            .post(`${baseApiUrl}auth/register`, data)
            .then((response) => {
                formik.resetForm();
                navigate('/');
                toast.success('Vartotojas sėkmingai sukurtas');
            })
            .catch((error) => {
                toast.error(error.response.data.error);
            })
    }

    return (
        <div className="container mx-auto mt-5">
            <h1 className="text-3xl my-5">Vartotojo registracijos puslapis</h1>

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
                        value={formik.values['email']}
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
                        value={formik.values['password']}
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
                        htmlFor="password-confirm"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Slaptažodžio pakartojimas
                    </label>
                    <input
                        type="password"
                        id="password-confirm"
                        name="password_confirm"
                        value={formik.values['password_confirm']}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    {formik.touched['password_confirm'] && formik.errors['password_confirm'] && (
                        <p className='text-red-600'>{formik.errors['password_confirm']}</p>
                    )}
                </div>
                <div className='flex items-center justify-center'>
                    <button
                        type='submit'
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    >
                        Registruotis
                    </button>
                </div>
            </form>
        </div>
    )
        ;
}
