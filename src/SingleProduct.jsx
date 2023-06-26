import React, { useEffect, useState } from 'react';

const SingleProduct = ({ product, setUpdated, updated, discountStart, setDiscountStart }) => {

  const [countdown, setCountdown] = useState(60*60); // 60 minutes in seconds

  useEffect(() => {
    if (discountStart) {
      fetch(`http://localhost:5000/products/${product._id}`, {
        method: "PUT",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          price: product.price,
          discount: 30
        })
      }
      )
        .then(res => res.json())
        .then(data => {
          console.log()
          if (data.modifiedCount > 0) {
            setDiscountStart(true)
            setUpdated(!updated)
          }
        })
    }
  }, [discountStart])

  useEffect(() => {
    if (discountStart) {
      const intervalId = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
        if (countdown <= 0) {
          clearInterval(intervalId);
          fetch(`http://localhost:5000/products/${product._id}`, {
            method: "PUT",
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              price: product.price,
              discount: 0
            })
          }
          )
            .then(res => res.json())
            .then(data => {
              console.log(data)
              if (data.modifiedCount > 0) {
                setDiscountStart(false)
                setUpdated(!updated)
              }
            })




        }
      }, 1000);

    }
  }, [updated, discountStart])


  // Format the countdown time to display in mm:ss format
  const formatCountdown = () => {
    const minutes = Math.floor(countdown / 60).toString().padStart(2, '0');
    const seconds = (countdown % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };


  return (
    <div>
      <div className="card h-full glass bg-red-100 shadow-xl">
        <figure><img src={product.productPhoto} alt="Shoes" /></figure>
        <div className="card-body">
          <div className=" gap-4">
            <button className="btn text-center my-auto">
              Exclusive Offer
              <div className="badge badge-secondary">+{product.discount}</div>
            </button>
            <button className="btn btn-lg btn-outline text-xs flex items-center my-auto px-4">30% discount for every correct answer</button>
          </div>
          {discountStart && <div className="text-center mt-8">
            <h3> {formatCountdown()}</h3>
          </div>}
          <p className="text-semibold text-secondary">Price: ${product.discount > 0 ? <span classNam="text-secondary">{product.discountedPrice}  <del className="block">{product.price}</del> </span> : product.price}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-secondary mx-auto">Buy</button>
          </div>
        </div>
      </div>
    </div>
  );
};