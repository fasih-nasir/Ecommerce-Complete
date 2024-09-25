import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Modal, notification } from 'antd'; // AntD
import { db } from '../auth/config';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

function Detail() {
  const [result, setResult] = useState(""); // For contact form submission result
  const [modal2Open, setModal2Open] = useState(false); // AntD modal state
  const { id } = useParams();
  const [product, setProduct] = useState(null); // For product data
  const [loading, setLoading] = useState(true); // For loading state
  const [api, contextHolder] = notification.useNotification(); // Notification

  // Function to show the notification
  const openNotification = (type, message, description) => {
    api[type]({
      message,
      description,
      placement: 'bottomRight', // Notification will appear at the bottom-right
    });
  };

  // Function to check if the item is already in the cart
  const checkIfItemExistsInCart = async () => {
    const q = query(collection(db, 'orders'), where('product', '==', product.title));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Returns true if the item exists
  };

  // Function to add the item to the cart
  const AddToCart = async () => {
    const itemExists = await checkIfItemExistsInCart();

    if (itemExists) {
      // Show notification if the item is already in the cart
      openNotification('warning', 'Already in Cart', 'This item is already in your cart.');
    } else {
      // Add the product to Firestore
      await addDoc(collection(db, 'orders'), {
        product: product.title,
        desc: product.description,
        price: product.price,
        img: product.thumbnail,
      });

      // Show success notification
      openNotification('success', 'Item Added', 'Your item has been added to the cart.');

      // Refresh the page after adding to the cart
      setTimeout(() => {
        window.location.reload(); // Refreshes the page after a short delay
      }, 1000); // Adjust delay as needed
    }
  };

  // Fetch product details using product ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data); // Set the fetched product data
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchProduct();
  }, [id]);

  // Handle form submission
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
    formData.append("access_key", "3070b740-35cc-4484-b4bb-b8c09ba5ee2c");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
        openNotification('success', 'Order Successful', 'Your order has been placed successfully!');
        setModal2Open(false); // Close the modal after successful submission
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setResult("There was an error submitting the form.");
    }
  };

  // Handle loading state
  if (loading) {
    return <div>Loading product details...</div>;
  }

  // Handle case where product is undefined
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <section className="text-muted pt-5 body-font">
        <div className="container mx-auto py-5 d-flex justify-content-center">
          <div className="row d-flex align-items-center">
            {/* Image Column */}
            <div className="col-10 boximg col-lg-5 col-md-5 mb-4 mb-md-0 d-flex justify-content-center align-items-center">
              <img
                className="img-fluid rounded"
                alt={product.title}
                src={product.thumbnail}
              />
            </div>
            <div className="col-1"></div>

            {/* Product Details Column */}
            <div className="col-12 col-lg-6 col-md-7 d-flex flex-column text-center text-md-start">
              <h1 className="title-font fs-2 mb-4 fw-medium text-dark">
                {product.title}
              </h1>
              <p className="mb-4 lead">{product.description}</p>
              <h4 className="fw-bold text-dark mb-3">Price: ${product.price}</h4>
              <div className="mb-4">
                <span className="fw-bold">Rating: </span>
                <span className="text-warning">
                  {'★'.repeat(Math.round(product.rating))}{' '}
                  <span className="text-muted">({product.rating})</span>
                </span>
              </div>
              <div className="d-flex justify-content-center justify-content-md-start">
                <Button
                  type="primary"
                  className="seemore p-3 fw-bold"
                  onClick={() => setModal2Open(true)}
                >
                  Buy Now
                </Button>
                <button
                  className="btn py-2 px-4"
                  onClick={AddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Ant Design Modal */}
            <Modal
              title="Buy Now"
              centered
              open={modal2Open}
              onCancel={() => setModal2Open(false)} // Close modal on clicking the close icon
              footer={null} // Removes the default OK and Cancel buttons
            >
              <form onSubmit={onSubmit} className='formcol d-flex flex-column justify-content-start'>
                <div className="d-flex">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="col-5"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className='col-6 mx-2'
                  />
                </div>
                <div className="d-flex">
                  <input
                    type="number"
                    name="Quantity"
                    placeholder="Quantity"
                    required
                    className="col-5"
                  />
                  <input
                    type="text"
                    name="Location"
                    placeholder="Location"
                    required
                    className='col-6 mx-2'
                  />
                </div>
                <input
                  name="Order-Detail"
                  value={`Product Title: ${product.title}`}
                  readOnly
                  className='col-6'
                />
                <input
                  type="text"
                  className='col-6'
                  readOnly
                  name="Price"
                  value={`Price: $${product.price}`}
                />
                <input
                  type="text"
                  className='col-6'
                  readOnly
                  name="Description"
                  value={`Description: ${product.description}`}
                />
                <input
                  type="text"
                  className='col-6'
                  readOnly
                  value={`${product.thumbnail}`}
                />
                <div className='d-flex justify-content-center align-items-center'>
                  <button
                    type="submit"
                    className='seemore col-3'
                  >
                    Done
                  </button>
                </div>
              </form>
            </Modal>
            {/* End of AntD Modal */}
            {contextHolder}
          </div>
        </div>
      </section>
    </>
  );
}

export default Detail;
