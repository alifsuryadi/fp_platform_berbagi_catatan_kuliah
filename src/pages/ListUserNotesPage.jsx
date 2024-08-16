import React, { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { PlusIcon } from "../icons/PlusIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { EditIcon } from "../icons/EditIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { EyeIcon } from "../icons/EyeIcon";
import { columns } from "../components/column";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { axiosInstance } from "../lib/axios";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import ImageUploading from "react-images-uploading";
import { SmallDelete, SmallUpdate } from "../icons/icons";
import withAuthenticate from "../hoc/withAuthenticate";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const INITIAL_VISIBLE_COLUMNS = ["title", "category", "date", "actions"];

export const noteSchema = z.object({
  categoryId: z.string().min(1, { message: "Kategori belum dipilih." }),
  title: z.string().min(1, { message: "Judul harus diisi." }),
  description: z.string().min(1, { message: "Deskripsi masih kosong." }),
  images: z
    .array(
      z.object({
        data_url: z.string().url(), // Sesuaikan dengan struktur data dari library gambar yang Anda gunakan
      })
    )
    .optional(),
});

const ListUserNotesPage = () => {
  const mail = useSelector((store) => store.authenticated.email);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "title",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  const [notesData, setNotesData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [noteToEdit, setNoteToEdit] = useState({});
  const [noteToDelete, setNoteToDelete] = useState({});
  const navigate = useNavigate();

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onOpenChange: onAddOpenChange,
  } = useDisclosure();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();

  const {
    handleSubmit: handleSubmitAdd,
    control: controlAdd,
    reset: resetAdd,
  } = useForm({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      categoryId: "",
      title: "",
      description: "",
      images: [],
    },
  });

  const fetchNotes = async (userId) => {
    // `/categories?id=${categoryId}`
    try {
      const result = await axiosInstance.get(`/notes?userId=${userId}`);
      setNotesData(result.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const result = await axiosInstance.get("/categories");
      setCategoriesData(result.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes(userId);
    fetchCategories();
  }, [userId]);

  const {
    handleSubmit: handleSubmitEdit,
    control: controlEdit,
    reset: resetEdit,
  } = useForm({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      categoryId: "",
      title: "",
      description: "",
      images: [],
    },
  });

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
  } = useDisclosure();

  const dataUrlToFile = async (dataUrl, filename) => {
    return fetch(dataUrl)
      .then((res) => res.arrayBuffer())
      .then((buffer) => new File([buffer], filename, { type: "image/jpeg" }));
  };

  // func tambah data baru
  const addNote = async (data) => {
    try {
      const formData = new FormData();

      // Jika ada gambar dalam format data_url, konversi ke File dan tambahkan ke FormData
      if (data.images && data.images.length > 0) {
        for (const [index, image] of data.images.entries()) {
          const { data_url } = image;
          const file = await dataUrlToFile(data_url, `image${index}.jpg`);
          formData.append("file", file);
        }

        // Meng-upload gambar dan mendapatkan URL gambar
        const uploadResponse = await axios.post(
          "http://localhost:5000/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Ubah format respons dari server menjadi format yang diinginkan
        const imageUrls = uploadResponse.data;

        // Membuat data catatan dengan URL gambar
        const noteData = {
          userId: userId,
          categoryId: data.categoryId,
          title: data.title,
          description: data.description,
          images: imageUrls, // Gunakan format yang diubah
          timestamp: Date.now(),
        };
        console.log("notedata:", noteData);

        // Mengirim data catatan ke JSON Server
        await axios.post("http://localhost:5000/notes", noteData);

        console.log("Note added successfully");
        onAddOpenChange(false);
        resetAdd();
        fetchNotes(userId);
        toast.success("Sukses Menambahkan Catatan Baru");
      } else {
        // Jika tidak ada gambar, langsung kirim data catatan
        const noteData = {
          userId: userId,
          categoryId: data.categoryId,
          title: data.title,
          description: data.description,
          images: [], // Jika tidak ada gambar, kirim array kosong
          timestamp: Date.now(),
        };

        // Mengirim data catatan ke JSON Server
        await axios.post("http://localhost:5000/notes", noteData);

        console.log("Note added successfully");
        onAddOpenChange(false);
        resetAdd();
        fetchNotes(userId);
        toast.success("Sukses Menambahkan Catatan Baru");
      }
    } catch (error) {
      console.error("Error adding note:", error);
      toast.error("Gagal Menambahkan Catatan");
    }
  };

  useEffect(() => {
    if (noteToEdit) {
      const categoryId = noteToEdit?.categoryId;
      const foundCategory = categoriesData.find(
        (category) => category.id === categoryId
      );
      const idToString = foundCategory?.id.toString();
      // console.log(noteToEdit);
      resetEdit({
        categoryId: idToString || "",
        title: noteToEdit?.title || "",
        description: noteToEdit?.description || "",
        images: noteToEdit?.images || [],
      });
    }
  }, [noteToEdit, resetEdit]);

  function ImageUpload({ value, onChange }) {
    return (
      <ImageUploading
        multiple
        value={value}
        onChange={onChange}
        maxNumber={10}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
        }) => (
          <div className="upload__image-wrapper">
            <Button
              onClick={onImageUpload}
              className="text-white bg-hijau-muda mr-2"
              size="sm"
            >
              Upload gambar
            </Button>
            <Button
              className="text-white bg-red"
              size="sm"
              onClick={onImageRemoveAll}
            >
              Hapus semua gambar
            </Button>
            <div className="grid grid-cols-3 mt-2 ite">
              {imageList.map((image, index) => (
                <div
                  key={index}
                  className="image-item"
                >
                  <img
                    src={image["data_url"]}
                    alt=""
                    width="100"
                  />
                  <div className="image-item__btn-wrapper mt-1">
                    <Button
                      size="sm"
                      isIconOnly
                      className="text-xs mr-1"
                      onClick={() => onImageUpdate(index)}
                    >
                      <SmallUpdate />
                    </Button>
                    <Button
                      isIconOnly
                      size="sm"
                      className="text-xs"
                      onClick={() => onImageRemove(index)}
                    >
                      <SmallDelete />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ImageUploading>
    );
  }

  const editNote = (event) => {
    setNoteToEdit(event);
    onEditOpen();
  };

  // function untuk menyimpan data yang telah di edit
  const saveEditNote = async (data) => {
    const noteId = noteToEdit.id;
    try {
      const formData = new FormData();
      let newImageUrls = [];

      // Mengidentifikasi gambar lama yang tidak dipakai lagi
      const oldImages = noteToEdit.images || [];
      const remainingImages = data.images.map(
        (image) => image.data_url || image
      );

      const imagesToDelete = oldImages.filter(
        (oldImage) => !remainingImages.includes(oldImage.data_url)
      );

      // Hapus gambar lama yang tidak dipakai lagi
      for (const image of imagesToDelete) {
        await axios.delete("http://localhost:5000/upload", {
          data: { imageUrl: image.data_url },
        });
      }

      // Jika ada gambar dalam format data_url, konversi ke File dan tambahkan ke FormData
      if (data.images && data.images.length > 0) {
        for (const [index, image] of data.images.entries()) {
          if (image.data_url && !image.file) {
            // Cek apakah gambar sudah ada di oldImages
            if (
              !oldImages.some(
                (oldImage) => oldImage.data_url === image.data_url
              )
            ) {
              const file = await dataUrlToFile(
                image.data_url,
                `image${index}.jpg`
              );
              formData.append("file", file);
            }
          }
        }

        // Jika ada file baru yang perlu diupload, upload dan dapatkan URL gambar baru
        if (formData.has("file")) {
          const uploadResponse = await axios.post(
            "http://localhost:5000/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          newImageUrls = uploadResponse.data;
        }
      }

      // Gabungkan gambar yang sudah ada dengan gambar baru, tanpa duplikasi
      const updatedImages = [
        ...oldImages.filter((image) => !imagesToDelete.includes(image)),
        ...newImageUrls,
      ];

      // Membuat data catatan dengan URL gambar yang baru dan yang sudah ada
      const updatedNoteData = {
        userId: userId.toString(),
        categoryId: data.categoryId,
        title: data.title,
        description: data.description,
        images: updatedImages,
        timestamp: Date.now(),
      };

      // Mengirim data catatan yang telah diupdate ke JSON Server
      await axios.put(`http://localhost:5000/notes/${noteId}`, updatedNoteData);

      console.log("Note updated successfully");
      onEditOpenChange(false);
      resetEdit();
      fetchNotes(userId);
      toast.success("Sukses Memperbarui Catatan");
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Gagal Memperbarui Catatan");
    }
  };

  const checkDeleteNote = (event) => {
    setNoteToDelete(event);
    onDeleteOpen();
  };

  const deleteNote = async () => {
    const noteId = noteToDelete.id;

    try {
      // Ambil data catatan sebelum menghapus
      const noteResponse = await axios.get(
        `http://localhost:3000/notes/${noteId}`
      );
      const noteData = noteResponse.data;
      console.log(noteResponse);

      // Hapus gambar yang terkait dengan catatan
      if (noteData.images && noteData.images.length > 0) {
        for (const image of noteData.images) {
          await axios.delete("http://localhost:5000/upload", {
            data: { imageUrl: image.data_url },
          });
        }
      }

      // Hapus catatan dari JSON Server
      await axios.delete(`http://localhost:3000/notes/${noteId}`);

      console.log("Note and related images deleted successfully");
      fetchNotes(userId);
      toast.success("Catatan berhasil dihapus");
      onDeleteOpenChange(false);
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Gagal menghapus catatan");
    }
  };

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredNotes = [...notesData];

    if (hasSearchFilter) {
      filteredNotes = filteredNotes.filter((note) =>
        note.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredNotes;
  }, [notesData, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((note, columnKey, categoryData) => {
    const cellValue = note[columnKey];
    switch (columnKey) {
      case "title":
        return <p>{note.title}</p>;
      case "category":
        const foundCategory = categoryData.find(
          (category) => category.id === note.categoryId
        );
        return (
          <p className="text-bold text-tiny capitalize text-abu-gelap">
            {foundCategory?.name}
          </p>
        );
      case "date":
        return (
          <p className="text-bold text-tiny capitalize text-abu-gelap">
            {moment(note.timestamp).format("DD-MM-YYYY")}
          </p>
        );
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Tooltip
              delay={0}
              closeDelay={0}
              content="Lihat"
            >
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon onClick={() => navigate(`/note-details/${note.id}`)} />
              </span>
            </Tooltip>
            <Tooltip
              delay={0}
              closeDelay={0}
              content="Edit catatan"
            >
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon onClick={() => editNote(note)} />
              </span>
            </Tooltip>
            <Tooltip
              color="danger"
              content="Hapus catatan"
              delay={0}
              closeDelay={0}
            >
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon onClick={() => checkDeleteNote(note)} />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

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

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Cari berdasarkan judul..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Kolom
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid}>{column.name}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              onClick={onAddOpen}
              className="bg-hijau-muda text-white"
              endContent={<PlusIcon />}
            >
              Tambah
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {notesData.length} catatan
          </span>
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
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    onRowsPerPageChange,
    notesData.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
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
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <>
      <NavigationBar
        mail={mail}
        nav="list-user-notes-page"
      />
      <div className="md:px-[128px] px-5">
        <div className="mt-5 mb-3">
          <h2 className="text-hijau-tua font-bold">Daftar Catatan Anda</h2>
        </div>
        <div className="mx-10 mt-2">
          <div>
            {" "}
            <Table
              aria-label="Example table with custom cells, pagination and sorting"
              isHeaderSticky
              bottomContent={bottomContent}
              bottomContentPlacement="outside"
              classNames={{
                wrapper: "max-h-[382px]",
              }}
              selectedKeys={selectedKeys}
              sortDescriptor={sortDescriptor}
              topContent={topContent}
              topContentPlacement="outside"
              onSelectionChange={setSelectedKeys}
              onSortChange={setSortDescriptor}
            >
              <TableHeader columns={headerColumns}>
                {(column) => (
                  <TableColumn
                    key={column.uid}
                    align={column.uid === "actions" ? "center" : "start"}
                    allowsSorting={column.sortable}
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody
                emptyContent={"Catatan tidak ditemukan"}
                items={sortedItems}
              >
                {(item) => (
                  <TableRow key={item.id}>
                    {(columnKey) => (
                      <TableCell>
                        {renderCell(item, columnKey, categoriesData)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        <Modal
          isOpen={isAddOpen}
          onOpenChange={onAddOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Catatan Baru
                </ModalHeader>
                <form onSubmit={handleSubmitAdd(addNote)}>
                  <ModalBody>
                    <Controller
                      name="categoryId"
                      control={controlAdd}
                      render={({ field, fieldState }) => (
                        <Select
                          {...field}
                          label="Kategori"
                          placeholder="Pilih kategori"
                          onChange={(value) => field.onChange(value)}
                          isInvalid={Boolean(fieldState.error)}
                          errorMessage={fieldState.error?.message}
                        >
                          {categoriesData.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />

                    <Controller
                      name="title"
                      control={controlAdd}
                      render={({ field, fieldState }) => (
                        <Input
                          autoComplete="off"
                          {...field}
                          type="text"
                          label="Judul"
                          placeholder="Ketik judul..."
                          isInvalid={Boolean(fieldState.error)}
                          errorMessage={fieldState.error?.message}
                        />
                      )}
                    />
                    <Controller
                      name="description"
                      control={controlAdd}
                      render={({ field, fieldState }) => (
                        <Textarea
                          autoComplete="off"
                          {...field}
                          label="Deskripsi"
                          variant="flat"
                          placeholder="Ketik deskripsi..."
                          disableAnimation
                          disableAutosize
                          isInvalid={Boolean(fieldState.error)}
                          errorMessage={fieldState.error?.message}
                          classNames={{ input: "resize-y min-h-[40px]" }}
                        />
                      )}
                    />
                    <Controller
                      name="images"
                      control={controlAdd}
                      render={({ field, fieldState }) => (
                        <ImageUpload
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      variant="light"
                      onPress={onClose}
                    >
                      Tutup
                    </Button>
                    <Button
                      color="primary"
                      type="submit"
                    >
                      Tambah
                    </Button>
                  </ModalFooter>
                </form>
              </>
            )}
          </ModalContent>
        </Modal>
        <Modal
          isOpen={isEditOpen}
          onOpenChange={onEditOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Edit Catatan
                </ModalHeader>
                <form onSubmit={handleSubmitEdit(saveEditNote)}>
                  <ModalBody>
                    <Controller
                      name="categoryId"
                      control={controlEdit}
                      render={({ field, fieldState }) => (
                        <Select
                          {...field}
                          label="Kategori"
                          placeholder="pilih kategori catatan"
                          onChange={(value) => {
                            field.onChange(value);
                          }}
                          isInvalid={Boolean(fieldState.error)}
                          errorMessage={fieldState.error?.message}
                          selectedKeys={[field.value]}
                        >
                          {categoriesData.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />

                    <Controller
                      name="title"
                      control={controlEdit}
                      render={({ field, fieldState }) => (
                        <Input
                          autoComplete="off"
                          {...field}
                          type="text"
                          label="Judul"
                          placeholder="ketik judul..."
                          isInvalid={Boolean(fieldState.error)}
                          errorMessage={fieldState.error?.message}
                        />
                      )}
                    />
                    <Controller
                      name="description"
                      control={controlEdit}
                      render={({ field, fieldState }) => (
                        <Textarea
                          autoComplete="off"
                          {...field}
                          label="Deskripsi"
                          variant="flat"
                          placeholder="ketik deskripsi..."
                          disableAnimation
                          disableAutosize
                          isInvalid={Boolean(fieldState.error)}
                          errorMessage={fieldState.error?.message}
                          classNames={{
                            input: "resize-y min-h-[40px]",
                          }}
                        />
                      )}
                    />
                    <Controller
                      name="images"
                      control={controlEdit}
                      render={({ field, fieldState }) => (
                        <ImageUpload
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      variant="light"
                      onPress={onClose}
                    >
                      Tutup
                    </Button>
                    <Button
                      color="primary"
                      type="submit"
                    >
                      Simpan
                    </Button>
                  </ModalFooter>
                </form>
              </>
            )}
          </ModalContent>
        </Modal>
        <Modal
          isOpen={isDeleteOpen}
          onOpenChange={onDeleteOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Konfirmasi
                </ModalHeader>
                <ModalBody>
                  <p>Hapus catatan ini?</p>
                  <p className="font-semibold">{noteToDelete.title}</p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    variant="light"
                    onPress={onClose}
                  >
                    Batal
                  </Button>
                  <Button
                    color="danger"
                    onPress={deleteNote}
                  >
                    Hapus
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default withAuthenticate(ListUserNotesPage);
