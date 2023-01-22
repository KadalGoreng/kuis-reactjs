import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");

  const navigate = useNavigate();

  const handleValidation = () => {
    let formIsValid = true;

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("Email Not Valid");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }

    if (!password.match(/^[a-zA-Z]{8,22}$/)) {
      formIsValid = false;
      setpasswordError(
        "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
      );
      return false;
    } else {
      setpasswordError("");
      formIsValid = true;
    }

    return formIsValid;
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    if (handleValidation()) {
      localStorage.setItem("username", email);
      navigate("/home");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh", width: "50%" }}
    >
      <div className="col-md-6 mb-5">
        <h1 className="text-center mb-5">Selamat Datang</h1>
        <form onSubmit={loginSubmit}>
          <div className="form-group">
            <label>Email / Username</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onInput={(e) => setEmail(e.target.value)}
            />
            <small id="emailHelp" className="text-danger form-text">
              {emailError}
            </small>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              onInput={(e) => setPassword(e.target.value)}
            />
            <small id="passworderror" className="text-danger form-text">
              {passwordError}
            </small>
          </div>
          <div className="form-group form-check">
            <p className="form-check-label text-end">Lupa Password?</p>
          </div>
          <button
            style={{ width: "100%" }}
            type="submit"
            className="btn btn-success mt-4"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
