import React, { useState } from "react";
import Joi from "joi";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
// _______________________________________________________________

export default function Login({ isLodaingHandler }) {
  let [errorList, setErrorList] = useState([]);
  let [error, setError] = useState("");
  let navigate = useNavigate();
  let [user, setUser] = useState({
    email: "",
    password: "",
  });
  // _______________________________________________________________

  function getUserData(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
    console.log(myUser);
  }
  // _______________________________________________________________
  const submitLoginFrom = async (event) => {
    event.preventDefault();

    let validateResult = validationRegisterForm();
    if (validateResult.error) {
      setErrorList(validateResult.error.details);
    } else {
      let { data } = await Axios.post("http://localhost:5000/signin", user);
      if (data.message === "User signed in successfully") {
        localStorage.setItem("userToken", data.token);
        isLodaingHandler();
        navigate("/home");
        console.log(data);
      } else {
        setError(data.message); // Set the error state with the response message
      }
    }
  };
  // _______________________________________________________________
  function validationRegisterForm() {
    let shceme = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{7,30}$"))
        .required(),
    });
    return shceme.validate(user, { abortEarly: false });
  }
  return (
    <>
      <div className="w-75 mx-auto">
        <h2>Login Now </h2>
        {errorList.map((error, index) =>
          index === 1 ? (
            <div key={index} className="alert alert-danger">
              Password is invalid
            </div>
          ) : (
            <div key={index} className="alert alert-danger">
              Password in invaild
            </div>
          )
        )}
        {error.length > 0 ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          " "
        )}
        <form onSubmit={submitLoginFrom}>
          <label htmlFor="email">Email</label>
          <input
            onChange={getUserData}
            className="form-control mb-2"
            type="email"
            id="email"
            name="email"
          />
          <label htmlFor="password">Password</label>
          <input
            onChange={getUserData}
            className="form-control mb-2"
            type="password"
            id="password"
            name="password"
          />

          <button type="submit" className="btn btn-outline-info">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
