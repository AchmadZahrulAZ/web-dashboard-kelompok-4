import React from "react";

export default function LoginModal({
  isLogin,
  handleSubmit,
  toggleLogin,
  handleChange,
  error,
  loading,
  form,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-lg font-bold text-darkblue">
            {isLogin ? (
              <i className="bi bi-person-circle text-xl"></i> // Login icon
            ) : (
              <i className="bi bi-person-plus-fill text-xl"></i> // Register icon
            )}
            {isLogin ? " Login" : " Register"}
          </h5>
        </div>
        <div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">
                {Array.isArray(error)
                  ? error.map((errMsg, index) => <p key={index}>{errMsg}</p>)
                  : error}
              </span>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 min-h-8 p-2 border-b border-darkblue rounded-md shadow-sm focus:ring focus:ring-darkblue focus:border-darkblue"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    minLength="2"
                    maxLength="30"
                    disabled={loading}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 min-h-8 p-2 rounded-md shadow-sm focus:ring focus:ring-darkblue focus:border-darkblue"
                    disabled={loading}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User </option>
                  </select>
                </div>
              </>
            )}
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 min-h-8 p-2 border-b border-darkblue rounded-md shadow-sm focus:ring focus:ring-darkblue focus:border-darkblue"
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                minLength="6"
                maxLength="15"
                disabled={loading}
                autoComplete="username"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full border-gray-300 min-h-8 p-2 border-b border-darkblue rounded-md shadow-sm focus:ring focus:ring-darkblue focus:border-darkblue"
                name="password"
                value={form.password}
                onChange={handleChange}
                id="password"
                required
                disabled={loading}
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-darkblue text-white font-bold py-2 border-b border-darkblue rounded-md hover:bg-darkblue/[.8] transition duration-200"
              disabled={loading}
            >
              {isLogin ? "Login " : "Register "}
              {isLogin ? (
                <i className="bi bi-box-arrow-in-right"></i> // Login icon
              ) : (
                <i className="bi bi-box-arrow-in-down"></i> // Register icon
              )}
            </button>

            <button
              onClick={toggleLogin}
              className="w-full mt-3 text-darkblue text-center underline"
              disabled={loading}
 >
              {isLogin ? "Create an account" : "Already have an account?"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}