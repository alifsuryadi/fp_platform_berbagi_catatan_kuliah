import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="w-full h-screen bg-center bg-cover"
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/733852/pexels-photo-733852.jpeg")`,
      }}
    >
      <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-20 py-12">
        <div className="text-center">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <span className="text-white font-semibold  tracking-widest font-poppins">
                Selamat Datang di NoteKuliah
              </span>
              <h2 className="mt-8 mb-6 text-4xl lg:text-5xl font-bold text-white">
                Temukan dan bagikan catatan kuliah terbaik dari seluruh
                mahasiswa
              </h2>
              <p className="max-w-3xl mx-auto mb-10 text-lg text-white">
                Bergabung sekarang dan jadilah bagian dari komunitas belajar
                yang saling membantu!
              </p>
              <Link
                className="inline-block w-full md:w-auto mb-4 md:mr-6 py-5 px-8 text-sm font-bold uppercase border-2 border-transparent bg-abu-muda rounded hover:bg-gray-100 text-white transition duration-200"
                to="/register"
              >
                Gabung Sekarang
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
