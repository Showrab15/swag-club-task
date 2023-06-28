import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SingleProduct = ({ product, discountStart, setDiscountStart }) => {
  const discountTimeSec = JSON.parse(localStorage.getItem('DiscountTimeSec')) || 60 * 60;
  const [countdown, setCountdown] = useState(discountTimeSec);
  const [isDiscountStarted, setIsDiscountStarted] = useState(false)
  const [discountedPrice, setDiscountedPrice] = useState(0)

  useEffect(() => {
    const isDiscount = JSON.parse(localStorage.getItem('Discount'))
    setIsDiscountStarted(isDiscount)
    if (isDiscount) {
      const discountAmount = product.price * (30 / 100)
      setDiscountedPrice(product.price - discountAmount)
      const intervalId = setInterval(() => {
        setCountdown(prevCountdown => {
          const newCountdown = prevCountdown - 1;
          localStorage.setItem('DiscountTimeSec', JSON.stringify(newCountdown));
          return newCountdown;
        });
        if (countdown <= 0) {
          localStorage.setItem('Discount', false);
          setDiscountStart(false);
          clearInterval(intervalId);
        }
      }, 1000);
    }
  }, [discountStart])


  // Format the countdown time to display in mm:ss format
  const formatCountdown = () => {
    const minutes = Math.floor(countdown / 60).toString().padStart(2, '0');
    const seconds = (countdown % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };


  return (
    <div>
      <div className="card h-full glass bg-red-100 shadow-xl">
        <figure><img className='h-full w-full' src={product.productPhoto} alt="Shoes" /></figure>
        <div className="card-body">
          {
            (discountedPrice > 0) && <div className=" gap-4">
              <button className="btn text-center my-auto">
                Exclusive Offer
                <div className="badge badge-secondary">+{30}</div>
              </button>
              <button className="btn btn-lg btn-outline text-xs flex items-center my-auto px-4">30% discount for every correct answer</button>
            </div>
          }
          {isDiscountStarted && <div className="text-center mt-8">
            <h3> {formatCountdown()}</h3>
          </div>}
          <p className="text-semibold text-secondary">Price: {discountedPrice > 0 ? <span className="text-secondary">{discountedPrice}  <del className="block">{product.price}</del> </span> : <span>{product.price}</span>}</p>
          <div className="card-actions justify-end">
         <Link  className="btn btn-secondary mx-auto" to={product.affilate}>Buy</Link> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct
