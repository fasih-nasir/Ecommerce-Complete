import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, doc } from "firebase/firestore";

// Create context
const MyContext = React.createContext();

function CardProvider({ children }) {
  const [orders, setOrders] = useState([]);
  
  // Initialize Firestore
  const db = getFirestore();

  // Fetch all documents from the "orders" collection
  useEffect(() => {
    const fetchOrders = async () => {
      const querySnapshot = await getDocs(collection(db, "orders"));
      
      // Convert the query snapshot to an array of document data only (excluding the document ID)
      const orderList = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Get the unique ID of the order
        ...doc.data(), // Get the data of the order
      }));
    
      
    //   console.log(orderList.length);
      
      
      setOrders(orderList);
    };

    fetchOrders().catch(error => {
      console.error("Error fetching orders:", error);
    });
  }, [db]); // Dependency array makes sure the effect runs when db changes

  return (
    <MyContext.Provider value={{ orders }}>
      {children}
    </MyContext.Provider>
  );
}

export default CardProvider;
export { MyContext };
