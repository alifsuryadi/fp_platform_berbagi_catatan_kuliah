import { useState } from "react";
import { Input, Button, Link } from "@nextui-org/react";
import { z } from "zod";

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
  const [dataForm, setDataForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

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

  const handleSubmit = (e) => {
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
      console.log("Form terkirim", dataForm);
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
              onChange={handleInputChange}
              onBlur={handleBlur}
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
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {errors.password && (
              <p className="text-red-500 text-tiny mt-1 ml-1">
                {errors.password}
              </p>
            )}
          </div>
          <Link href="#" className="text-sm mb-4 block text-left">
            Lupa kata sandi?
          </Link>
          <Button type="submit" className="bg-green-700 text-white w-full mb-4">
            Masuk
          </Button>
          <p className="text-center">
            Belum punya akun? <Link href="#">Daftar</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
