import React from "react";
import NavigationBar from "../components/NavigationBar";
import {
  Card,
  Input,
  CardFooter,
  Image,
  Button,
  CardBody,
  Navbar,
} from "@nextui-org/react";
import { IconSearch } from "../icons/icons";
import FooterBar from "../components/FooterBar";

const HomePage = () => {
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
    <>
      <NavigationBar />
      <div className="md:px-[128px] px-5">
        <div className="mt-5 mb-3">
          <h2 className="text-hijau-tua font-bold">Cari Catatan</h2>
        </div>
        <div>
          <Input
            classNames={{
              base: "max-w-full  h-10 rounded-full",
              mainWrapper: "h-full rounded-full",
              input: "text-small rounded-fulls px-2",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 rounded-full",
            }}
            placeholder="Ketik judul untuk dicari..."
            size="sm"
            endContent={<IconSearch size={18} />}
            type="search"
          />
        </div>

        <div>
          <div className="mt-5 mb-3">
            <h2 className="text-hijau-tua font-bold">
              Cari Berdasarkan Kategori
            </h2>
          </div>
          <div className="gap-1 grid md:grid-cols-5 grid-cols-2 flex-1">
            {list.map((item, index) => (
              <Card
                shadow="sm"
                key={index}
                isPressable
                onPress={() => console.log("item pressed")}
                className="md:max-w-44 max-w-36"
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
      </div>
      <FooterBar />
    </>
  );
};

export default HomePage;
