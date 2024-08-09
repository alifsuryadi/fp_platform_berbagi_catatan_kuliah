import React from "react";
import { Input, Button, Link } from "@nextui-org/react";

const RegisterPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl text-green-700 font-bold text-center mb-4">REGISTER</h1>
        <p className="mb-6 text-center">Mulai Simpan catatan kamu bersama kami</p>
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
        <Input
          type="password"
          label="Konfirmasi Password"
          fullWidth
          className="mb-4"
        />
        <Button className="bg-green-700 text-white w-full mb-4">Daftar</Button>
        <p className="text-center">
          Sudah punya akun? <Link href="#">Masuk</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
