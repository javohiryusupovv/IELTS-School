export default function TableUsers() {
  return (
    <div>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">userName</th>
            <th className="border border-gray-300 px-4 py-2">Login</th>
            <th className="border border-gray-300 px-4 py-2">Password</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">1</td>
            <td className="border border-gray-300 px-4 py-2">John Doe</td>
            <td className="border border-gray-300 px-4 py-2">admin</td>
            <td className="border border-gray-300 px-4 py-2">123456</td>
            <td className="border border-gray-300 px-4 py-2">admin</td>
            <td className="border border-gray-300 px-4 py-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Edit
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded ml-2">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
