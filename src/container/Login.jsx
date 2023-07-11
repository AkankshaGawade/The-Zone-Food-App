import React, { useEffect, useState } from "react";
import { Login1, Logo } from "../assets";
import { LoginInput } from "../components";
import { FaEnvelope, FaLock, FcGoogle } from "../assets/icons";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { buttonClick } from "../animations";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../config/firebase.config";
import { setUserDetails } from "../context/actions/userActions";
import { validateUserJWTToken } from "../api";
import { useNavigate } from "react-router-dom";
import { alertInfo, alertWarning } from "../context/actions/alertActions";
const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isSignUp, setiSSgnUp] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const alert = useSelector((state) => state.alert);
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  const LoginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then((data) => {
              dispatch(setUserDetails(data));
            });
            navigate("/", { replace: true });
          });
        }
      });
    });
  };

  const signUpWithEmail = async () => {
    if ((userEmail === "" || password === "" || confirm_password) === "") {
      dispatch(alertInfo("Required field should not be empty"));
    } else {
      if (password === confirm_password) {
        await createUserWithEmailAndPassword(
          firebaseAuth,
          userEmail,
          password
        ).then((userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        });
      } else {
        dispatch(alertWarning("Password does not match"));
      }
    }
  };

  const signInWithPassword = async () => {
    if (userEmail !== "" && password !== "") {
      await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then(
        (userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        }
      );
    } else {
      dispatch(alertWarning("Password does not match"));
    }
  };
  return (
    <div className="w-screen  h-screen relative overflow-hidden flex">
      {/*Background*/}
      <img
        src={Login1}
        className="w-full h-full object-cover absolute top-0 left-0"
      />

      {/*Content box*/}
      <div className="flex flex-col items-center bg-lightOverlay w-[30%] mid:w-500 h-full z-10 backdrop-blur-md p-4 px-4 py-4">
        {/*Top logo section*/}
        <div className="flex items-center justify-start gap-4 w-full">
          <img src={Logo} className="w-8" alt="" />
          <p className="text-headingColor font-semibold text-3xl">The Zone</p>
        </div>
        {/*Welcome text */}
        <p className="text-3xl font-semibold text-headingColor">Welcome Back</p>
        <p className="text-xl text-textColor -mt-1 ">
          {isSignUp ? "Sign Up" : "Sign In"} with following
        </p>

        {/*Input section */}
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
          <LoginInput
            placeholder={"Email here"}
            icon={<FaEnvelope className="text-xl text-textColor" />}
            inputState={userEmail}
            InputStateFunction={setUserEmail}
            type="email"
            isSignUp={isSignUp}
          />
          <LoginInput
            placeholder={"Password here"}
            icon={<FaLock className="text-xl text-textColor" />}
            inputState={password}
            InputStateFunction={setPassword}
            type="password"
            isSignUp={isSignUp}
          />
          {isSignUp && (
            <LoginInput
              placeholder={"Confirm Password here"}
              icon={<FaLock className="text-xl text-textColor" />}
              inputState={confirm_password}
              InputStateFunction={setConfirmPassword}
              type="password"
              isSignUp={isSignUp}
            />
          )}
          {!isSignUp ? (
            <p className="">
              Does not have an account?{" "}
              <motion.button
                {...buttonClick}
                className="text-red-400 underline cursor-pointer bg-transparent"
                onClick={() => setiSSgnUp(true)}
              >
                Create One
              </motion.button>
            </p>
          ) : (
            <p className="">
              Already have an account?{" "}
              <motion.button
                {...buttonClick}
                className="text-red-400 underline cursor-pointer bg-transparent"
                onClick={() => setiSSgnUp(false)}
              >
                Sign-in Here
              </motion.button>
            </p>
          )}

          {/*button section*/}
          {isSignUp ? (
            <motion.button
              {...buttonClick}
              className="w-full px-4 py-2 rounded-md bg-red-500 cursor-pointer text-xl capitalize hover:bg-red-700 transition-all duration-100"
              onClick={signUpWithEmail}
            >
              Sign Up
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              className="w-full px-4 py-2 rounded-md bg-red-500 cursor-pointer text-xl capitalize hover:bg-red-700 transition-all duration-100"
              onClick={signInWithPassword}
            >
              Sign In
            </motion.button>
          )}
        </div>
        <div className="flex items-center justify-between gap-16">
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
          <p className="text-black ">OR</p>
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
        </div>

        <motion.div
          {...buttonClick}
          className="flex items-center justify-center px-20 py-2 bg-gray-50 backdrop-blur-md cursor-pointer rounded-3xl gap-4"
          onClick={LoginWithGoogle}
        >
          <FcGoogle className="text-3xl" />
          <p className="capitalize text-base text-headingColor font-semibold">
            Sign in with Google
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
