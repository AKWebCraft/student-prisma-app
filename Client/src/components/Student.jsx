import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Student = () => {
  const { username, image, name, email } = useSelector((state) => state.user);
  return (
    <div className="flex items-center bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
      {username ? (
        <>
          <div className="mr-6">
            <img
              src={image}
              alt={`${name}'s photo`}
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">{name}</h2>
            <p className="text-gray-700">
              <strong>Contact:</strong> {email}
            </p>
            <Link to="/result">
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                View Result
              </button>
            </Link>
          </div>
        </>
      ) : (
        <div className="mr-6">
          <h2 className="font-bold">LogIn to See Your Result</h2>
        </div>
      )}
    </div>
  );
};

export default Student;
