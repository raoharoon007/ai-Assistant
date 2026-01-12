import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import ChevronDown from "../../assets/icons/arrow-down.svg?react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
];

const healthConditionsList = ["Asthma", "Diabetes", "High Blood Pressure", "Seasonal Allergies", "Arthritis", "Lupus"];

// 1. Yup Validation Schema
const schema = yup.object({
    age: yup.number()
        .typeError("Age must be a number")
        .required("Age is required")
        .positive("Age cannot be negative")
        .integer("Age must be an integer")
        .min(1, "Age must be at least 1")
        .max(120, "Please enter a valid age"),
    weight: yup.number()
        .typeError("Weight must be a number")
        .required("Weight is required")
        .positive("Weight must be greater than 0")
        .min(1, "Weight is too low"),
    height: yup.number()
        .typeError("Height must be a number")
        .required("Height is required")
        .positive("Height must be greater than 0")
        .min(30, "Height is too low"),
    gender: yup.object().required("Please select gender").nullable(),
    healthConditions: yup.array().of(yup.string()),
    otherConditions: yup.string().nullable(),
}).required();

const ProfileSetupForm = () => {
    const navigate = useNavigate();

    // 2. Hook Form Setup
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            healthConditions: [],
        }
    });

    const onSubmit = (data) => {
        console.log("Profile Data:", data);
        navigate("/chat");
    };

    return (
        <div className="bg-white flex flex-col w-full max-w-191.75 rounded-3xl justify-center items-center border border-bordercolor p-6 gap-3 2xl:gap-6 shadow-[0_4px_40px_0_rgba(235,235,235,0.8)] mx-auto">

            {/* Header Section */}
            <div className="flex flex-col justify-center items-center gap-2 2xl:gap-3">
                <h1 className="text-center font-semibold text-2xl sm:text-[28px] text-primarytext">
                    Set Up Your Profile
                </h1>
                <p className="text-center text-sm md:text-base text-secondarytext font-normal max-w-115.75">
                    This information helps tailor general health guidance. You can skip or update it anytime.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-2 2xl:gap-4">
                {/* Basic Info Section */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-medium text-primarytext">Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Age, Weight, Height Fields */}
                        {[
                            { name: "age", label: "Age", placeholder: "Enter Your Age" },
                            { name: "weight", label: "Weight (kg)", placeholder: "Enter Your Weight" },
                            { name: "height", label: "Height (cm)", placeholder: "Enter Your Height" }
                        ].map((field) => (
                            <div key={field.name} className="flex flex-col gap-1.5">
                                <label className="text-sm font-normal text-primarytext ml-1">{field.label}</label>
                                <input
                                    {...register(field.name)}
                                    type="number"
                                    placeholder={field.placeholder}
                                    className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none outline-none transition-all ${errors[field.name] ? "border-warning" : "border-bordercolor focus:border-primary hover:border-primary"
                                        }`}
                                />
                                {errors[field.name] && <span className="text-warning text-xs ml-1">{errors[field.name].message}</span>}
                            </div>
                        ))}

                        {/* Gender Select with Controller */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-normal text-primarytext ml-1">Gender</label>
                            <div className="relative w-full">
                                <Controller
                                    name="gender"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={genderOptions}
                                            placeholder="Select Gender"
                                            /* Yahan logic: agar error hai to 'tw-select-error' class add ho jayegi */
                                            className={`w-full ${errors.gender ? "tw-select-error" : ""}`}
                                            classNamePrefix="tw-select"
                                            components={{
                                                DropdownIndicator: () => (
                                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-primarytext pointer-events-none" />
                                                ),
                                                IndicatorSeparator: () => null,
                                            }}
                                        />
                                    )}
                                />
                                {/* Error message text */}
                                {errors.gender && (
                                    <span className="text-warning text-xs ml-1 mt-1 font-medium">
                                        {errors.gender.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Health Conditions Section */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-medium text-primarytext">Health Conditions</h2>
                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3">
                        {healthConditionsList.map((item) => (
                            <div key={item} className="w-full rounded-xl border border-bordercolor px-4 py-3 flex items-center ">
                                <label className="flex items-center gap-2 text-secondarytext cursor-pointer w-full text-sm">
                                    <input
                                        type="checkbox"
                                        value={item}
                                        {...register("healthConditions")}
                                        className="accent-primary h-4 w-4 cursor-pointer"
                                    />
                                    {item}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Other Conditions */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-normal text-primarytext ml-1">Other Conditions</label>
                    <input
                        {...register("otherConditions")}
                        type="text"
                        placeholder="e.g. Migraines"
                        className="w-full rounded-xl border border-bordercolor px-4 py-3 text-sm focus:outline-none focus:placeholder-transparent outline-none hover:border-primary focus:border-primary transition-all"
                    />
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <Link to="/chat" className="p-3.5 font-semibold text-center text-primarytext rounded-full hover:bg-secondarybtn transition-all">
                        Skip for Now
                    </Link>
                    <button type="submit" className="bg-primary p-3.5 cursor-pointer font-semibold text-center text-white rounded-full shadow-lg hover:bg-hoverbtn transition-all active:scale-[0.98]">
                        Save & Continue
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProfileSetupForm;