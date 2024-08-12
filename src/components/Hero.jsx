import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div>
      <div
        className="w-full  bg-center bg-cover"
        style={{
          backgroundImage: `url(
            "https://images.pexels.com/photos/2707756/pexels-photo-2707756.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
          )`,
        }}
      >
        <div className="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 py-12">
          <div className="text-center">
            <div className="container px-4 mx-auto">
              <div className="max-w-4xl mx-auto text-center">
                <span className="text-gray-200 font-semibold uppercase tracking-widest">
                  New Website
                </span>
                <h2 className="mt-8 mb-6 text-4xl lg:text-5xl font-bold text-gray-100">
                  Ini adalah website untuk berbagi catatan kuliah
                </h2>
                <p className="max-w-3xl mx-auto mb-10 text-lg text-gray-300">
                  Mari bergabung dengan kami dan dapatkan manfaat yang sangat
                  penting bagi anda yang kuliah
                </p>
                <Link
                  className="inline-block w-full md:w-auto mb-4 md:mr-6 py-5 px-8 text-sm font-bold uppercase border-2 border-transparent bg-gray-200 rounded hover:bg-gray-100 text-gray-800 transition duration-200"
                  to="/register"
                >
                  Register Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
