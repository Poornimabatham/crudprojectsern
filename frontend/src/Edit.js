import React from "react";
import { useParams, useNavigate } from "react-router-dom";
const Edit = () => {
  const { id } = useParams(); // Get the ID from the URL

  const [employee, setEmployee] = useState({
    name: "",
    Code: "",
  });

  // Fetch employee data when the component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:8001/employees/${id}`)
      .then((res) => setEmployee(res.data))
      .catch((err) => console.error("Error fetching employee:", err));
  }, [id]);

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", values); // Debugging
    axios
      .put("http://localhost:8081/editemployee", values)
      .then((res) => console.log("Response:", res))
      .catch((err) => console.log("Error:", err));
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        {/* ✅ Only one <form> tag */}
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name" // ✅ Added name attribute
              type="text"
              placeholder="Full Name"
              value={employee.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Code"
            >
              Employee Code
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="Code"
              name="Code" // ✅ Added name attribute
              type="text"
              placeholder="Employee Code"
              value={employee.Code}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit" // ✅ Changed to "submit"
            >
              Submit
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2024 Your Company. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Edit;
