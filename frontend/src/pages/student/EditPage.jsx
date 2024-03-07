import {useFormik} from "formik";
import * as Yup from "yup";
import useApiData from "../../hooks/useApiData.jsx";
import {baseApiUrl} from "../../helper.js";
import {useParams} from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../../store/AuthCtxProvider.jsx";
import ListPage from "./ListPage.jsx";

export default function ListingEditPage() {
    const { id } = useParams();
    const { token } = useAuthContext();
    const navigate = useNavigate();
  
    const [listing, setListing] = useApiData(`${baseApiUrl}skelbimai/${id}`) ?? {
      title: '',
      category: '',
      description: '',
      price: 0,
      url: ''
    };
  
    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        title: listing.title ?? '',
        category: listing.category ?? '',
        description: listing.description ?? '',
        price: listing.price ?? 0,
        url: listing.url ?? ''
      },
      validationSchema: Yup.object({
        title: Yup.string().min(3).max(255).required(),
        category: Yup.string().min(3).max(50).required(),
        description: Yup.string().min(3).max(255).required(),
        price: Yup.number().required().min(0),
        url: Yup.string().url().required()
      }),
      onSubmit: (values) => {
        sendPutData(values);
      }
    });
  
    function sendPutData(data) {
      axios
        .put(`${baseApiUrl}skelbimai/${id}`, data, {
          headers: { 'Authorization': token }
        })
        .then((response) => {
          navigate('/listings');
          toast.success('Listing information updated successfully!');
        })
        .catch((error) => {
          toast.error(error.response?.data?.error || 'An error occurred while updating listing information');
        });
    }
  
    return (
      <div className='container mx-auto mt-5'>
        <h1 className='text-3xl my-5'>Edit Listing: {listing.title}</h1>
        <p className='my-5'>
          Edit existing listing page
        </p>
        <form className='w-full mx-auto max-w-sm' onSubmit={formik.handleSubmit}>
          <div className='mb-8'>
            <label
              htmlFor='title'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Title
            </label>
            <input
              type='text'
              id='title'
              name='title'
              value={formik.values.title}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
            {formik.touched.title && formik.errors.title && (
              <p className='text-red-600'>{formik.errors.title}</p>
            )}
          </div>
          <div className='mb-8'>
            <label
              htmlFor='category'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Category
            </label>
            <input
              type='text'
              id='category'
              name='category'
              value={formik.values.category}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
            {formik.touched.category && formik.errors.category && (
              <p className='text-red-600'>{formik.errors.category}</p>
            )}
          </div>
          <div className='mb-8'>
            <label
              htmlFor='description'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Description
            </label>
            <input
              type='text'
              id='description'
              name='description'
              value={formik.values.description}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
            {formik.touched.description && formik.errors.description && (
              <p className='text-red-600'>{formik.errors.description}</p>
            )}
          </div>
          <div className='mb-8'>
            <label
              htmlFor='price'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Price
            </label>
            <input
              type='number'
              id='price'
              name='price'
              value={formik.values.price}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
            {formik.touched.price && formik.errors.price && (
              <p className='text-red-600'>{formik.errors.price}</p>
            )}
          </div>
          <div className='mb-8'>
            <label
              htmlFor='url'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Image URL
            </label>
            <input
              type='url'
              id='url'
              name='url'
              value={formik.values.url}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
            {formik.touched.url && formik.errors.url && (
              <p className='text-red-600'>{formik.errors.url}</p>
            )}
          </div>
          <div className='flex items-center justify-center'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }