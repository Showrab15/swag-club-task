import React, { useEffect, useState } from 'react';
import SingleProduct from './SingleProduct';

const Product = ({discountStart, setDiscountStart}) => {
  const [products, setProducts] = useState([]);
  
const [updated, setUpdated] = useState(false)
  useEffect(() => {
    fetch('https://swag-club-second-task-server.vercel.app/products')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProducts(data);
      });
  }, [updated]);


  return (
    <div>
      <h2 className="text-center font-bold italic mt-8 text-4xl">Buy Your Favourite Products</h2>
      <div className="grid mt-8 gap-4 grid-cols-1 md:grid-cols-3">
        {products.map(product => (
          <SingleProduct key={product._id} 
          discountStart={discountStart}
          setDiscountStart={setDiscountStart}
          updated={updated}
          setUpdated={setUpdated}
         
          product={product}></SingleProduct>
        ))}
      </div>
    
    </div>
  );
};

export default Product;
