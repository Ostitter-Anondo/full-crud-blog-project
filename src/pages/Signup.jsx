import { useState } from "react";
import Navbar from "./components/Navbar";
import { BiUserCircle } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { RiImageCircleAiLine } from "react-icons/ri";
import { PiPasswordBold } from "react-icons/pi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import useMainContext from "../utils/useMainContext";
import useAxios from "../utils/useAxios";
import Footer from "./components/Footer";

const Signup = () => {
  const { signupMailPass, toastErr, toastSuc } = useMainContext();

  const [showPassword, setShowPassword] = useState(false);

  const axiosHook = useAxios();

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const navigate = useNavigate();

  const signupBehavior = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    if (!emailRegex.test(email)) {
      toastErr("bad email");
      return;
    }
    if (!passwordRegex.test(password)) {
      toastErr(
        `password must be >= 6 characters long, have an uppercase, a lowercase and a special character`
      );
      return;
    }
    signupMailPass(email, password)
      .then((result) => {
        console.log(result.user);
        const uid = result.user.uid;
        axiosHook
          .post("/newuser", { uid, email, name, photo })
          .then((res) => {
            console.log(res.data);
            toastSuc(`registration successful`);
            navigate('/login');
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => toastErr(err.message));
  };

  return (
    <>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className="my-12">
        <form
          onSubmit={signupBehavior}
          className="flex flex-col w-7/12 items-center mx-auto gap-6"
        >
          <label className="w-full input input-bordered flex items-center gap-2">
            <BiUserCircle />
            <input
              type="text"
              className="grow"
              placeholder="Name"
              name="name"
              required
            />
          </label>
          <label className="w-full input input-bordered flex items-center gap-2">
            <HiOutlineMail />
            <input
              type="text"
              className="grow"
              placeholder="Email"
              name="email"
              required
            />
          </label>
          <label className="w-full input input-bordered flex items-center gap-2">
            <RiImageCircleAiLine />
            <input
              type="text"
              className="grow"
              placeholder="Photo URL"
              name="photo"
              required
            />
          </label>
          <label className="w-full input input-bordered flex items-center gap-2">
            <PiPasswordBold />
            <input
              type={showPassword ? "text" : "password"}
              className="grow"
              placeholder="Password"
              name="password"
              required
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
              className="btn btn-circle btn-ghost btn-sm"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </label>
          <p className="font-extralight text-sm self-start">
            Already have an account?{" "}
            <Link
              to="/login"
              className="btn btn-link text-accent btn-sm min-h-0 h-fit p-0"
            >
              Log in
            </Link>
          </p>
          <button
            className="btn btn-wide btn-lg btn-info btn-outline"
            type="submit"
          >
            Sign up
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Signup;
