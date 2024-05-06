import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import login from "../assets/login.jpg";
import axios from "axios";
import Loader from "../components/Loader";
import { Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { jwtDecode } from "jwt-decode";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://user-management-api-chillbroh.onrender.com/api/v1/auth/login",
        {
          userName: values.userName,
          password: values.password,
        }
      );

      const decoded = jwtDecode(res.data.token);
      const originalToken = res.data.token;
      const payload = {
        decodedJWT: decoded,
        originalToken: originalToken,
      };
      console.log(payload);
      setLoading(false);
      localStorage.setItem("jsonwebtoken", JSON.stringify(payload));
      navigate("/");
    } catch (err) {
      setLoading(false);
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
    <div
      className="min-h-screen bg-cover bg-no-repeat bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${login})` }}
    >
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="border px-12 mx-12 mt-36 py-12 bg-gray-300 bg-opacity-10 border-black rounded-lg">
          <div className="px-12 pt-10 lg:px-24">
            <div className="pb-12 text-center ">
              <span className="text-[46px] text-white font-extrabold ">
                SIGN IN
              </span>
              <h2 className="pt-8 font-semibold text-white">
                Explore The World With Us
              </h2>

              <Form name="basic" onFinish={onFinish} autoComplete="off">
                <div className="mt-4">
                  <Form.Item
                    name="userName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="userName"
                      className={inputStyle}
                    />
                  </Form.Item>
                </div>

                <div className="mt-2">
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder="Password"
                      className={inputStyle}
                    />
                  </Form.Item>
                </div>
                <div className="mt-2">
                  <Form.Item>
                    <button
                      type="submit"
                      className="bg-red-800 text-white font-bold px-6 py-3 rounded-md hover:bg-[#333333]"
                    >
                      Login
                    </button>
                  </Form.Item>
                </div>
                <div>
                  <Link to="/register" className="text-white hover:underline">
                    Not a member ? Register
                  </Link>
                </div>
              </Form>

              {loading && <Loader />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
