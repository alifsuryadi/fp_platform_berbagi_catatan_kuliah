import { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import { Card, CardFooter, Image, CardBody } from "@nextui-org/react";
import { IconSearch } from "../icons/icons";
import FooterBar from "../components/FooterBar";
import withAuthenticate from "../hoc/withAuthenticate";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

const HomePage = () => {
  const mail = useSelector((store) => store.authenticated.email);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/list-notes?category=${categoryId}`);
  };

  const handleFindNotes = () => {
    navigate("/list-all-notes");
  };

  return (
    <>
      <NavigationBar mail={mail} nav="homepage" />
      <div className="md:px-[128px] px-5">
        <div className="mt-5 mb-3">
          <div className="flex flex-col ">
            <h2 className="text-hijau-tua font-bold mb-4 mr-5">
              Akses Catatan Kuliah Tanpa Batas
            </h2>
            <Card
              className=" text-hijau-muda hover:bg-hijau-muda hover:text-white"
              isPressable
              onPress={handleFindNotes}
            >
              <CardBody>
                <div className="flex justify-between gap-2">
                  <p className="font-semibold">Temukan disini</p>
                  <IconSearch />
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        <div>
          <div className="mt-5 mb-3">
            <h2 className="text-hijau-tua font-bold">
              Atau Temukan Berdasarkan Kategori
            </h2>
          </div>
          <div className="gap-1 grid md:grid-cols-5 grid-cols-2">
            {categories.map((category) => (
              <Card
                shadow="sm"
                key={category.id}
                isPressable
                onPress={() => handleCategoryClick(category.id)}
                className="md:max-w-44 max-w-36  mb-5"
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    isZoomed
                    shadow="sm"
                    radius="none"
                    width="100%"
                    alt={category.name}
                    className="w-full object-cover h-[140px]"
                    src={category.img}
                  />
                </CardBody>
                <CardFooter className="flex text-small justify-center items-center max-h-full">
                  <b>{category.name}</b>
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

export default withAuthenticate(HomePage);
