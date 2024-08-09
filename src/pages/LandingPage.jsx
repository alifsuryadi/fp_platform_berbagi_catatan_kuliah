import React from "react";

import NavigationBar from "../components/NavigationBar";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Hero from "../components/Hero";
import FooterBar from "../components/FooterBar";
import Buku from "../assets/books.png";

const LandingPage = () => {
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

  return (
    <div>
      <NavigationBar />

      <Hero />

      <div className="md:px-[128px] px-5">
        <div className="mt-12 mb-12">
          <h2 className="text-green-900 font-bold">Paling Banyak Dilihat</h2>
        </div>
        <div className="gap-1 grid md:grid-cols-5 grid-cols-2">
          {list.map((item, index) => (
            <Card
              shadow="sm"
              key={index}
              isPressable
              onPress={() => console.log("item pressed")}
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

      <div className="md:px-[128px] px-5">
        <div className="mt-12 mb-12">
          <h2 className="text-green-900 font-bold">Kenapa Pilih Note Kuliah</h2>
        </div>

        <div className="grid grid-cols-2 ">
          <div className="w-full md:w-1/2">
            <img src={Buku} alt="Monitoring" />
          </div>

          <div className="w-full md:w-1/2 my-auto">
            <h4 className="text-2xl text-gray-800 font-bold mb-5">
              Catatan Terstruktur
            </h4>
            <p className="text-gray-600 mb-8">
              Dapatkan catatan kuliah yang lengkap dan terorganisir
            </p>
          </div>
        </div>
      </div>

      <div className="md:px-[128px] px-5">
        <div className="mt-12 mb-12"></div>
        <div className="grid grid-cols-2 ">
          <div className="w-full md:w-1/2 my-auto mx-96">
            <h4 className="text-2xl text-gray-800 font-bold mb-5">
              Pencarian Mudah
            </h4>
            <p className="text-gray-600 mb-8">
              Temukan catatan berdasarkan jurusan mata kuliah
            </p>
          </div>
          <div className="w-full md:w-1/2 mx-40">
            <img src={Buku} alt="Monitoring" />
          </div>
        </div>
      </div>

      <div className="mt-20 mb-12"></div>
      <div className="flex justify-around bg-black/5 p-4">
        <p className="font-semibold">Siap untuk menyimpan catatan Anda ?</p>
        <Button color="success" className="text-white">
          Buat Catatan
        </Button>
      </div>

      <FooterBar />
    </div>
  );
};

export default LandingPage;
