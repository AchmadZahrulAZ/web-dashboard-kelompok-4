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
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-darkblue text-white">
            <h5 className="modal-title">
              {/* Conditionally render the login or register icon */}
              {isLogin ? (
                <i className="bi bi-person-circle"></i> // Login icon
              ) : (
                <i className="bi bi-person-plus-fill"></i> // Register icon
              )}
              {/* Display "Login" or "Register" title based on the isLogin state */}
              {isLogin ? " Login" : " Register"}
            </h5>
          </div>
          <div className="modal-body">
            {/* Render error message if an error exists */}
            {error && (
              <div className="alert alert-danger d-flex flex-col align-items-center justify-content-center">
                <i className="bi bi-exclamation-triangle py-2"></i>
                {/* Check if error is an array before using map to display multiple error messages */}
                {Array.isArray(error) ? (
                  error.map((errMsg, index) => <p key={index}>{errMsg}</p>) // Map through error array
                ) : (
                  <p>{error}</p> // If it's a single error message, display it directly
                )}
              </div>
            )}
            {/* The form element */}
            <form onSubmit={handleSubmit}>
              {/* Conditionally render the name and role fields for registration only */}
              {!isLogin && (
                <>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={form.name} // Bind the name field to form state
                      onChange={handleChange} // Update form state when user types
                      required
                      minLength="2"
                      maxLength="30"
                      disabled={loading} // Disable input when loading
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={form.role} // Bind the role field to form state
                      onChange={handleChange} // Update form state when role changes
                      className="form-control"
                      disabled={loading} // Disable input when loading
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </>
              )}
              {/* Username field common for both login and registration */}
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={form.username} // Bind username field to form state
                  onChange={handleChange} // Update form state when user types
                  required
                  minLength="6"
                  maxLength="15"
                  disabled={loading} // Disable input when loading
                  autoComplete="username" // Browser auto-complete for username
                />
              </div>
              {/* Password field common for both login and registration */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={form.password} // Bind password field to form state
                  onChange={handleChange} // Update form state when user types
                  id="password"
                  required
                  disabled={loading} // Disable input when loading
                  autoComplete="current-password" // Browser auto-complete for password
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="btn w-100 mt-2 fw-bold text-white"
                style={{ backgroundColor: "#0E1F51" }}
                disabled={loading} // Disable button when loading
              >
                {/* Change button text based on whether it's login or register */}
                {isLogin ? "Login " : "Register "}
                {isLogin ? (
                  <i className="bi bi-box-arrow-in-right"></i> // Login icon
                ) : (
                  <i className="bi bi-box-arrow-in-down"></i> // Register icon
                )}
              </button>

              {/* Button to toggle between login and register */}
              <button
                onClick={toggleLogin} // Toggle between login and register
                className="btn btn-link w-100 mt-3 text-body-secondary text-decoration-none"
                disabled={loading} // Disable button when loading
              >
                {isLogin ? "Register" : "Login"} {/* Toggle text */}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
