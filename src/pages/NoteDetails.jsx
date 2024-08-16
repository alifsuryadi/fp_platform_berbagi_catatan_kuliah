import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import {
  Button,
  Divider,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import withAuthenticate from "../hoc/withAuthenticate";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSelector } from "react-redux";
import { axiosInstance } from "../lib/axios";
import { ArrowLeft } from "../icons/icons";
import { useNavigate } from "react-router-dom";

// Define schema for comment validation
export const commentSchema = z.object({
  comment: z.string().min(1, { message: "Komentar kosong" }),
});

const NoteDetails = () => {
  const mail = useSelector((store) => store.authenticated.email);

  const { id } = useParams(); // Get the note ID from the URL
  const [note, setNote] = useState(null);
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("user")); // Mocked logged-in user info

  const fetchUserName = async () => {
    try {
      const result = await axiosInstance.get(`/users?id=${note?.userId}`);
      const saveResult = result.data[0];
      setUsername(saveResult?.nama);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const {
    isOpen: isOpenImage,
    onOpen: onOpenImage,
    onClose: onCloseImage,
  } = useDisclosure();

  const {
    isOpen: isOpenAddComment,
    onOpen: onOpenAddComment,
    onOpenChange: onAddCommentOpenChange,
  } = useDisclosure();

  const {
    handleSubmit: handleSubmitAdd,
    control: controlAdd,
    reset: resetAdd,
  } = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const navigate = useNavigate();

  const backTo = () => {
    navigate(-1);
  };

  const [openedImage, setOpenedImage] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`http://localhost:3000/notes/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const noteData = await response.json();
        setNote(noteData);
        setComments(noteData.comments || []);
      } catch (error) {
        console.error("Failed to fetch note:", error.message);
      }
    };
    fetchNote();
    fetchUserName();
  }, [id, note]);

  const addComment = async (data) => {
    const newComment = {
      id: comments.length + 1, // Simple incremental ID
      userId: currentUser.id,
      username: currentUser.nama,
      komentar: data.comment,
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);

    // Update the note with new comments in db.json
    // const updatedNote = { ...note, comments: updatedComments };

    try {
      await fetch(`http://localhost:3000/notes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comments: updatedComments }),
      });
    } catch (error) {
      console.error("Failed to update comments:", error.message);
    }

    onAddCommentOpenChange(false);
    resetAdd();
  };

  const handleOpenImage = (img) => {
    setOpenedImage(img);
    onOpenImage();
  };

  if (!note) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  return (
    <>
      <NavigationBar mail={mail} />
      <div className="md:px-[128px] px-5">
        <div className="mt-5 mb-3">
          <div className="flex">
            <Button
              startContent={<ArrowLeft />}
              size="sm"
              className="text-white bg-abu-muda"
              onPress={backTo}
            >
              Kembali
            </Button>
          </div>
          <div className="mx-10 mt-2">
            <div className="">
              <h1 className="text-hijau-tua font-bold text-xl">{note.title}</h1>
            </div>

            <div className="mt-2 mb-5">
              <h2 className="text-hijau-paling-muda font-semibold">
                by <span className="font-bold text-hijau-muda">{username}</span>
              </h2>
            </div>
            <div className="text-justify">{note.description}</div>
            <div className="mt-5 mb-5">
              <h2 className="text-hijau-muda font-bold">Gambar</h2>
            </div>
            <div className="gap-2 grid md:grid-cols-5 grid-cols-2 mt-5 mb-10">
              {note.images.map((image, index) => (
                <Image
                  onClick={() => handleOpenImage(image)}
                  key={index}
                  isZoomed
                  width={240}
                  alt={`Image ${index + 1}`}
                  className="w-full object-cover h-[140px] cursor-pointer"
                  src={image.data_url}
                />
              ))}
            </div>
            <Divider />
            <div className="mt-5 mb-3 flex justify-between ">
              <h2 className="text-hijau-muda font-bold">Komentar</h2>
              <Button
                size="sm"
                className="bg-hijau-muda text-white"
                onClick={onOpenAddComment}
              >
                Tambah Komentar
              </Button>
            </div>
            <div className="flex flex-col gap-3">
              {comments.map((item) => (
                <div
                  key={item.id}
                  className=""
                >
                  <p className="text-hijau-paling-muda">{item.username}</p>
                  <p className="text-sm">{item.komentar}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal
        size="lg"
        isOpen={isOpenImage}
        onClose={onCloseImage}
        placement="center"
        closeButton
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {openedImage?.title}
              </ModalHeader>
              <ModalBody className="flex flex-row justify-center">
                <img
                  src={openedImage?.data_url}
                  alt={openedImage?.title}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "60vh",
                    objectFit: "contain",
                  }}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpenAddComment}
        onOpenChange={onAddCommentOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Tambahkan Komentar Baru
              </ModalHeader>
              <form onSubmit={handleSubmitAdd(addComment)}>
                <ModalBody>
                  <Controller
                    name="comment"
                    control={controlAdd}
                    render={({ field, fieldState }) => (
                      <Textarea
                        autoComplete="off"
                        {...field}
                        type="text"
                        label="Isi komentar"
                        placeholder=""
                        isInvalid={Boolean(fieldState.error)}
                        errorMessage={fieldState.error?.message}
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
    </>
  );
};

export default withAuthenticate(NoteDetails);
