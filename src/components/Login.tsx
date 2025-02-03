import React, { useState } from "react";
import "../CSS/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          alert("Passwords do not match");
          return;
        }

        const response = await axios.post(
          "http://localhost:8080/users",
          {
            fullName: fullName,
            email: email,
            password: password,
          }
        );

        console.log("User registered successfully", response.data);
        navigate("/products");
      } else {
        const response = await axios.post("http://localhost:8080/users", {
          email: email,
          password: password,
        });

        if (response.data.success) {
          console.log("User logged in successfully", response.data);
          navigate("/products");
        } else {
          setErrorMessage("Incorrect email or password");
        }
      }
    } catch (error) {
      console.error("Error", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="section">
      <div className="container">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <h6 className="mb-0 pb-3">
                <span onClick={toggleForm}>GİRİŞ YAP</span>
                <span onClick={toggleForm}>Kayıt Ol</span>
              </h6>
              <input
                className="checkbox"
                type="checkbox"
                id="reg-log"
                name="reg-log"
                checked={isSignUp}
                onChange={toggleForm}
              />
              <label htmlFor="reg-log"></label>
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Giriş Yap</h4>
                        <form onSubmit={handleFormSubmit}>
                          {errorMessage && <p className="error-message">{errorMessage}</p>}
                          <div className="form-group">
                            <input
                              type="email"
                              name="logemail"
                              className="form-style"
                              placeholder="Mail Adress"
                              id="logemail"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              autoComplete="off"
                              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                              required
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="logpass"
                              className="form-style"
                              placeholder="Şifre"
                              id="logpass"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              autoComplete="off"
                              required
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button type="submit" className="btn mt-4">
                            GİRİŞ
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Kayıt Ol</h4>
                        <form onSubmit={handleFormSubmit}>
                          {errorMessage && <p className="error-message">{errorMessage}</p>}
                          <div className="form-group">
                            <input
                              type="text"
                              name="logname"
                              className="form-style"
                              placeholder="Ad Soyad"
                              id="logname"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="email"
                              name="logemail"
                              className="form-style"
                              placeholder="Mail Adress"
                              id="logemail"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              autoComplete="off"
                              required
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="logpass"
                              className="form-style"
                              placeholder="Şifre"
                              id="logpass"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              autoComplete="off"
                              required
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="logpassConfirm"
                              className="form-style"
                              placeholder="Şifre Tekrarla"
                              id="logpassConfirm"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              autoComplete="off"
                              required
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button type="submit" className="btn mt-4">
                            Kayıt Ol
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
