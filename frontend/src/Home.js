import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8001/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Employee List</h1>
      
      {/* Button for adding an employee */}
      <div className="flex justify-end mb-4">
        <Link
          to="/create"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Employee +
        </Link>
      </div>

      {/* Table for employee data */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2 border border-gray-300 text-left">ID</th>
              <th className="p-2 border border-gray-300 text-left">Employee Code</th>
              <th className="p-2 border border-gray-300 text-left">First Name</th>
              <th className="p-2 border border-gray-300 text-left">Last Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="p-2 border border-gray-300">{row.Id}</td>
                <td className="p-2 border border-gray-300">{row.EmployeeCode}</td>
                <td className="p-2 border border-gray-300">{row.FirstName}</td>
                <td className="p-2 border border-gray-300">{row.LastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
