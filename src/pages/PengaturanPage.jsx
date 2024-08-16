import { useEffect, useState } from "react";
import { Input, Divider, Button } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import NavigationBar from "../components/NavigationBar";
import FooterBar from "../components/FooterBar";
import withAuthenticate from "../hoc/withAuthenticate";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const schema = z
  .object({
    passwordLama: z.string().min(1, { message: "Kolom ini harus diisi." }),
    ubahPassword: z
      .string()
      .min(6, { message: "Password harus memiliki minimal 6 karakter." }),
    confirmPassword: z.string().min(6, {
      message: "Konfirmasi password harus memiliki minimal 6 karakter.",
    }),
  })
  .superRefine(({ confirmPassword, ubahPassword }, context) => {
    if (confirmPassword !== ubahPassword) {
      context.addIssue({
        code: "custom",
        message: "Password tidak sama",
        path: ["confirmPassword"],
      });
    }
  });

const PengaturanPage = () => {
  const mail = useSelector((store) => store.authenticated.email);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm({
    defaultValues: {
      passwordLama: "",
      ubahPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema),
  });

  const [user, setUser] = useState(null);
  const [formErrors, setFormErrors] = useState({
    passwordLama: "",
    ubahPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    reset({
      passwordLama: "",
      ubahPassword: "",
      confirmPassword: "",
    });
  }, [reset]);

  const validateForm = async () => {
    const result = await trigger();
    if (!result) {
      const errorMessages = {
        passwordLama: errors.passwordLama?.message || "",
        ubahPassword: errors.ubahPassword?.message || "",
        confirmPassword: errors.confirmPassword?.message || "",
      };
      setFormErrors(errorMessages);
    }
    return result;
  };

  const handlePasswordUpdate = async (data) => {
    const isValid = await validateForm();
    if (!isValid) return;

    if (user) {
      if (data.passwordLama.trim() !== user.password.trim()) {
        toast.error("Password lama salah");
        return;
      }

      const updatedUser = {
        ...user,
        password: data.ubahPassword,
        confirmPassword: data.confirmPassword,
      };
      const response = await axiosInstance.patch(
        `/users/${user.id}`,
        updatedUser
      );
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);

        toast.success("Password berhasil diubah");
        navigate("/homepage");
      } else {
        throw new Error(`Failed to update user data: ${response.statusText}`);
      }
    }
  };
  const toHomepage = () => {
    navigate("/homepage");
  };

  return (
    <>
      <NavigationBar mail={mail} />
      <div className="flex flex-col items-center justify-start min-h-screen mx-72">
        <div className="w-full max-w-5xl mt-4 bg-white p-8 rounded-lg shadow-md">
          <div className="mb-4">
            <h1 className="text-2xl font-bold mb-4 text-green-700 inline-block mr-4">
              Pengaturan{" "}
              <Divider className="inline-block align-middle w-full" />
            </h1>
          </div>

          <form onSubmit={handleSubmit(handlePasswordUpdate)}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Password Lama
              </label>
              <Controller
                name="passwordLama"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="password"
                    fullWidth
                    style={{ maxWidth: "500px" }}
                    isInvalid={!!formErrors.passwordLama}
                    helperText={formErrors.passwordLama}
                  />
                )}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Ubah Password
              </label>
              <Controller
                name="ubahPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="password"
                    fullWidth
                    style={{ maxWidth: "500px" }}
                    isInvalid={!!formErrors.ubahPassword}
                    helperText={formErrors.ubahPassword}
                  />
                )}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Konfirmasi Ubah Password
              </label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="password"
                    fullWidth
                    style={{ maxWidth: "500px" }}
                    isInvalid={!!formErrors.confirmPassword}
                    helperText={formErrors.confirmPassword}
                  />
                )}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button onClick={toHomepage}>Tutup</Button>
              <Button type="submit" className="text-white bg-hijau-muda">
                Ubah Profil
              </Button>
            </div>
          </form>
        </div>
      </div>
      <FooterBar />
    </>
  );
};

export default withAuthenticate(PengaturanPage);
