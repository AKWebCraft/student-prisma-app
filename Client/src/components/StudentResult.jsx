import React from "react";

const StudentResult = ({ student }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {/* Student Info */}
      <div className="flex flex-col items-center">
        <img
          src={student.photo}
          alt={`${student.name}'s photo`}
          className="w-32 h-32 rounded-full object-cover mb-4"
        />
        <h1 className="text-3xl font-bold mb-4">{student.name}</h1>
      </div>

      {/* Result Table */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Subject-wise Marks</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="w-full bg-gray-100">
                <th className="px-4 py-2 text-left text-gray-600">Subject</th>
                <th className="px-4 py-2 text-left text-gray-600">Marks</th>
              </tr>
            </thead>
            <tbody>
              {student.results.map((result, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{result.book}</td>
                  <td className="px-4 py-2">{result.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentResult;
