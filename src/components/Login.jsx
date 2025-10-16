import { useState } from "react";
import api from "../middleware/API";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../store/authstore";
import { useDispatch } from "react-redux";
import {
  FaEnvelope,
  FaKey,
  FaUserShield,
  FaSignInAlt,
  FaLock,
} from "react-icons/fa";

// import Cookies from "js-cookie"

function Login() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [field, setField] = useState("");
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const isLogin = useSelect((state) => state.value);

  function handleInput(event) {
    const { name, value } = event.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsEmpty(false);
    setError(null);

    for (let key in userDetails) {
      if (userDetails[key].length == 0) {
        setField(key);
        setIsEmpty(true);
      }
    }

    if (!isEmpty) {
      const response = await api
        .post("/login", userDetails)
        .then((res) => res.data)
        .catch((err) => {
          setError(err);
          console.log(err);
        });
      const user = response.data;
      const token = response.token;
      if (response.status === "success") {
        sessionStorage.setItem("user", JSON.stringify(user));
        dispatch(
          loginSuccess({
            user,
            token,
          })
        );
        navigate("/home");
      }
    }
  }

  function handleToastClose() {
    setIsEmpty(false);
  }

  function handleToastError() {
    setError(null);
  }

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
          <form
            className="border border-info-subtle p-5 bg-white shadow rounded-4"
            onSubmit={handleSubmit}
          >
            <h2 className="mb-4 text-center text-info fw-bold">
              <FaLock className="me-2" />
              Login Here
            </h2>

            {/* Email */}
            <div className="mb-3">
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
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">
                <FaKey className="me-2 text-info" />
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
              />
            </div>

            {/* Role Selection */}
            <div className="mb-4">
              <label htmlFor="role" className="form-label fw-semibold">
                <FaUserShield className="me-2 text-info" />
                Role
              </label>
              <select
                className="form-select py-2"
                id="role"
                name="role"
                onChange={handleInput}
                defaultValue=""
              >
                <option value="">Select your role</option>
                <option value="chef">Chef</option>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-info text-white fw-bold py-2"
              >
                <FaSignInAlt className="me-2" />
                Login
              </button>
            </div>
          </form>

          {/* Alerts */}
          {isEmpty && (
            <div
              className="alert alert-warning alert-dismissible fade show mt-3"
              role="alert"
            >
              <strong>{field} is empty!</strong>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={handleToastClose}
              ></button>
            </div>
          )}
          {error && (
            <div
              className="alert alert-danger alert-dismissible fade show mt-3"
              role="alert"
            >
              <strong>Login failed. Please try again.</strong>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={handleToastError}
              ></button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
