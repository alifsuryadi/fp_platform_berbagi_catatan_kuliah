import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { Card, CardBody, Image, Pagination, Button } from "@nextui-org/react";
import withAuthenticate from "../hoc/withAuthenticate";
import { axiosInstance } from "../lib/axios";
import { useSelector } from "react-redux";

const ListNotes = () => {
  const mail = useSelector((store) => store.authenticated.email);

  const [data, setData] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [categoryName, setCategoryName] = useState("");
  const [userData, setUserData] = useState([]);

  const location = useLocation();
  const categoryId = new URLSearchParams(location.search).get("category");
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryId) {
      axiosInstance
        .get(`/notes?categoryId=${categoryId}`)
        .then((res) => setData(res.data))
        .catch((err) => console.error(err));
    }
    fetchCategoryName();
  }, [categoryId]);

  const handleCardClick = (id) => {
    navigate(`/note-details/${id}`);
  };

  const fetchCategoryName = async () => {
    try {
      const result = await axiosInstance.get(`/categories?id=${categoryId}`);
      const saveResult = result.data[0];
      setCategoryName(saveResult.name);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredNotes = [...data];

    if (hasSearchFilter) {
      filteredNotes = filteredNotes.filter((note) =>
        note.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredNotes;
  }, [data, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  return (
    <>
      <NavigationBar mail={mail} />
      <div className="md:px-[128px] px-5 py-5">
        <div className="sm:px-16">
          <div className="flex justify-between items-center">
            <p className="text-hijau-tua text-large font-bold Pencarian mb-5">
              Kategori: <span className="text-hijau-muda">{categoryName}</span>
            </p>
            <label className="flex items-center text-default-400 text-small">
              Baris per halaman:
              <select
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={onRowsPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          </div>

          <div className="flex flex-col gap-2">
            {items.length > 0 ? (
              items.map((item, index) => (
                <Card
                  key={item.id}
                  isPressable
                  onPress={() => handleCardClick(item.id)}
                >
                  <CardBody>
                    <div className="flex gap-3">
                      <div className="flex flex-col max-w-24">
                        <Image src={item.images[0]?.data_url} />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-hijau-muda font-semibold">
                          {item.title}
                        </p>
                        <p className="text-abu-gelap text-xs">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))
            ) : (
              <p className="text-abu-gelap text-sm text-center">
                Notes belum tersedia untuk kategori ini.
              </p>
            )}
          </div>

          {items.length > 0 && (
            <div className="py-2 px-2 flex justify-between items-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={setPage}
              />
              <div className="hidden sm:flex w-[30%] justify-end gap-2">
                <Button
                  isDisabled={pages === 1}
                  size="sm"
                  variant="flat"
                  onPress={onPreviousPage}
                >
                  Sebelumnya
                </Button>
                <Button
                  isDisabled={pages === 1}
                  size="sm"
                  variant="flat"
                  onPress={onNextPage}
                >
                  Berikutnya
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default withAuthenticate(ListNotes);
