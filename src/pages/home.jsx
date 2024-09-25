import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"

import Image0 from '../assets/car1.png';
import Image1 from '../assets/car3.png';
import { Image } from 'antd'; 
function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product categories
    fetch('https://dummyjson.com/products/category/mobile-accessories')
      .then((res) => res.json())  // Make sure to return the parsed JSON
      .then((data) => {
        
        // console.log("Categories:", data.products); // This should now print the categories
        setProducts( data.products.slice(0,8)); // Store categories in state
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <>
      {/* Carousel */}
      <div className="container-fluid sec1">
      <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval={5000}>
          <section className="text-dark body-font">
      <div className="container mx-auto d-flex py-5 flex-md-row justify-content-around ">
        <div className="col-md-6 animate__animated animate__fadeInUp d-flex flex-column align-items-md-start justify-content-center align-items-center text-center text-md-start mb-5 mb-md-0">
          <h5 className=" mb-2 fw-medium text-dark">
            SOUNDBOX
          </h5>
          <p className="display-4 px-0 mx-0 mb-4 fw-bolder text-dark">
            Bluetooth Speaker
          </p>
          <p className="mb-4 lead">
            New Modern Stylist Fashionable Men's Wearholder bag maxcan weather holder.
          </p>
          <div className="d-flex flex-col align-items-start   justify-content-start">
            <button className="btn1 py-2  ">
              EXPLORE NOW
            </button>
          </div>
        </div>
        <div className="col-md-6 animate__animated animate__fadeInDown col-12 d-flex justify-content-end">
          <img className="img-fluid rounded i1" alt="hero" src={Image0} />
     
        </div>
      </div>
    </section>
          </div>
          <div className="carousel-item active" data-bs-interval={5000}>
          <section className="text-dark body-font">
      <div className="container mx-auto d-flex py-5 flex-md-row justify-content-around ">
        <div className="col-md-6 animate__animated animate__fadeInUp d-flex flex-column align-items-md-start justify-content-center align-items-center text-center text-md-start mb-5 mb-md-0">
          <h5 className=" mb-2 fw-medium text-dark">
            SOUNDBOX
          </h5>
          <p className="display-4 px-0 mx-0 mb-4 fw-bolder text-dark">
            Bluetooth Speaker
          </p>
          <p className="mb-4 lead">
            New Modern Stylist Fashionable Men's Wearholder bag maxcan weather holder.
          </p>
          <div className="d-flex flex-col align-items-start   justify-content-start">
            <button className="btn1 py-2  ">
              EXPLORE NOW
            </button>
          </div>
        </div>
        <div className="col-md-6 animate__animated animate__fadeInDown col-12 d-flex justify-content-end">
          <img className="img-fluid rounded i1" alt="hero" src={Image1} />
     
        </div>
      </div>
    </section>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          {/* <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span> */}
        </a>
        <a
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          {/* <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span> */}
        </a>
      </div>
      </div>
      {/* Carousel End */}

      {/* Features Section (Product Cards) */}
      <div className="container">
      <h2>Featured Products</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-3 cards">
            <div className="card">
              <Image src={product.thumbnail} className='imageofcard' alt={product.title} />
            <div className='sme1'>
              <h6 className='fw-semibold px-2'>Price: ${product.price}</h6>
              <span className='px-2'> {product.title.split(" ").slice(0,3).join("  ")}</span>
              </div>
             
              <Link to={`/product/${product.id}`} target='_blank' >
              <button className='seemore col-12'  >
              See More
              
                </button>
                </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
      {/* Features End */}
    </>
  );
}

export default Home;
