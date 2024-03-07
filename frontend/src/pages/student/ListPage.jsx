import useApiData from "../../hooks/useApiData.jsx";
import {baseApiUrl} from "../../helper.js";
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";
import toast from "react-hot-toast";
import {useAuthContext} from "../../store/AuthCtxProvider.jsx";
import {useMemo, useState} from "react";

export default function ListingPage() {
  const [filterValue, setFilterValue] = useState('');
  const [listingData, setListingData] = useApiData(`${baseApiUrl}skelbimai`);
  const { isUserAdmin, isUserLoggedIn, token } = useAuthContext();
  const navigate = useNavigate();

  const deleteListing = async (listingId) => {
    try {
      await axios.delete(`${baseApiUrl}skelbimai/${listingId}`, {
        headers: { Authorization: token },
      });
      navigate('/listings');
      toast.success(`Listing ID: ${listingId} successfully deleted!`);
      const updatedListings = listingData.filter((listing) => listing.id !== listingId);
      setListingData(updatedListings);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Something went wrong');
    }
  };

  const filteredListings = useMemo(() => {
    return listingData.filter(
      (listing) =>
        listing.title.toLowerCase().includes(filterValue.toLowerCase()) ||
        listing.category.toLowerCase().includes(filterValue.toLowerCase()) ||
        listing.discription.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [listingData, filterValue]);

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl">Listings</h1>

      <div className="mt-5">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          onChange={handleFilterChange}
          value={filterValue}
          placeholder="Search"
        />
      </div>

      <div className="mt-5">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-600 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">URL</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {filteredListings.map((listing) => (
              <tr key={listing.id} className="bg-gray-200">
                <td className="border px-4 py-2">{listing.id}</td>
                <td className="border px-4 py-2">{listing.title}</td>
                <td className="border px-4 py-2">{listing.category}</td>
                <td className="border px-4 py-2">{listing.discription}</td>
                <td className="border px-4 py-2">{listing.price}</td>
                <td className="border px-4 py-2"><img src={listing.url} style={{ maxWidth: '100px', maxHeight: '100px', display: 'block', margin: 'auto'}}></img></td>
                <td className="border px-4 py-2">
                  {isUserLoggedIn && (
                    <>
                      <Link
                        to={`/edit-listing/${listing.id}`}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Edit
                      </Link>
                      {isUserAdmin && (
                        <button
                          className="bg-red-500 hover:bg-red-400 text-white font-bold ml-2 py-2 px-4 rounded"
                          onClick={() => deleteListing(listing.id)}
                        >
                          Delete
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