import Nav from "../components/Nav";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Hero from "../components/Hero";
import Footlanding from "../components/FootLanding";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const isAuth = useSelector((store) => store.authenticated.isAuthenticated);
  const navigate = useNavigate();
  const gambar1 =
    "https://images.pexels.com/photos/5965698/pexels-photo-5965698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  const gambar2 =
    "https://images.pexels.com/photos/1181248/pexels-photo-1181248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  const list = [
    {
      title: "Ilmu Pengetahuan Alam",
      img: "https://img.freepik.com/free-vector/flat-biotechnology-concept_23-2148906613.jpg?t=st=1723190354~exp=1723193954~hmac=419f70ee84e7ef9542dbacb747cf827f60c6e654f912bc592d4cfb883d618a1c&w=740",
    },
    {
      title: "Matematika",
      img: "https://img.freepik.com/free-vector/isometric-maths-material-background_23-2148148447.jpg?t=st=1723190838~exp=1723194438~hmac=78da4f2aceb07509c7fdb07a6070fad1ed3438401c3272e748727f8885bbbde1&w=740",
    },
    {
      title: "Teknik",
      img: "https://img.freepik.com/free-vector/engineering-background-design_1300-11.jpg?t=st=1723192552~exp=1723196152~hmac=21f4bd16e37e935ef3f7ba32a84020ea64579a5ef75a62b6fda0e48daf69e86a&w=740",
    },
    {
      title: "Komputer & Teknologi Informasi",
      img: "https://img.freepik.com/free-vector/construction-background-design_1283-9.jpg?t=st=1723192472~exp=1723196072~hmac=b10ba3e42e8cff355ce577218b001759819c4fc841f4d4bc960bcb9dc232fe25&w=740",
    },
    {
      title: "Ilmu Kesehatan",
      img: "https://img.freepik.com/free-vector/science-concept-with-microscope_23-2148539650.jpg?t=st=1723192740~exp=1723196340~hmac=4285f2c32cf4254aa650e87451fe308fd42c2e6f9a2e586e8d8846bd890f4938&w=740",
    },
  ];

  const handleCatatan = () => {
    navigate("/list-user-notes");
  };

  const handleCategory = () => {
    navigate("/login");
  };

  return (
    <div>
      <Nav auth={isAuth} />
      <Hero />
      <div className="md:px-[128px] px-5">
        <div className="mt-12 mb-12">
          <h2 className="text-hijau-muda font-bold text-xl">
            Kenapa NoteKuliah?
          </h2>
        </div>
        <div className="flex flex-row justify-around">
          <div className="max-w-40 sm:max-w-80">
            <Image src={gambar1} />
          </div>
          <div className="flex flex-col max-w-40 sm:max-w-80 justify-center">
            <p className="sm:text-xl font-bold text-hijau-paling-muda">
              Berbagi Pengetahuan
            </p>
            <p className="text-abu-gelap text-xs sm:text-medium">
              Bantu sesama mahasiswa dengan membagikan catatanmu dan temukan
              catatan terbaik dari mahasiswa lainnya.
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-around mt-10">
          <div className="flex flex-col max-w-40 sm:max-w-80 justify-center">
            <p className="sm:text-xl font-bold text-hijau-paling-muda">
              Akses Mudah
            </p>
            <p className="text-abu-gelap text-xs sm:text-medium">
              Cukup login, cari, dan temukan catatan yang kamu butuhkan.
            </p>
          </div>
          <div className="max-w-40 sm:max-w-80">
            <Image src={gambar2} />
          </div>
        </div>
      </div>

      <div className="md:px-[128px] px-5">
        <div className="mt-16 mb-8">
          <h2 className="text-hijau-muda font-bold text-xl">
            Jelajahi Berbagai Kategori Catatan
          </h2>
        </div>
        <div className="gap-1 grid md:grid-cols-5 grid-cols-2">
          {list.map((item, index) => (
            <Card
              shadow="sm"
              key={index}
              isPressable
              onPress={handleCategory}
              className="md:max-w-44 max-w-36  mb-5"
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="none"
                  width="100%"
                  alt={item.title}
                  className="w-full object-cover h-[140px]"
                  src={item.img}
                />
              </CardBody>
              <CardFooter className="flex text-small justify-center items-center max-h-full">
                <b>{item.title}</b>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-black/5 p-4 mt-32 mb-20">
        <div className="md:px-[128px] px-5">
          <div className="flex justify-between items-center">
            <p className="text-abu-gelap">
              Mulailah berbagi dan belajar bersama di NoteKuliah
            </p>
            <Button
              className="bg-hijau-muda text-white"
              onClick={handleCatatan}
            >
              Buat Catatan
            </Button>
          </div>
        </div>
      </div>

      <Footlanding />
    </div>
  );
};

export default LandingPage;
