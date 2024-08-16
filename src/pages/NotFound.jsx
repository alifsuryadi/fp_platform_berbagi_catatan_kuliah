import { Image, Button } from "@nextui-org/react";

const NotFound = () => {
  const imageUrl =
    "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?t=st=1723628461~exp=1723632061~hmac=3301b61c67284516d8cc947ad344370129a7143d5b2c21d0db37e7064fe6b52f&w=996";

  const backTo = () => {
    console.log("kembali");
  };
  return (
    <div className="flex flex-col">
      <div className="flex justify-center mt-20">
        <Image
          className="max-w-96"
          src={imageUrl}
        ></Image>
      </div>
      <div className="flex justify-center mt-5">
        <p className="text-large font-bold text-abu-gelap">
          Halaman tidak ditemukan!
        </p>
      </div>
      <div className="flex justify-center mt-5">
        <Button
          onPress={backTo}
          className="text-white bg-hijau-muda"
        >
          Kembali
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
