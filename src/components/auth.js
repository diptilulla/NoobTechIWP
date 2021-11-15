import React, { useState } from "react";
import { navigate } from "gatsby";
import { useDispatch } from "react-redux";
import FormInput from "./formInput/formInput";
import { signIn, signUp } from "../redux/features/user/usersSlice";
import { setPopup } from "../redux/features/popup/popupSlice";
import { ImCross } from "react-icons/im";
const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userCredentials, setUserCrendentials] = useState(initialState);
  // const [errors, setError] = useState({});
  const dispatch = useDispatch();

  const { email, password, confirmPassword } = userCredentials;

  const handleSubmit = (event) => {
    event.preventDefault(); //prevent default form submit action

    if (isSignUp) {
      if (password !== confirmPassword) {
        alert("passwords don't match");
        return;
      }
      dispatch(signUp({ signupDetails: { email, password }, navigate }));
    } else {
      dispatch(signIn({ signinDetails: { email, password }, navigate }));
      console.log(userCredentials);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserCrendentials({ ...userCredentials, [name]: value });
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };
  const closeForm = () => {
    dispatch(setPopup());
  };
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 10,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      className="w-11/12 p-10 bg-black sm:w-7/12 md:w-1/2 lg:w-4/12 m-auto border-2 border-purple rounded-md"
    >
      <ImCross
        className="block ml-auto cursor-pointer text-gray"
        onClick={closeForm}
      />
      <form>
        <FormInput
          type="email"
          name="email"
          value={email}
          handleChange={handleChange}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          handleChange={handleChange}
          label="Pasword"
          required
        />
        {isSignUp && (
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            handleChange={handleChange}
            label="Confirm Password"
            required
          />
        )}

        <button
          className="block px-3 bg-purple text-white p-2 hover:shadow-md px-8 rounded-3xl mx-auto"
          onClick={handleSubmit}
        >
          {isSignUp ? "Sign up" : "Sign in"}
        </button>
        <p
          className="flex justify-between inline-block mt-4 text-xs text-gray-light cursor-pointer hover:text-gray-300"
          onClick={switchMode}
        >
          {isSignUp
            ? "Already registered? Sign in"
            : "Don't have an account? Sign up"}
        </p>
      </form>
    </div>
  );
};
export default Auth;
