import React from "react";
import { Input, Button, Link } from "@nextui-org/react";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl text-green-700 font-bold text-center mb-4">LOGIN</h1>
        <p className="mb-6 text-center">Simpan catatan kamu bersama kami</p>
        <Input
          type="email"
          label="Email"
          fullWidth
          className="mb-4"
        />
        <Input
          type="password"
          label="Password"
          fullWidth
          className="mb-4"
        />
        <Link href="#" className="text-sm mb-4 block text-left">
          Lupa password?
        </Link>
        <Button className="bg-green-700 text-white w-full mb-4">Masuk</Button>
        <p className="text-center">
          Belum punya akun? <Link href="#">Daftar</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
