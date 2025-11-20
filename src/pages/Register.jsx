import { useState } from "react";
import api from "../middleware/API";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaPhone, FaUserShield, FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";

function Register() {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    password: "",
    role: "",
    contact: "",
  });

  const roles = ["chef", "customer", "admin", "delivery"];

  const messages = {
    username: "only letters, numbers, underscores, 3 to 16 characters",
    email: "email pettern is test@example.com",
    password:
      "at least 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char",
    // role: "select one not default",
    contact: "10-digit number",
  };

  const [isEmpty, setIsEmpty] = useState(false);
  const [focusField, setFocusField] = useState("");
  const navigate = useNavigate();

  // Handle Input Change
  function handleInput(event) {
    const { name, value } = event.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  }

  // Handle Form Submit
  async function handleSubmit(event) {
    event.preventDefault();
    setIsEmpty(false);

    for (let key in userDetails) {
      if (!validateField(key, userDetails[key])) {
        toast.warning(`${key} is not valid!`);
        setIsEmpty(true);
        return;
      }
    }
    if (!isEmpty) {
      try {
        const response = await api
          .post("/register", userDetails)
          .then((res) => res.data);
        if (response.status === "success") {
          navigate("/login");
        }
      } catch (err) {
        toast.error(err.response.data.message || "Registration failed");
      }
    }
  }

  // Validation Patterns
  const patterns = {
    userName: /^[a-zA-Z0-9_]{3,16}$/,
    email: /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    role: /^[a-zA-Z]{3,20}$/,
    contact: /^(\+?\d{1,3}[- ]?)?\d{10}$/,
  };

  // Validate Field
  function validateField(field, value) {
    return patterns[field].test(value);
  }

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
          <form
            className="border border-info-subtle p-5 bg-white shadow rounded-4"
            onSubmit={handleSubmit}
          >
            <h2 className="mb-4 text-center text-info fw-bold">
              Register Here
            </h2>

            {/* Username */}
            <div className="mb-3 position-relative">
              <label htmlFor="userName" className="form-label fw-semibold">
                <FaUser className="me-2 text-info" />
                Name
              </label>
              <input
                type="text"
                className="form-control py-2"
                id="userName"
                name="userName"
                placeholder="Enter your name"
                onChange={handleInput}
                value={userDetails.userName}
                onFocus={() => setFocusField("userName")}
                onBlur={() => setFocusField("")}
              />
              {focusField === "userName" && (
                <small className="text-muted">{messages.username}</small>
              )}
            </div>

            {/* Email */}
            <div className="mb-3 position-relative">
              <label htmlFor="email" className="form-label fw-semibold">
                <FaEnvelope className="me-2 text-info" />
                Email
              </label>
              <input
                type="email"
                className="form-control py-2"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleInput}
                value={userDetails.email}
                onFocus={() => setFocusField("email")}
                onBlur={() => setFocusField("")}
              />
              {focusField === "email" && (
                <small className="text-muted">{messages.email}</small>
              )}
            </div>

            {/* Password */}
            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label fw-semibold">
                <FaLock className="me-2 text-info" />
                Password
              </label>
              <input
                type="password"
                className="form-control py-2"
                id="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleInput}
                value={userDetails.password}
                onFocus={() => setFocusField("password")}
                onBlur={() => setFocusField("")}
              />
              {focusField === "password" && (
                <small className="text-muted">{messages.password}</small>
              )}
            </div>

            {/* Role */}
            <div className="mb-3">
              <label htmlFor="role" className="form-label fw-semibold">
                <FaUserShield className="me-2 text-info" />
                Role
              </label>
              <select
                className="form-select py-2"
                id="role"
                name="role"
                onChange={handleInput}
                value={userDetails.role}
              >
                <option value="">Select your role</option>
                {/* <option value="chef">Chef</option>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option> */}
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Contact */}
            <div className="mb-3 position-relative">
              <label htmlFor="contact" className="form-label fw-semibold">
                <FaPhone className="me-2 text-info" />
                Contact
              </label>
              <input
                type="tel"
                className="form-control py-2"
                id="contact"
                name="contact"
                placeholder="Enter your phone number"
                onChange={handleInput}
                value={userDetails.contact}
                onFocus={() => setFocusField("contact")}
                onBlur={() => setFocusField("")}
              />
              {focusField === "contact" && (
                <small className="text-muted">{messages.contact}</small>
              )}
            </div>

            {/* Submit Button */}
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-info text-white fw-bold py-2"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
