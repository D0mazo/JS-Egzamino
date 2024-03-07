import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { baseApiUrl } from '../../helper.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../store/AuthCtxProvider.jsx';

export default function StudentCreatePage() {
  const navigate = useNavigate();
  const { token } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      title: '',
      category: '',
      discription: '',
      price: '',
      url: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().max(255).required(),
      category: Yup.string().max(50).required(),
      discription: Yup.string().max(255).required(),
      price: Yup.number().required(),
      url: Yup.string().url().max(255).required(),
    }),
    onSubmit: (values) => {
      sendPostData(values);
    },
  });

  function sendPostData(data) {
    axios
      .post(`${baseApiUrl}skelbimai`, data, {
        headers: { Authorization: token },
      })
      .then((response) => {
        navigate('/list-student');
        toast.success('Naujas skelbimas sėkmingai pridėtas');
      })
      .catch((error) => {
        toast.error(error.response?.data?.error || 'Something went wrong');
      });
  }

  return (
  

    
    <div className='container mx-auto mt-5'>
      <h1 className='text-3xl my-5'>Pridėti skelbimą</h1>
      <p className='my-5'>Naujo skelbimo sukūrimo puslapis</p>
      <form className='w-full mx-auto max-w-sm' onSubmit={formik.handleSubmit}>
        <div className='mb-8'>
          <label htmlFor='title' className='block text-gray-700 text-sm font-bold mb-2'>
            Pavadinimas
          </label>
          <input
            type='text'
            id='title'
            name='title'
            value={formik.values['title']}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
          {formik.touched['title'] && formik.errors['title'] && (
            <p className='text-red-600'>{formik.errors['title']}</p>
          )}
        </div>
        <div className='mb-8'>
          <label htmlFor='category' className='block text-gray-700 text-sm font-bold mb-2'>
            Kategorija
          </label>
          <input
            type='text'
            id='category'
            name='category'
            value={formik.values['category']}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
          {formik.touched['category'] && formik.errors['category'] && (
            <p className='text-red-600'>{formik.errors['category']}</p>
          )}
        </div>
        <div className='mb-8'>
          <label htmlFor='discription' className='block text-gray-700 text-sm font-bold mb-2'>
            Aprašymas
          </label>
          <input
            type='text'
            id='discription'
            name='discription'
            value={formik.values['discription']}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
          {formik.touched['discription'] && formik.errors['discription'] && (
            <p className='text-red-600'>{formik.errors['discription']}</p>
          )}
        </div>
        <div className='mb-8'>
          <label htmlFor='price' className='block text-gray-700 text-sm font-bold mb-2'>
            Kaina
          </label>
          <input
            type='number'
            id='price'
            name='price'
            value={formik.values['price']}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
          {formik.touched['price'] && formik.errors['price'] && (
            <p className='text-red-600'>{formik.errors['price']}</p>
          )}
        </div>
        <div className='mb-8'>
          <label htmlFor='url' className='block text-gray-700 text-sm font-bold mb-2'>
            Nuotrauka (URL)
          </label>
          <input
            type='url'
            id='url'
            name='url'
            value={formik.values['url']}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
          {formik.touched['url'] && formik.errors['url'] && (
            <p className='text-red-600'>{formik.errors['url']}</p>
          )}
        </div>
        <div className='flex items-center justify-center'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Sukurti
          </button>
        </div>
      </form>
    </div>
    
  );
}