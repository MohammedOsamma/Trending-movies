import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

// ----------------------------------------------------------
export default function Signup() {
  let [errorsList, setErrorsList] = useState([]);
  let [error, setError] = useState("");

  // _________________________________________________________

  let navigate = useNavigate();
  let [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: "",
    email: "",
    password: "",
  });
  // _________________________________________________________
  let waitTime = 400;
  function debounce(fn, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), wait);
    };
  }
  function getUserData(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }
  // _______________________________________________________

  // async function submitRegisterFrom(event) {
  //   event.preventDefault();

  //   let validateResult = validationRegisterForm();

  //   if (validateResult.error) {
  //     setErrorsList(validateResult.error.details);
  //   } else {
  //     let { data } = await Axios.post("http://localhost:5000/signup", user);
  //     if (data.message === "User signed up successfully") {
  //       navigate("/login");
  //     } else if (data.status === 400) {
  //       alert("Hellos");
  //     }
  //     // if (data.messaege === "User already exists.") {
  //     //   console.log("hello ");

  //     //   // setError(new Error(data.message));
  //     //   // setError(data.message); // Set the error state with the response message
  //     // }
  //   }
  // }

  async function submitRegisterForm(event) {
    event.preventDefault();

    let validateResult = validationRegisterForm();

    if (validateResult.error) {
      setErrorsList(validateResult.error.details);
    } else {
      try {
        let { data } = await Axios.post("http://localhost:5000/signup", user);

        if (data.message === "User signed up successfully") {
          navigate("/login");
        }
      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 200 range
          if (error.response.status === 400) {
            // setError(error.response.data.message);
            Swal.fire("Error", error.response.data.message, "error");
          } else if (error.response.status === 404) {
            // setError("Server not found. Please try again later.");
            Swal.fire(
              "Error",
              "Server not found. Please try again later.",
              "error"
            );
          } else {
            setError("An unexpected error occurred. Please try again.");
            Swal.fire(
              "Error",
              "An unexpected error occurred. Please try again.",
              "error"
            );
          }
        } else if (error.request) {
          // Request was made but no response received
          setError(
            "No response from server. Please check your network connection."
          );
          Swal.fire(
            "Error",
            "No response from server. Please check your network connection.",
            "error"
          );
        } else {
          // Something else happened in setting up the request
          setError("Error in setting up the request.");
          Swal.fire("Error", "Error in setting up the request.", "error");
        }
      }
    }
  }
  // _______________________________________________________

  function validationRegisterForm() {
    let shceme = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(10).required(),
      last_name: Joi.string().alphanum().min(3).max(10).required(),
      age: Joi.number().min(16).max(80).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });
    return shceme.validate(user, { abortEarly: false });
  }
  return (
    <>
      <div className="w-75 mx-auto">
        <h2>Register Now </h2>
        {errorsList.map((error) => (
          <div className="alert alert-danger">{error.message}</div>
        ))}
        {error.length > 0 ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          " "
        )}
        <form onSubmit={submitRegisterForm}>
          <label htmlFor="first_name">First Name</label>
          <input
            onChange={debounce(getUserData, waitTime)}
            className="form-control mb-2"
            type="text"
            id="first_name"
            name="first_name"
          />
          <label htmlFor="last_name">Last Name</label>
          <input
            onChange={debounce(getUserData, waitTime)}
            className="form-control mb-2"
            type="text"
            id="last_name"
            name="last_name"
          />
          <label htmlFor="email">Email</label>
          <input
            onChange={debounce(getUserData, waitTime)}
            className="form-control mb-2"
            type="email"
            id="email"
            name="email"
          />
          <label htmlFor="password">Password</label>
          <input
            onChange={debounce(getUserData, waitTime)}
            className="form-control mb-2"
            type="password"
            id="password"
            name="password"
          />
          <label htmlFor="age">Age </label>
          <input
            onChange={debounce(getUserData, waitTime)}
            className="form-control mb-2"
            type="number"
            id="age"
            name="age"
          />

          <button type="submit" className="btn btn-outline-info">
            SignUp
          </button>
        </form>
      </div>
    </>
  );
}
