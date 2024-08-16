import { Divider, Link } from "@nextui-org/react";
import React from "react";

const FootLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Catatanku"];
  return (
    <div>
      <Divider className="mt-100" />
      <div className="md:px-[128px] px-5">
        <div className="mt-8 mb-3 sm:mb-0 flex  flex-col sm:flex-row justify-between">
          <p className="font-bold text-inherit text-hijau-tua text-2xl">
            <strong className="text-hijau-paling-muda">Note</strong>Kuliah.
          </p>
          <div className="flex flex-col">
            <div className="flex gap-5">
              <div className="flex flex-col">
                <p className="text-hijau-muda font-bold text-md">
                  Untuk Pemula
                </p>
                <Link className="text-sm text-abu-gelap" href="/register">
                  Buat akun
                </Link>
              </div>
              <div className="flex flex-col">
                <p className="text-hijau-muda font-bold text-md">
                  Hubungi Kami
                </p>
                <div className="text-sm text-abu-gelap">Instagram</div>
                <div className="text-sm text-abu-gelap">Github</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-6 mt-5">
          <p className="text-abu-muda text-xs">
            Copyright 2024 All Rights Reserved NoteKuliah.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FootLanding;
