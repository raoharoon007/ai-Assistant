import EyeCloseIcon from "../../assets/icons/ri_eye-close-line.svg?react";
import EyeShowIcon from "../../assets/icons/ri_eye-show-line.svg?react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CheckCircle from "../../assets/icons/checkmark-circle-01.svg?react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../api/axiosInstance";

const schema = yup.object({
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Min 6 characters")
        .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, "Must contain letters and numbers"),
    confirmPassword: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
}).required();

const SetNewPasswordform = ({ buttonText = "Reset Password" }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showOverlay1, setShowOverlay1] = useState(false);
    const [apiError, setApiError] = useState("");
    
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        setApiError(""); 
        try {
            const userEmail = location.state?.email;
            const userOtp = location.state?.otp; 
            if (buttonText !== "Save New Password" && !userOtp) {
                setApiError("Session expired. Please start the reset process again.");
                return;
            }

            await api.post("/auth/set-new-password", {
                email: userEmail,
                otp: userOtp,
                new_password: data.password,
                confirm_password: data.confirmPassword
            });

            setShowOverlay1(true);
           if (buttonText === "Save New Password") {
                setTimeout(() => setShowOverlay1(false), 2000);
            } else {
                setTimeout(() => navigate("/login"), 2000);
            }
        } catch (error) {
            const msg = error.response?.data?.detail || "Failed to update password";
            setApiError(typeof msg === 'string' ? msg : "Validation error. Check your connection.");
        }
    };

    return (
        <>


            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                {/* Password Field */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-normal text-primarytext ml-1">Password</label>
                    <div className="relative">
                        <input
                            {...register("password")}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className={`w-full rounded-xl font-normal text-primarytext placeholder:text-mutedtext border focus:placeholder-transparent outline-none px-4 py-3 pr-12 text-sm transition-all ${
                                errors.password || apiError ? "border-warning" : "border-bordercolor focus:border-primary hover:border-primary"
                            }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 inset-y-0 flex items-center cursor-pointer opacity-70 hover:opacity-100 transition"
                        >
                            {showPassword ? <EyeShowIcon /> : <EyeCloseIcon />}
                        </button>
                    </div>
                    {errors.password && <span className="text-warning text-xs ml-1 font-medium italic">{errors.password.message}</span>}
                </div>

                {/* Confirm Password Field */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-normal text-primarytext ml-1">Confirm Password</label>
                    <div className="relative">
                        <input
                            {...register("confirmPassword")}
                            type={showConfirm ? "text" : "password"}
                            placeholder="Renter Your Password"
                            className={`w-full rounded-xl font-normal text-primarytext placeholder:text-mutedtext border focus:placeholder-transparent outline-none px-4 py-3 pr-12 text-sm transition-all ${
                                errors.confirmPassword || apiError ? "border-warning" : "border-bordercolor focus:border-primary hover:border-primary"
                            }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-4 inset-y-0 flex items-center cursor-pointer opacity-70 hover:opacity-100 transition"
                        >
                            {showConfirm ? <EyeShowIcon /> : <EyeCloseIcon />}
                        </button>
                    </div>
                    {errors.confirmPassword && <span className="text-warning text-xs ml-1 font-medium italic">{errors.confirmPassword.message}</span>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-center bg-primary hover:bg-hoverbtn text-white rounded-full py-3.5 font-semibold shadow-lg shadow-primary/10 cursor-pointer transition mt-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Updating..." : buttonText}
                </button>
            </form>
                        
            {apiError && (
                <div className="w-full bg-warning/10 border border-warning/20 text-warning text-xs py-2.5 px-4 rounded-xl text-center font-medium italic mb-4">
                    {apiError}
                </div>
            )}

            {showOverlay1 && (
                <div className="fixed inset-0 top-0 left-0 z-50 flex items-center justify-center bg-black/5 w-full rounded-3xl backdrop-blur-sm">
                    <div className="bg-white rounded-xl px-10 py-8 flex flex-col items-center gap-4 shadow-xl animate-in zoom-in-95 duration-300">
                        <CheckCircle className="w-16 h-16" />
                        <div className="text-[22px] font-medium text-primarytext text-center flex flex-col">
                            Password Updated
                            <span className="text-secondarytext text-lg font-medium">Login again</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SetNewPasswordform;