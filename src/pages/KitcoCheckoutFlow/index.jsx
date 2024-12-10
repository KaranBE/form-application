import { Helmet } from "react-helmet";
import CheckoutFlowSection from "./CheckoutFlowSection";
import {  Heading, Input, Text } from "../../components";
import { useState } from "react";
import { createUser } from "../../utils/api";

import { Alert } from "../../components/Alert";
import { DatePicker } from "../../components/DatePicker";
import { FormActions } from "../../components/FormActions";

export default function KitcoCheckoutFlowPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    contact_number: "",
    email: "",
    birthdate: {
      day: "",
      month: "",
      year: "",
    },
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({});
  const validateForm = () => {
    const newErrors = {};

    // Full name validation
    if (!formData.full_name) {
      newErrors.full_name = "Full name is required";
    } else if (/[!@#$%^&*(),.?":{}|<>]/.test(formData.full_name)) {
      newErrors.full_name = "Name cannot contain symbols";
    }

    // Canadian phone number validation
    const phoneRegex =
      /^(\+?1)?[\s-]?\(?[0-9]{3}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{4}$/;
    if (!formData.contact_number) {
      newErrors.contact_number = "Contact number is required";
    } else if (!phoneRegex.test(formData.contact_number)) {
      newErrors.contact_number = "Invalid Canadian phone number format";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Date validation
    if (
      !formData.birthdate.day ||
      !formData.birthdate.month ||
      !formData.birthdate.year
    ) {
      newErrors.birthdate = "Date is required";
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must contain 8 characters, including uppercase, lowercase and numbers";
    }

    // Confirm password validation
    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Process form submission
      const date_of_birth = `${formData.birthdate.year.value}-${formData.birthdate.month.value}-${formData.birthdate.day.value}`;

      // Prepare API payload
      const userData = {
        full_name: formData.full_name,
        contact_number: formData.contact_number,
        email: formData.email,
        date_of_birth,
        password: formData.password,
      };
      
      try {
        const response = await createUser(userData);
        setAlert({
          type: response.title ? "success" : "error",
          title: response.title,
          message: response.description,
        });
        
        if (response.success) {
          // Reset form on success
          setFormData({
            full_name: "",
            contact_number: "",
            email: "",
            day: "",
            month: "",
            year: "",
            password: "",
            confirm_password: "",
          });
        }
      } catch (error) {
        setAlert({
          type: "error",
          title: "Error",
          message: "An unexpected error occurred",
        });
      }
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "day" || name === "month" || name === "year") {
      setFormData((prev) => ({
        ...prev,
        ["birthdate"]: { ...prev.birthdate, [name]: value },
      }));
      if (
        !formData.birthdate.day ||
        !formData.birthdate.month ||
        !formData.birthdate.year
      ) {
        //
      } else {
        setErrors((prev) => ({
          ...prev,
          ["birthdate"]: "",
        }));
      }
      return;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Helmet>
        <title>Create Your User Account - Kitco Checkout</title>

        <meta
          name="description"
          content="Sign up for a new user account during the Kitco checkout process. Provide your full name, contact number, birthdate, and email to get started."
        />
      </Helmet>
      <div className="flex w-full flex-col items-center gap-[2.75rem] bg-white">
        {/* checkout flow section */}
        <CheckoutFlowSection />

        <div className="mb-[0.25rem] max-w-[100vw] flex px-[3.50rem] md:px-[1.25rem]">
          <div className="container-xs flex items-start md:flex-col">
            <div className="flex flex-1 flex-col gap-[2.75rem] self-center md:self-stretch">
              {" "}
              <div className="flex flex-col items-end gap-[0.88rem]">
                <div className="flex justify-center sm:self-start self-stretch px-[3.50rem] md:px-[1.25rem]">
                  {" "}
                  <div className="flex">
                    <Heading
                      size="headinglg"
                      as="h2"
                      className="text-[1.25rem] font-bold text-blue_gray-900"
                    >
                      {" "}
                      Create User Account
                    </Heading>
                  </div>
                </div>
                <div className="min-w-[500px] sm:min-w-[350px] flex flex-col gap-[1.00rem] rounded-lg shadow-xs sm:shadow-none  bg-white p-[2.50rem] sm:p-[1.25rem]">
                  <div className="flex flex-col items-start gap-[0.63rem]">
                    <Heading
                      as="h3"
                      className="text-[1.00rem] font-bold tracking-[0.00rem] text-grey_7"
                    >
                      Full Name
                    </Heading>
                    <div className="self-scretch w-full relative">
                      {formData.full_name && (
                        <div className="relative z-[1] mx-[0.63rem] md:mx-0">
                          <div className="flex flex-wrap absolute top-[-7px] left-[5px] bg-white text-[0.75rem] font-normal tracking-[0.00rem] text-blue_gray-700">
                            <Text
                              as="p"
                              className={`self-end  text-[0.75rem] font-normal tracking-[0.00rem] text-blue_gray-700 ${
                                errors.full_name ? "text-red-500" : ""
                              }`}
                            >
                              Full Name <span className="text-red-400">*</span>
                            </Text>
                            <Text
                              as="p"
                              className="z-[2] font-roboto text-[0.75rem] font-normal text-red-400"
                            ></Text>
                          </div>
                        </div>
                      )}
                      <Input
                        shape="round"
                        type="text"
                        name="full_name"
                        className={` ${
                          errors.full_name
                            ? " border-red-500 text-red-500 relative rounded !border px-[0.75rem] tracking-[0.00rem] "
                            : "self-stretch rounded !border px-[0.75rem] tracking-[0.00rem] "
                        }`}
                        onChange={handleChange}
                      />
                      {!formData.full_name && (
                        <span
                          className={`absolute left-[0.75rem] top-1/2 ${
                            errors.full_name
                              ? "-translate-y-[100%]"
                              : "-translate-y-1/2"
                          } pointer-events-none text-gray-500 transition-all
                    peer-focus:text-[0.75rem] peer-focus:top-[0.5rem]
                    peer-valid:text-[0.75rem] peer-valid:top-[0.5rem]`}
                        >
                          Full Name <span className="text-red-400">*</span>
                        </span>
                      )}
                      {errors.full_name && (
                        <p className="text-red-700 text-[0.75rem] font-normal tracking-[0.00rem]">
                          {errors.full_name}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-[0.63rem]">
                    <Heading
                      as="h4"
                      className="text-[1.00rem] font-bold tracking-[0.00rem] text-grey_7"
                    >
                      {" "}
                      Contact Number
                    </Heading>
                    <div className="self-stretch relative">
                      {formData.contact_number && (
                        <div className="relative z-[1] mx-[0.63rem] md:mx-0">
                          <div className="flex flex-wrap absolute top-[-7px] left-[5px] bg-white text-[0.75rem] font-normal tracking-[0.00rem] text-blue_gray-700">
                            <Text
                              as="p"
                              className={`self-end  text-[0.75rem] font-normal tracking-[0.00rem] text-blue_gray-700 ${
                                !errors.contact_number ? "text-red-500" : ""
                              }`}
                            >
                              Contact Number{" "}
                              <span className="text-red-400">*</span>
                            </Text>
                            <Text
                              as="p"
                              className="z-[2] font-roboto text-[0.75rem] font-normal text-red-400"
                            ></Text>
                          </div>
                        </div>
                      )}
                      <Input
                        shape="round"
                        type="number"
                        name="contact_number"
                        value={formData.contact_number}
                        onChange={handleChange}
                        className={` ${
                          errors.contact_number
                            ? "border-red-500 text-red-500 relative rounded !border px-[0.75rem] tracking-[0.00rem] !text-blue_gray-900_02"
                            : "self-stretch rounded !border px-[0.75rem] tracking-[0.00rem] "
                        }`}
                      />

                      {!formData.contact_number && (
                        <span
                          className={`absolute left-[0.75rem] top-1/2 ${
                            errors.contact_number
                              ? "-translate-y-[100%]"
                              : "-translate-y-1/2"
                          } pointer-events-none text-gray-500 transition-all
                      peer-focus:text-[0.75rem] peer-focus:top-[0.5rem]
                      peer-valid:text-[0.75rem] peer-valid:top-[0.5rem]`}
                        >
                          Contact Number <span className="text-red-400">*</span>
                        </span>
                      )}
                      {errors.contact_number && (
                        <p className="text-red-700 text-[0.75rem]">
                          {errors.contact_number}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-[0.63rem]">
                    <Heading
                      as="h5"
                      className="text-[1.00rem] font-bold tracking-[0.00rem] text-grey_7"
                    >
                      Birthdate
                    </Heading>
                    <DatePicker onChange={handleChange} values={formData.birthdate} errors={errors} />
                    <div className="flex flex-row align-top  gap-[4.0rem] w-full">
                      {errors.birthdate && (
                        <p className="text-red-700 text-[0.75rem]">
                          {errors.birthdate}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-[0.63rem]">
                    <Heading
                      as="h6"
                      className="text-[1.00rem] font-bold tracking-[0.00rem] text-grey_7"
                    >
                      {" "}
                      Email Address
                    </Heading>
                    <div className="flex flex-col items-start self-stretch">
                      <div className="self-scretch w-full relative">
                        {formData.email && (
                          <div className="relative z-[1] mx-[0.63rem] md:mx-0">
                            <div className="flex flex-wrap absolute top-[-7px] left-[5px] bg-white text-[0.75rem] font-normal tracking-[0.00rem] text-blue_gray-700">
                              <Text
                                as="p"
                                className={`self-end  text-[0.75rem] font-normal tracking-[0.00rem] text-blue_gray-700 ${
                                  errors.email ? "text-red-500" : ""
                                }`}
                              >
                                Email Address{" "}
                                <span className="text-red-400">*</span>
                              </Text>
                              <Text
                                as="p"
                                className="z-[2] font-roboto text-[0.75rem] font-normal text-red-400"
                              ></Text>
                            </div>
                          </div>
                        )}
                        <Input
                          shape="round"
                          type="email"
                          name="email"
                          className={` ${
                            errors.email
                              ? "border-red-500 text-red-500 relative rounded !border px-[0.75rem] tracking-[0.00rem] !text-blue_gray-900_02"
                              : "self-stretch rounded !border px-[0.75rem] tracking-[0.00rem] "
                          }`}
                          onChange={handleChange}
                        />
                        {!formData.email && (
                          <span
                            className={`absolute left-[0.75rem] top-1/2 ${
                              errors.email
                                ? "-translate-y-[55%]"
                                : "-translate-y-1/2"
                            } pointer-events-none text-gray-500 transition-all
                      peer-focus:text-[0.75rem] peer-focus:top-[0.5rem]
                      peer-valid:text-[0.75rem] peer-valid:top-[0.5rem]`}
                          >
                            Email <span className="text-red-400">*</span>
                          </span>
                        )}
                      </div>
                      {errors.email ? (
                        <p className="text-[0.75rem] font-normal tracking-[0.00rem] text-red-700">
                          {" "}
                          Sorry, this email address is not valid. Please try
                          again.{" "}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-[0.63rem]">
                    <Heading
                      as="h6"
                      className="text-[1.00rem] font-bold tracking-[0.00rem] text-grey_7"
                    >
                      {" "}
                      Password{" "}
                    </Heading>
                    <div className="self-scretch w-full relative">
                      {formData.password && (
                        <div className="relative z-[1] mx-[0.63rem] md:mx-0">
                          <div className="flex flex-wrap absolute top-[-7px] left-[5px] bg-white text-[0.75rem] font-normal tracking-[0.00rem] text-blue_gray-700">
                            <Text
                              as="p"
                              className={`self-end  text-[0.75rem] font-normal tracking-[0.00rem] text-blue_gray-700 ${
                                errors.password ? "text-red-500" : ""
                              }`}
                            >
                              Password <span className="text-red-400">*</span>
                            </Text>
                            <Text
                              as="p"
                              className="z-[2] font-roboto text-[0.75rem] font-normal text-red-400"
                            ></Text>
                          </div>
                        </div>
                      )}
                      <Input
                        shape="round"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder=""
                        className={` ${
                          errors.password
                            ? "border-red-500 text-red-500 relative rounded !border px-[0.75rem] tracking-[0.00rem] !text-blue_gray-900_02"
                            : "self-stretch rounded !border px-[0.75rem] tracking-[0.00rem] "
                        }`}
                      />
                      {!formData.password && (
                        <span
                          className={`absolute left-[0.75rem] top-1/2 ${
                            errors.password
                              ? "-translate-y-[83%]"
                              : "-translate-y-1/2"
                          } pointer-events-none text-gray-500 transition-all
                      peer-focus:text-[0.75rem] peer-focus:top-[0.5rem]
                      peer-valid:text-[0.75rem] peer-valid:top-[0.5rem]`}
                        >
                          Password <span className="text-red-400">*</span>
                        </span>
                      )}
                      {errors.password && (
                        <p className="text-red-700 text-[0.75rem] ">
                          {errors.password}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-[0.63rem]">
                    <Heading
                      as="h6"
                      className="text-[1.00rem] font-bold tracking-[0.00rem] text-grey_7"
                    >
                      {" "}
                      Confirm Password
                    </Heading>
                    <div className="self-scretch w-full relative">
                      {formData.confirm_password && (
                        <div className="relative z-[1] mx-[0.63rem] md:mx-0">
                          <div className="flex flex-wrap absolute top-[-7px] left-[5px] bg-white text-[0.75rem] font-normal tracking-[0.00rem] text-blue_gray-700">
                            <Text
                              as="p"
                              className={`self-end  text-[0.75rem] font-normal tracking-[0.00rem] text-blue_gray-700 ${
                                errors.confirm_password ? "text-red-500" : ""
                              }`}
                            >
                              Confirm Password{" "}
                              <span className="text-red-400">*</span>
                            </Text>
                            <Text
                              as="p"
                              className="z-[2] font-roboto text-[0.75rem] font-normal text-red-400"
                            ></Text>
                          </div>
                        </div>
                      )}
                      <Input
                        shape="round"
                        type="password"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        placeholder=""
                        className={` ${
                          errors.confirm_password
                            ? "border-red-500 text-red-500 relative rounded !border px-[0.75rem] tracking-[0.00rem] !text-blue_gray-900_02"
                            : "self-stretch rounded !border px-[0.75rem] tracking-[0.00rem] "
                        }`}
                      />
                      {!formData.confirm_password && (
                        <span
                          className={`absolute left-[0.75rem] top-1/2 ${
                            errors.confirm_password
                              ? "-translate-y-[83%]"
                              : "-translate-y-1/2"
                          } pointer-events-none text-gray-500 transition-all
                      peer-focus:text-[0.75rem] peer-focus:top-[0.5rem]
                      peer-valid:text-[0.75rem] peer-valid:top-[0.5rem]`}
                        >
                          Confirm Password{" "}
                          <span className="text-red-400">*</span>
                        </span>
                      )}
                      {errors.confirm_password && (
                        <p className="text-red-700 text-[0.75rem] ">
                          {errors.confirm_password}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <FormActions onSubmit={handleSubmit} onCancel={()=>{}}/>
            </div>
            {alert?.type && <Alert type={alert?.type} />}
            
          </div>
        </div>
      </div>
    </>
  );
}
