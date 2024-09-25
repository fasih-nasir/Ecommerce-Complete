import { Link } from "react-router-dom"
import { Button } from 'antd';
import { LoginOutlined, ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import { Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useState ,useContext} from "react";
import { MyContext } from "../context/theme";
// 
import { Modal,Drawer } from 'antd'; // AntD

// 
function Header(){
  const { orders } = useContext(MyContext);
  // console.log(orders.length);
  
  
  const [open, setOpen] = useState(false);
  // drwaer
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
// drwaer
  // scroll
  document.addEventListener("scroll",()=>{

    var nav=document.querySelector("header")
    if(window.scrollY > 300 ){
nav.classList.add("navdiv")
    }
else{
  nav.classList.remove("navdiv")
}
  })

  // scroll
  const itemCount = 0; 
   var user=false;
//    dropdon
const items = [
    {
      label: (
        <Link to={"auth/create"} className="link"  rel="noopener noreferrer" >
         Create Account
        </Link>
      ),
      key: '0',
    },
    {
      label: (
        <Link  to={"auth/login"} className="link" rel="noopener noreferrer" >
Login 
        </Link>
      ),
      key: '1',
    },
    {
      type: 'divider',
    },

  ];
//  dropdon
    return(
        <>
<header className=" py-3  container-fluid z-3">
  <div className="container d-flex flex-column flex-md-row align-items-center">
    <a href="#" className="d-flex align-items-center text-dark mb-3 mb-md-0 text-decoration-none">

      <span className="fs-4">Fn.</span>
    </a>
    <nav className="d-inline-flex mt-2 mt-md-0 mx-auto">
  <Link className="me-3 py-2 text-dark text-decoration-none" to="/">Home</Link>
  <Link className="me-3 py-2 text-dark text-decoration-none" to="/Product">Products</Link>
  <Link className="me-3 py-2 text-dark text-decoration-none" to="/contact">Contact-us</Link>
</nav>
    {/* <button className="btn btn-outline-secondary d-flex align-items-center"> */}
      {user ?( 
    <Button icon={<UserOutlined/>} >
      
    </Button>
          
    )
    :(
        <Dropdown
        menu={{
          items,
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
           <Button icon={<UserOutlined/>} ></Button>
            {/* <DownOutlined /> */}
          </Space>
        </a>
      </Dropdown>
    )
 
}
<Badge count={orders.length} showZero onClick={showDrawer}>
      <ShoppingOutlined className="px-2"  style={{ fontSize: '24px',  color: '#000000' }} />
    </Badge>
  </div>
</header>

{/* DRAWER */}
<Drawer
        title="Card Detail"
        placement="right" // Drawer opens only from the right
        width={500}
        onClose={onClose}
        open={open}
      
      >
        <div>
        {orders && orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={index} className="order-item" style={{ marginBottom: '20px' }}>
                <img src={order.img} alt={order.product} className="col-3" />
                <h4>{order.product}</h4>

                <p><strong>Price:</strong> {order.prie}</p>
              </div>
            ))
           
          ) : (
            <p>No orders available</p>
          )}



   

        </div>
        <Link to={"/checkout"}> 
        <button className="seemore position-absolute bottom-0 p-2">CheckOut</button>
        </Link>
      </Drawer>
{/* DRAWER */}
        </>
    )
}
export default Header