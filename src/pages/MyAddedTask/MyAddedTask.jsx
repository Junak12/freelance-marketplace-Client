import React from "react";

const MyAddedTask = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">My Added Tasks</h2>

        <button className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 text-gray-700 hover:border-gray-400 transition">
          Add New Task
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="px-5 py-3 font-medium">Title</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Budget</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {/* Dummy Row */}
            <tr className="border-b last:border-none">
              <td className="px-5 py-4">Frontend Developer</td>
              <td className="px-5 py-4">Web Development</td>
              <td className="px-5 py-4">$800</td>
              <td className="px-5 py-4">
                <span className="px-2 py-1 text-xs rounded-md border border-green-300 text-green-600">
                  Active
                </span>
              </td>
              <td className="px-5 py-4 text-right space-x-3">
                <button className="text-blue-600 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Empty State (use later) */}
      {/* 
      <div className="text-center py-16 text-gray-500">
        No tasks added yet.
      </div> 
      */}
    </div>
  );
};

export default MyAddedTask;
