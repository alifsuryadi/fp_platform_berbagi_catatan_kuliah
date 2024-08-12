import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { axiosInstance } from "../lib/axios";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Kolom ini harus diisi." })
    .email("Email tidak valid."),
  password: z
    .string()
    .min(6, { message: "Password harus memiliki minimal 6 karakter." }),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleBlur = (e) => {
    const { name, value } = e.target;

    const result = schema.safeParse({ [name]: value });

    if (!result.success) {
      const errorMessage = result.error.format();
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessage[name]?._errors[0] || "",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleInputChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const checkEmail = (serverUsers, formData) => {
    const user = serverUsers.find((user) => user.email === formData.email);
    if (user) return user;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = schema.safeParse(dataForm);
    if (!result.success) {
      const pesanError = result.error.format();
      setErrors({
        email: pesanError.email?._errors[0] || "",
        password: pesanError.password?._errors[0] || "",
      });
    } else {
      setErrors({ email: "", password: "" });

      const user = await axiosInstance
        .get("/users")
        .then((res) => checkEmail(res.data, dataForm));

      if (user) {
        if (user.password === dataForm.password) {
          toast.success("Login Berhasil");
          navigate("/homepage");
        } else {
          toast.error("Password Salah");
        }
      } else {
        toast.error("Email Salah");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl text-green-700 font-bold text-center mb-4">
          MASUK
        </h1>
        <p className="mb-8 text-center">Simpan catatan Anda bersama kami</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              type="email"
              label="Email"
              fullWidth
              name="email"
              value={dataForm.email}
              onBlur={handleBlur}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-red-500 ml-1 mt-1 text-tiny">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <Input
              type="password"
              label="Kata Sandi"
              fullWidth
              name="password"
              value={dataForm.password}
              onBlur={handleBlur}
              onChange={handleInputChange}
            />
            {errors.password && (
              <p className="text-red-500 text-tiny mt-1 ml-1">
                {errors.password}
              </p>
            )}
          </div>
          <Link to="#" className="text-sm mb-4 block text-left">
            Lupa kata sandi?
          </Link>
          <Button type="submit" className="bg-green-700 text-white w-full mb-4">
            Masuk
          </Button>
          <p className="text-center">
            Belum punya akun?{" "}
            <Link className="text-blue-600" to="/register">
              Daftar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
