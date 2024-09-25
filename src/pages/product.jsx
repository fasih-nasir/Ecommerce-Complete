import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Image } from 'antd'; 
// DROPDOWN

// DROPDOWN
function Product() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [cat, setCat] = useState([]);
    const [act, setAct] = useState();
    const [debouncedSearch, setDebouncedSearch] = useState("");

// DROPDOWN

// DROPDOWN
    // Fetch all products on initial load
    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => setProducts(data.products))
            .catch(error => console.error('Error:', error));
    }, []);

    // Debounce logic: Update `debouncedSearch` after a short delay
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 30); // 300ms delay (you can adjust this)

        // Cleanup timeout if user continues typing
        return () => {
            clearTimeout(handler);
        };
    }, [search]);

    // Fetch products based on the debounced search value
    useEffect(() => {
        if (debouncedSearch) {
            fetch(`https://dummyjson.com/products/search?q=${debouncedSearch}`)
                .then(res => res.json())
                .then(data => setProducts(data.products || []))
                .catch(error => console.error('Error:', error));
        }
    }, [debouncedSearch]);


        // Fetch products for the selected category
        fetch(`https://dummyjson.com/products/category-list`)
            .then(res => res.json())
            .then((data) => {
                setCat(data);  // Update products

                
            })
            .catch((error) => console.error('Error:', error));
  function selfn(e){
    setAct(e.target.value)
    fetch(`https://dummyjson.com/products/category/${e.target.value}`)
    .then(res => res.json())
    .then((data)=>{
        setProducts(data.products ||[])
        // console.log(products);
        
    });
    
  }
    return (
        <>
            <div className="container">
                <h2 className='py-3 '>ALL Products</h2>
                <div className="container px-0 d-flex my-3">
                    <div className="col-6">
                        <input 
                            type="text" 
                            onChange={(e) => setSearch(e.target.value)} 
                            value={search} 
                            placeholder="Search for products..." 
                            className="form-control"
                        />
                    </div>
                    <div className="col-6 d-flex justify-content-end">

    <select name="" id="" className='col-8' onChange={selfn}>
        <option value="all" >Categories</option>
{cat.map((e)=>(
<option value={e} key={e}>{e}</option>

)) }        
</select>


                    </div>
                </div>
                <div className="row ">
                    {products.map((product) => (
                        <div key={product.id} className="col-4 cards ">
                            <div className="card animate__animated animate__fadeIn">
                                <Image src={product.thumbnail} className='imageofcard' alt={product.title} />
                                <div className='sme1'>
                                    <h6 className='fw-semibold px-2'>Price: ${product.price}</h6>
                                    <span className='px-2'>{product.title.split(" ").slice(0, 3).join(" ")}</span>
                                </div>
                                <Link to={`/product/${product.id}`} target='_blank'>
                                <button className='seemore col-12'>See More</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            
            </div>
        </>
    );
}

export default Product;
