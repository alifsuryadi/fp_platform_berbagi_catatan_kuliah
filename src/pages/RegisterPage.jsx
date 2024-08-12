import React from "react";
import { Input, Button, Link } from "@nextui-org/react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const registerFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Kolom ini harus diisi." })
    .email("Email tidak valid."),
  password: z
    .string()
    .min(6, { message: "Password harus memiliki minimal 6 karakter." }),
  confirmPassword: z
    .string()
    .min(6, { message: "Konfirmasi password harus memiliki minimal 6 karakter." })
}).superRefine(({confirmPassword, password},context)=> {if(confirmPassword !== password){
    context.addIssue({code: "", message: "Password Tidak Sama", path:['confirmPassword']})
}});


const RegisterPage = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerFormSchema),
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl text-green-700 font-bold text-center mb-4">REGISTER</h1>
        <p className="mb-6 text-center">Mulai Simpan catatan kamu bersama kami</p>

        <form onSubmit={form.handleSubmit((data) => console.log(data))}>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                type="email"
                label="Email"
                fullWidth
                className="mb-4"
                isInvalid={Boolean(fieldState.error)}
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                type="password"
                label="Password"
                fullWidth
                className="mb-4"
                isInvalid={Boolean(fieldState.error)}
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                type="password"
                label="Konfirmasi Password"
                fullWidth
                className="mb-4"
                isInvalid={Boolean(fieldState.error)}
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          <Button type="submit" className="bg-green-700 text-white w-full mb-4">
            Daftar
          </Button>
        </form>

        <p className="text-center">
          Sudah punya akun? <Link href="#">Masuk</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
