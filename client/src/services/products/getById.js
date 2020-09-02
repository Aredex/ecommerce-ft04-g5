export default async function getById(id) {
  return {
    id: 4,
    name: "palmera",
    description: "una palmera",
    price: 15,
    stock: 0,
    createdAt: "2020-09-02T15:52:18.498Z",
    updatedAt: "2020-09-02T15:52:18.498Z",
    categories: [
      {
        id: 2,
        name: "palmera",
        description: "son palmeras",
        createdAt: "2020-09-02T00:29:48.133Z",
        updatedAt: "2020-09-02T00:29:48.133Z",
        productCategory: {
          createdAt: "2020-09-02T15:56:12.997Z",
          updatedAt: "2020-09-02T15:56:12.997Z",
          productId: 4,
          categoryId: 2,
        },
      },
    ],
  };
}
