import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// 1. Validation Schema
const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
     .matches(
      /^(?!.*\.\.)(?!\.)(?!.*\.$)([a-zA-Z0-9._%+-]*[a-zA-Z0-9%+-])@(?!(?:-))[A-Za-z0-9-]+(?<!-)(\.[A-Za-z]{2,})+$/,
      'Enter a valid email address'
    ),
}).required();

const ForgetPasswordForm = () => {
  const navigate = useNavigate();

  // 2. Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange", // Real-time validation
  });

  // 3. Submit handler
  const onSubmit = (data) => {
    console.log("Forgot Password Email:", data);
    navigate("/verifyotp", {
      state: { from: "forgotpassword" },
    });
  };

  return (
    <div className="bg-white flex flex-col w-full max-w-115.5 rounded-3xl justify-center items-center border border-bordercolor p-6 gap-6 shadow-[0_4px_40px_0_rgba(235,235,235,0.8)] mx-4">
      
      {/* Header Section */}
      <div className="flex flex-col justify-center items-center gap-3">
        <h1 className="text-center font-semibold text-2xl sm:text-[28px] text-primarytext [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]">
          Forgot Password?
        </h1>
        <p className="text-center text-base text-secondarytext font-normal self-stretch max-w-115.5">
          Enter your email to reset your account access.
        </p>
      </div>

      {/* Form Section - handleSubmit integrated */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="block text-sm font-normal text-primarytext ml-1">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="Enter Your Email"
            className={`w-full rounded-xl border text-primarytext placeholder:text-mutedtext font-normal px-4 py-3 text-sm focus:placeholder-transparent outline-none focus:outline-none transition-all ${
              errors.email 
                ? "border-warning focus:border-warning" 
                : "border-bordercolor hover:border-primary focus:border-primary"
            }`}
          />
          {/* Error Message */}
          {errors.email && (
            <span className="text-warning text-xs ml-1 font-medium">
              {errors.email.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full text-center bg-primary hover:bg-hoverbtn text-white rounded-full py-3.5 font-semibold shadow-lg shadow-primary/10 cursor-pointer transition mt-2 active:scale-[0.98]"
        >
          Send OTP
        </button>
      </form>

      {/* Footer Link */}
      <p className="text-center font-normal text-sm text-secondarytext">
        Back to
        <Link
          to="/login"
          className="text-primary font-normal text-sm ml-1 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}

export default ForgetPasswordForm;