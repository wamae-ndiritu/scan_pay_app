import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";
import Header from "./Header";
import {
  adminListProducts,
  createProduct,
  deleteProduct,
} from "../../redux/actions/productActions";
import app from "../firebase/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const rows = [
  { id: 1, lastName: "Product Title", firstName: "Pric", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function Products() {
  const bucket_url = process.env.REACT_APP_BUCKET_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    quantity: "",
  });

  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const { product, loading, error } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const { success } = productDelete;

  const formattedProducts = products?.map((product) => {
    return {
      ...product,
      id: product._id,
    };
  });

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleEdit = (id) => {
    navigate(`/admin/products/${id}/edit`);
  };

  const columns = [
    {
      field: "product",
      headerName: "Product",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.image} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "title", headerName: "Title", width: 200 },
    { field: "category", headerName: "Category", width: 80 },
    {
      field: "price",
      headerName: "Price",
      width: 80,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 120,
    },
    {
      field: "qrcode",
      headerName: "QR Code",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListQrCode" src={params.row.qrcode} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <button
              className="productListEdit"
              onClick={() => handleEdit(params.row.id)}
            >
              Edit
            </button>
            <DeleteIcon
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  const uploadImage = (e) => {
    e.preventDefault();
    const promises = [];
    const fileName = new Date().getTime() + image.name;
    const storage = getStorage(app, bucket_url);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    promises.push(uploadTask);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (error) => {
        // console.log(error);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
        });
      }
    );
    Promise.all(promises)
      .then(() => console.log("Image upploaded"))
      .catch((err) => console.log(err));
  };

  const publishProduct = () => {
    dispatch(createProduct({ ...inputs, image: url }));
  };

  useEffect(() => {
    if (product) {
      // alert("Product added successfuly!");
    } else if (loading) {
      console.log("Loading...");
    } else if (error) {
      alert("An error occurred!");
    }
  });

  useEffect(() => {
    dispatch(adminListProducts());
  }, [dispatch, success]);

  return (
    <>
      <Header />
      <div className="container mt-3">
        <div className="d-flex justify-content-flex-end">
          <button
            type="button"
            className="btn btn-success mb-3"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Create Product
          </button>
        </div>
        {/* <!-- Button trigger modal --> */}

        {/* <!-- Modal --> */}
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Add Product
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div className="mb-3">
                  <label for="inputPassword5" className="form-label">
                    Product Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label for="inputPassword5" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label for="inputPassword5" className="form-label">
                    Category
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="category"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label for="inputPassword5" className="form-label">
                    Quantity
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="quantity"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label for="inputPassword5" className="form-label">
                    Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    onChange={handleImage}
                  />
                </div>
                <div className="mb-3">
                  <label for="inputPassword5" className="form-label">
                    Description
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    rows="5"
                    placeholder="Type your product description here..."
                    name="description"
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={uploadImage}
                >
                  Upload Image
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={publishProduct}
                >
                  Publish Product
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="shadow-sm" style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={formattedProducts || rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 20 },
              },
            }}
            rowHeight={100}
            pageSizeOptions={[5, 20]}
            checkboxSelection
          />
        </div>
      </div>
    </>
  );
}
