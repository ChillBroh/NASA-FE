import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import login from "../assets/login.jpg";
import axios from "axios";
import Loader from "../components/Loader";
import { Form, Input } from "antd";
import uploadFileToFirebase from "../util/UploadFilesToFIreBase";

import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");

  const onFinish = async (values) => {
    setLoading(true);
    console.log(values);
    let uploadImg = "No Image";
    try {
      if (
        values.name === "" ||
        values.email === "" ||
        values.password === "" ||
        values.contactNumber === ""
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "All Fields Required!",
        });
        return;
      }

      const result = await Swal.fire({
        title: "Do you want to Register With NASA?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
      });
      if (result.isConfirmed) {
        if (file) {
          const response = await uploadFileToFirebase(file);
          uploadImg = response;
        }
        const res = await axios.post(
          "http://localhost:5000/api/v1/user/register",
          {
            userName: values.name,
            email: values.email,
            image: uploadImg,
            password: values.password,
            mobileNo: values.contactNumber,
          }
        );
        console.log("response", res);
        Swal.fire(
          "Congratulations! You Have Successfully Registered with NASA",
          "",
          "success"
        );
        setLoading(false);
        navigate("/login");
      } else {
        setLoading(false);
        Swal.fire("Registraion Cancelled", "", "error");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.message,
      });
    }
  };

  const inputStyle =
    "p-3 w-96 rounded-md border border-purple focus:outline-none focus:border-blue-500";

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div
          className="min-h-screen bg-cover bg-no-repeat bg-center flex justify-center items-center"
          style={{ backgroundImage: `url(${login})` }}
        >
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="border px-12 mx-12 mt-36 py-12 bg-gray-300 bg-opacity-10 border-black rounded-lg">
              <div className="px-12 pt-10 lg:px-24">
                <div className="pb-12 text-center ">
                  <span className="text-[46px] text-white font-extrabold ">
                    SIGN UP
                  </span>
                  <h2 className="pt-8 font-semibold text-white">
                    Explore The World With Us
                  </h2>
                  <div className="mt-6 flex sm:flex-row justify-center">
                    <label htmlFor="fileInput">
                      <img
                        className="rounded-full"
                        src={
                          file
                            ? URL.createObjectURL(file)
                            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                        }
                        alt="avatar"
                        style={{
                          width: "120px",
                          height: "120px",
                          cursor: "pointer",
                        }}
                      />
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      name="file"
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setFile(file);
                      }}
                      required
                    />
                  </div>
                  <Form
                    name="register"
                    onFinish={onFinish}
                    initialValues={{
                      prefix: "86",
                    }}
                    scrollToFirstError
                  >
                    <div className="pt-2">
                      <Form.Item
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Please input your username!",
                            whitespace: true,
                          },
                        ]}
                        hasFeedback
                      >
                        <Input className={inputStyle} placeholder="username" />
                      </Form.Item>
                    </div>

                    <div className="pt-2">
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            type: "email",
                            message: "The input is not valid E-mail!",
                          },
                          {
                            required: true,
                            message: "Please input your E-mail!",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input className={inputStyle} placeholder="Email" />
                      </Form.Item>
                    </div>

                    <div className="pt-2">
                      <Form.Item
                        name="contactNumber"
                        rules={[
                          {
                            required: true,
                            message: "Please input your phone number!",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (/^\d{10}$/.test(value)) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                "Phone number must be 10 digits and contain only numbers."
                              );
                            },
                          }),
                        ]}
                        hasFeedback
                      >
                        <Input
                          className={inputStyle}
                          placeholder="Phone Number"
                        />
                      </Form.Item>
                    </div>

                    <div className="pt-2">
                      <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) =>
                          prevValues.role !== currentValues.role
                        }
                      >
                        {({ getFieldValue }) =>
                          getFieldValue("role") === "Foreigner" ? (
                            <Form.Item
                              name="uniqueField"
                              rules={[
                                {
                                  required: true,
                                },
                              ]}
                            >
                              <Input
                                className={inputStyle}
                                placeholder="Enter Your Passport Number"
                              />
                            </Form.Item>
                          ) : getFieldValue("role") === "Passenger" ? (
                            <Form.Item
                              name="uniqueField"
                              rules={[
                                {
                                  required: true,
                                },
                              ]}
                            >
                              <Input
                                className={inputStyle}
                                placeholder="Enter Your Passport Number"
                              />
                            </Form.Item>
                          ) : null
                        }
                      </Form.Item>
                    </div>

                    <div className="pt-2">
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your password!",
                          },
                          {
                            min: 8,
                            message: "Password must be at least 8 characters.",
                          },
                          {
                            pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
                            message:
                              "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input.Password
                          className={inputStyle}
                          placeholder="Password"
                        />
                      </Form.Item>
                    </div>

                    <div className="pt-2">
                      <Form.Item
                        name="confirm"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Please confirm your password!",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("password") === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error(
                                  "The new password that you entered do not match!"
                                )
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password
                          className={inputStyle}
                          placeholder="Confirm Password"
                        />
                      </Form.Item>
                    </div>

                    <div className="pt-2">
                      <div>
                        <Form.Item>
                          <button
                            type="primary"
                            htmlType="submit"
                            className="bg-red-800 text-white font-bold px-6 py-3 rounded-md hover:bg-blue-800"
                          >
                            Register
                          </button>
                        </Form.Item>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link to="/login" className="text-white hover:underline">
                        Already a member? Login
                      </Link>
                    </div>
                  </Form>

                  {loading && <Loader />}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
