import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  adminGetProductDetails,
  editProduct,
} from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loading from "../../components/Loading";
import Toast from "../../Toast";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditProductMain = (props) => {
  const { productId } = props;

  const params = useParams();
  const p_id = params.id;

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState([]);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const productEdit = useSelector((state) => state.productEdit);
  const { loading, error, success } = productEdit;

  const productDetails = useSelector((state) => state.productDetails);
  const { product: productDetail } = productDetails;

  useEffect(() => {
    if (success) {
      toast.success("Product Updated", ToastObjects);
    } else {
      if (!productDetail?.title || productDetail?._id !== productId) {
        setTitle(productDetail?.title);
        setDescription(productDetail?.description);
        setImage(productDetail?.image);
        setPrice(productDetail?.price);
        setCategory(productDetail?.category);
      }
    }
  }, [productDetail, dispatch, productId, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      editProduct({
        id: productId,
        title,
        image,
        price,
        description,
        category,
        quantity,
      })
    );
  };

  useEffect(() => {
    dispatch(adminGetProductDetails(p_id));
  }, [dispatch, p_id]);

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Update Product</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Update Now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <div>
                      <div className="margin-left">
                        <div className="mb-4">
                          <label htmlFor="product_title" className="form-label">
                            Product title
                          </label>
                          <input
                            name="productName"
                            value={title}
                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id="product_title"
                            required
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="product_price" className="form-label">
                            Price
                          </label>
                          <input
                            name="price"
                            value={price}
                            type="number"
                            placeholder="Type here"
                            className="form-control"
                            id="product_price"
                            required
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>
                        <div className="mb-4">
                          <label className="form-label" id="product-category">
                            Quantity
                          </label>
                          <input
                            name="productCategory"
                            value={quantity}
                            type="text"
                            placeholder="shoes, men"
                            className="form-control"
                            required
                            id="product-category"
                            onChange={(e) => setQuantity(e.target.value)}
                          />
                        </div>
                        <div className="mb-4">
                          <label className="form-label" id="product-category">
                            Category
                          </label>
                          <input
                            name="productCategory"
                            value={category}
                            type="text"
                            placeholder="shoes, men"
                            className="form-control"
                            required
                            id="product-category"
                            onChange={(e) => setCategory(e.target.value)}
                          />
                        </div>
                        <div className="mb-4">
                          <label className="form-label">Description</label>
                          <textarea
                            name="description"
                            value={description}
                            placeholder="Type here"
                            className="form-control"
                            rows="7"
                            required
                            onChange={(e) => setDescription(e.target.value)}
                          ></textarea>
                        </div>
                        <div className="mb-4 edit-image">
                          <img src={image} alt="" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
