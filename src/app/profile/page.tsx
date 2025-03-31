"use client";
import { useState } from "react";
import Image from "next/image";

export default function ProfileAll() {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isEditing, setIsEditing] = useState(true);
  const [savedData, setSavedData] = useState({ ...formData });
  const [previousData, setPreviousData] = useState({ ...formData });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSavedData({ ...formData });
    setIsEditing(false);
  };

  const handleEdit = () => {
    setPreviousData({ ...formData });
    setFormData({ ...savedData });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({ ...previousData });
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-2xl flex flex-col items-center">
        <form
          className="flex flex-col items-center justify-center w-3/4"
          onSubmit={handleSubmit}
        >
          <article className="flex flex-col items-center justify-center mb-4">
            <Image
              src={"/img/Iphone.jpg"}
              alt="Avatar"
              width={80}
              height={80}
              className="rounded-full border border-gray-300"
            />
            {isEditing && (
              <label className="mt-2 cursor-pointer bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-300">
                Rasm yuklash
                <input
                  type="file"
                  className="hidden"
                />
              </label>
            )}
          </article>

          <div className="flex items-center gap-6 mb-4 w-full">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Familiya
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Familiya kiriting"
                className="w-full py-2 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-200"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ism
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Ism kiriting"
                className="w-full py-2 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-200"
                required
              />
            </div>
          </div>

          <div className="w-full mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Emailingizni kiriting"
              className="w-full py-2 border border-gray-300 rounded-lg px-4 mb-3 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-200"
              required
            />

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Yangi parol
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Parol kiriting"
              className="w-full py-2 border border-gray-300 rounded-lg px-4 mb-3 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-200"
              required
            />

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Parolni qayta kiriting
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Parolni qayta kiriting"
              className="w-full py-2 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-200"
              required
            />
          </div>

          {isEditing ? (
            <>
              <button
                type="submit"
                className="text-center py-2 w-72 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition mb-3"
              >
                Saqlash
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="text-center py-2 w-72 bg-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-300 transition"
              >
                Bekor qilish
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleEdit}
              className="text-center py-2 w-72 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition mb-3"
            >
              Tahrirlash
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
