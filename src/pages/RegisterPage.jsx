import { useState, useEffect } from "react";
import { Input, Button } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import { z } from "zod";
import { useSelector } from "react-redux";

const schema = z.object({
  nama: z.string().min(1, { message: "Kolom ini harus diisi" }),
  email: z
    .string()
    .min(1, { message: "Kolom ini harus diisi." })
    .email("Email tidak valid."),
  password: z
    .string()
    .min(6, { message: "Password harus memiliki minimal 6 karakter." }),
  confirmPassword: z
    .string()
    .min(1, { message: "Harus diisi dan sama dengan password" }),
});

const RegisterPage = () => {
  const isAuth = useSelector((store) => store.authenticated.isAuthenticated);
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (isAuth) {
      navigate("/homepage");
    }
  });

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
        nama: pesanError.nama?._errors[0] || "",
        email: pesanError.email?._errors[0] || "",
        password: pesanError.password?._errors[0] || "",
        confirmPassword: pesanError.confirmPassword?._errors[0] || "",
      });
    } else {
      if (dataForm.password !== dataForm.confirmPassword) {
        toast.warning("Konfirmasi Password tidak sama dengan Password");
      } else {
        setErrors({ nama: "", email: "", password: "", confirmPassword: "" });

        const user = await axiosInstance
          .get("/users")
          .then((res) => checkEmail(res.data, dataForm));
        if (user) {
          toast.warning("Email sudah digunakan");
        } else {
          const userData = { ...dataForm, deskripsi: "" };
          const res = await axiosInstance.post("/users", userData);
          toast.success("Selamat Anda Berhasil Register");
          navigate("/login");
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-abu-muda">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl text-hijau-muda font-bold text-center mb-4">
          REGISTER
        </h1>
        <p className="mb-6 text-center">
          Mulai Simpan catatan kamu bersama kami
        </p>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Nama"
            fullWidth
            className="mb-4"
            name="nama"
            value={dataForm.nama}
            onBlur={handleBlur}
            onChange={handleInputChange}
          />
          {errors.nama && (
            <p className="text-red ml-1 mt-1 text-tiny">{errors.nama}</p>
          )}
          <Input
            type="email"
            label="Email"
            fullWidth
            className="mb-4"
            name="email"
            value={dataForm.email}
            onBlur={handleBlur}
            onChange={handleInputChange}
          />
          {errors.email && (
            <p className="text-red ml-1 mt-1 text-tiny">{errors.email}</p>
          )}
          <Input
            type="password"
            label="Password"
            fullWidth
            className="mb-4"
            name="password"
            value={dataForm.password}
            onBlur={handleBlur}
            onChange={handleInputChange}
          />
          {errors.password && (
            <p className="text-red ml-1 mt-1 text-tiny">{errors.password}</p>
          )}
          <Input
            type="password"
            label="Konfirmasi Password"
            fullWidth
            className="mb-4"
            name="confirmPassword"
            value={dataForm.confirmPassword}
            onBlur={handleBlur}
            onChange={handleInputChange}
          />
          {errors.confirmPassword && (
            <p className="text-red ml-1 mt-1 text-tiny">
              {errors.confirmPassword}
            </p>
          )}
          <Button
            type="submit"
            className="bg-hijau-muda text-white w-full mb-4"
          >
            Daftar
          </Button>
          <p className="text-center">
            Sudah punya akun?{" "}
            <Link className="text-hijau-paling-muda" to="/login">
              Masuk
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
