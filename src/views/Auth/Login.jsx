//import layoutAuth
import LayoutAuth from "../../layouts/Auth";

//import state
import { useState } from "react";

//import service
import Api from "../../services/Api";

//import Cookie
import Cookies from "js-cookie";

//import Navigate
import { Navigate, useNavigate } from "react-router-dom";

//import toast
import toast from "react-hot-toast";

export default function Login() {
  //title page
  document.title = "Login - Admin Desa";

  //navigate
  const navigate = useNavigate();

  //define state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //define state errors
  const [errors, setErrors] = useState([]);

  //method login
  const login = async (e) => {
    e.preventDefault();

    await Api.post("/api/login", {
      //data
      email: email,
      password: password,
    })
      .then((response) => {
        //set token to cookies
        Cookies.set("token", response.data.token);

        //set user to cookies
        Cookies.set("user", JSON.stringify(response.data.user));

        //set permissions to cookies
        Cookies.set("permissions", JSON.stringify(response.data.permissions));

        //show toast
        toast.success("Login Successfully!", {
          position: "top-right",
          duration: 4000,
        });

        //redirect dashboard page
        navigate("/admin/dashboard");
      })
      .catch((error) => {
        //set response error to state
        setErrors(error.response.data);
      });
  };

  //check if cookie already exists
  if (Cookies.get("token")) {
    //redirect dashboard page
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <LayoutAuth>
      <div id="auth-left">
        <div className="auth-logo">
          <a href="/">
            <img
              src="./images/situraja.svg"
              alt="Logo"
              style={{ height: "50px" }}
            />
          </a>
        </div>
        <h1 className="auth-title">Login.</h1>
        <p className="auth-subtitle mb-5">
          Silahkan Masuk untuk Mengelola Data dan Layanan Desa Lebih Mudah🚀
        </p>

        {errors.message && (
          <div className="alert alert-danger">{errors.message}</div>
        )}

        <form onSubmit={login}>
          <div className="form-group position-relative has-icon-left mb-4">
            <input
              type="text"
              className="form-control form-control-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <div className="form-control-icon">
              <i className="bi bi-envelope"></i>
            </div>
          </div>
          {errors.email && (
            <div className="alert alert-danger mt-2">{errors.email[0]}</div>
          )}

          <div className="form-group position-relative has-icon-left mb-4">
            <input
              type="password"
              className="form-control form-control-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <div className="form-control-icon">
              <i className="bi bi-shield-lock"></i>
            </div>
          </div>
          {errors.password && (
            <div className="alert alert-danger mt-2">{errors.password[0]}</div>
          )}

          <button
            className="btn btn-primary btn-block btn-lg shadow-lg mt-5"
            type="submit"
          >
            Log in
          </button>
        </form>
      </div>
    </LayoutAuth>
  );
}
