import { useEffect, useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
// import ButtonPrimary from "../components/ButtonPrimary";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const profileSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Kolom ini harus diisi." })
    .email("Email tidak valid."),
  namaLengkap: z.string().min(1, { message: "Kolom ini harus diisi." }),
  tentangKamu: z.string().min(1, { message: "Kolom ini harus diisi." }),
});

const ProfileSayaPage = () => {
  const mail = useSelector((store) => store.authenticated.email);
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    email: "",
    namaLengkap: "",
    tentangKamu: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }

    setInitialValues({
      email: user.email || "",
      namaLengkap: user.nama || "",
      tentangKamu: user.deskripsi || "",
    });
  }, [navigate]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const onSubmit = async (data) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        throw new Error("User data is not available in localStorage");
      }

      const updatedUser = {
        ...user,
        email: data.email,
        nama: data.namaLengkap,
        deskripsi: data.tentangKamu,
      };
      const response = await axiosInstance.patch(
        `/users/${user.id}`,
        updatedUser
      );

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        toast.success("Data Berhasil Diubah");
        navigate("/profil");
      } else {
        throw new Error(`Failed to update user data: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  const toHomepage = () => {
    navigate("/homepage");
  };

  return (
    <>
      <NavigationBar mail={mail} />

      <div className="flex justify-start items-start min-h-screen mx-72">
        <div className="w-full max-w-5xl ml-[-20px] mt-4">
          <div className="mb-4">
            <h1
              className="text-2xl font-bold inline-block mr-4"
              style={{ color: "#1A5319" }}
            >
              Profil Saya
            </h1>
            <hr className="my-4 border-gray-300" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="block text-sm font-medium"
                style={{ color: "#1A5319" }}
              >
                Nama Lengkap
              </label>
              <Controller
                name="namaLengkap"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    style={{ maxWidth: "500px" }}
                    errorMessage={errors.namaLengkap?.message}
                    isInvalid={!!errors.namaLengkap}
                  />
                )}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium"
                style={{ color: "#1A5319" }}
              >
                Email
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    style={{ maxWidth: "500px" }}
                    errorMessage={errors.email?.message}
                    isInvalid={!!errors.email}
                  />
                )}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium"
                style={{ color: "#1A5319" }}
              >
                Tentang kamu
              </label>
              <Controller
                name="tentangKamu"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    style={{ maxWidth: "500px", resize: "vertical" }}
                    minRows={5}
                    helperText={errors.tentangKamu?.message}
                    isInvalid={!!errors.tentangKamu}
                  />
                )}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button onClick={toHomepage}>Tutup</Button>
              <Button type="submit" className="text-white bg-hijau-muda">
                Ubah Profil
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileSayaPage;
