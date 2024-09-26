import { Link } from "react-router-dom";
import { Button, Dropdown, Badge, Drawer } from 'antd';
import { LoginOutlined, ShoppingOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";

import { useState, useContext } from "react";
import { MyContext } from "../context/theme"; // Assuming you're using context for orders and theme
import { bottom } from "@popperjs/core";

function Header() {
  const { orders } = useContext(MyContext); // Access orders from context
  
  const [open, setOpen] = useState(false);

  // Drawer functionality
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // Dropdown menu items
  const items = [
    {
      label: <Link to="/auth/create">Create Account</Link>,
      key: '0',
    },
    {
      label: <Link to="/auth/login">Login</Link>,
      key: '1',
    },
  ];

  // User status - currently set to false for testing
  const user = false;

  return (
    <>
    <div className="container-fluid d-flex justify-content-center  navba position-fixed">
      <header className=" p-2  container z-3 ">
        <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Fn.</a>

            {/* Toggle Button for Mobile View */}
            <button
              className="navbar-toggler seemore"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Collapsible Navbar */}
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Product">Products</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">Contact-us</Link>
                </li>

              </ul>

              {/* Cart Icon with Badge */}
              <Badge count={orders.length} showZero onClick={showDrawer}>
                <ShoppingOutlined style={{ fontSize: '24px', color: '#000' }} />
              </Badge>
            </div>
          </div>
        </nav>
      </header>
      </div>

      {/* Drawer for Cart Details */}
      <Drawer
        title="Cart Detail"
        placement="right"
        width={500}
        onClose={onClose}
        open={open}
      >
        <div>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={index} className="order-item" style={{ marginBottom: '20px' }}>
                <img src={order.img} alt={order.product} className="col-3" />
                <h4>{order.product}</h4>
                <p><strong>Price:</strong> {order.price}</p>
              </div>
            ))
          ) : (
            <p>No orders available</p>
          )}
        </div>
        <Link to="/checkout">
          <button className="btn seemore position-absolute bottom-0 p-2">CheckOut</button>
        </Link>
      </Drawer>
    </>
  );
}

export default Header;
