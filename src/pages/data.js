import React from "react";
const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "JUDUL", uid: "title", sortable: true },
  { name: "KATEGORI", uid: "category", sortable: true },
  { name: "AKSI", uid: "actions" },
];

const notes = [
  {
    id: 1,
    title: "Catatan lorem",
    category: "Ilmu Pengetahuan Alam",
    description: "lorem ipsum dolor sit amet",
    images: [
      {
        name: "GUH9P_4W0AEU9I0.jpeg",
        size: 311564,
        type: "image/jpeg",
        webkitRelativePath: "",
      },
      {
        name: "GUH9P_ZaMAAuAkI.jpeg",
        size: 525241,
        type: "image/jpeg",
        webkitRelativePath: "",
      },
    ],
  },
  {
    id: 2,
    title: "Aljabar Lanjut",
    category: "Matematika",
    description: "lorem ipsum dolor sit amet",
  },
  {
    id: 3,
    title: "Aljabar Lanjut",
    category: "Matematika",
    description: "lorem ipsum dolor sit amet",
  },
  {
    id: 4,
    title: "Aljabar Lanjut",
    category: "Matematika",
    description: "lorem ipsum dolor sit amet",
  },
  {
    id: 5,
    title: "Aljabar Lanjut",
    category: "Matematika",
    description: "lorem ipsum dolor sit amet",
  },
  {
    id: 6,
    title: "Aljabar Lanjut",
    category: "Matematika",
    description: "lorem ipsum dolor sit amet",
  },
];

const category = [
  {
    id: 1,
    categoryName: "Ilmu Pengetahuan Alam",
  },
  {
    id: 2,
    categoryName: "Matematika",
  },
  {
    id: 3,
    categoryName: "Teknik",
  },
];

export { columns, notes, category };
