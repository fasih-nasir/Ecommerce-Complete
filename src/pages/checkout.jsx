import { useState, useContext, useEffect } from "react";
import { db } from "../auth/config";
import { doc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { MyContext } from "../context/theme";
import { DeleteOutlined } from '@ant-design/icons';
import { notification } from 'antd'; // Import notification from AntD

function CheckOut() {
  // CONTACT
  const [result, setResult] = useState("");
  const [modal2Open, setModal2Open] = useState(false); // Add modal state if you need it

  // Function to show notifications
  const openNotification = (type, message) => {
    notification[type]({
      message,
      placement: 'bottomRight',
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    
    const formData = new FormData(event.target);
    formData.append("access_key", "3070b740-35cc-4484-b4bb-b8c09ba5ee2c");

    // Collecting product details
    let productDetails = updatedOrders.map(order => {
      return `Title: ${order.product}, Price: ${order.price}, Image: ${order.img}`;
    }).join("\n"); // Join all product details with newline for better formatting

    // Append product details to form data
    formData.append("products", productDetails); // Change to a single key for all products
    formData.append("total_cost", total.toFixed(2)); // Append total cost

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
        openNotification('success', 'Order Successful');
        setModal2Open(false); // Close the modal after successful submission if applicable

        // Delete all orders after successful email submission
        await deleteAllOrders();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setResult("Submission failed. Please try again.");
    }
  };

  // Function to delete all orders from Firestore
  const deleteAllOrders = async () => {
    const ordersCollection = collection(db, "orders");
    const orderSnapshot = await getDocs(ordersCollection);
    const deletePromises = orderSnapshot.docs.map(doc => deleteDoc(doc.ref));
    
    // Wait for all deletions to complete
    await Promise.all(deletePromises);
    setUpdatedOrders([]); // Clear the local state after deletion
    setTotal(0); // Reset total to 0
    openNotification('success', 'All orders have been deleted successfully.');
  };

  // FIRESTORE 
  const [item, setitem] = useState("");
  const { orders } = useContext(MyContext); // Accessing the orders from context
  const [total, setTotal] = useState(0); // Total price state
  const [updatedOrders, setUpdatedOrders] = useState([]); // State for updated orders

  // useEffect to calculate total and ensure orders are loaded
  useEffect(() => {
    if (orders && orders.length > 0) {
      let calculatedTotal = 0;
      orders.forEach((order) => {
        calculatedTotal += parseFloat(order.price || 0);
      });
      setTotal(calculatedTotal); // Update total
      setUpdatedOrders(orders); // Set updatedOrders once orders are fetched
    }
  }, [orders]);

  // Handle delete order without refreshing the page
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "orders", id));
    // Filter out the deleted order from state
    setUpdatedOrders(updatedOrders.filter(order => order.id !== id));

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      <div className="container py-5 px-2">
        <div className="row d-flex">
          {/* Orders Column - col-8 */}
          <div className="col-8">
            {
              updatedOrders.length > 0 ? (
                updatedOrders.map((e, index) => (
                  <div className="d-flex flex-row order-item justify-content-around mb-3" key={index}>
                    <div className="col-2 p-2">
                      <img src={e.img} alt="" className="img-fluid col-7" />
                    </div>
                    <div className="d-flex align-items-center col-8 justify-content-between">
                      <p className="text-truncate col-4">{e.product}</p>
                      <p>{e.price}</p>
                      <button onClick={() => handleDelete(e.id)}>
                        <DeleteOutlined />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No orders available</p> // Display this message if no orders are found
              )
            }
          </div>

          {/* col-4 - Side Column */}
          <div className="col-4 order-item d-flex flex-column justify-content-center py-2 px-4">
            <h3 className="text-center py-2">CheckOut Detail</h3>
            <h4>Items : {updatedOrders.length}</h4>
            <h4>Total Price: ${total.toFixed(2)}</h4>
            <div className="d-flex justify-content-center pt-2">
              <div>
                <form onSubmit={onSubmit} className="formdiv">
                  <input type="text" name="Item" value={updatedOrders.length} readOnly />
                  <input type="text" name="Price" value={total.toFixed(2)} readOnly />
                
                  <button className="col-6 seemore px-2 rounded-1 fw-bold" type="submit">Order Now</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckOut;
