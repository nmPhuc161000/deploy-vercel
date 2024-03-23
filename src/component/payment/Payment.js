import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Payment.css';
// import { PayPalButton } from "react-paypal-button-v2";

const Payment = ({ item }) => {
  const { imageUrl, price } = useParams();
  console.log("Image URL:", imageUrl);
  console.log("Price:", price);

  const [imageSize, setImageSize] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  const handleButtonClick = () => {
    setShowPaymentInfo(true);
  };

  useEffect(() => {
    console.log("Payment component mounted");
    const loadImage = async () => {
      const img = new Image();
      img.onload = function () {
        setImageSize({ width: this.width, height: this.height });
        setImageLoaded(true);
      };
      img.src = decodeURIComponent(imageUrl);
    }
    

    loadImage();
  }, [imageUrl]);

  return (
    <div className='PaymentPage'>
      <div className="container-payment">
        <div className="center">
          {/* <hr style={{ border: '1px solid #ccc', margin: '0 15px' }} /> */}
          <h3>Choose Payment Method</h3>
          <div className='pay'>
            <button onClick={handleButtonClick}>
              <img src="https://i.ibb.co/KVF3mr1/paypal.png" alt="ZaloPay Logo" className="zalopay-logo" />
              <p className='name'>Paypal</p></button>
          </div>
          {showPaymentInfo && (
            <div className="card-details">
              <h4>You’ll be redirected to PayPal to complete this payment.</h4>
                {/* <PayPalButton
                  amount="0.01"
                  // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                  onSuccess={(details, data) => {
                    alert("Transaction completed by " + details.payer.name.given_name);
                    // OPTIONAL: Call your server to save the transaction
                    return fetch("/paypal-transaction-complete", {
                      method: "post",
                      body: JSON.stringify({
                        orderID: data.orderID
                      })
                    });
                  }}
                /> */}
            </div>
          )}
        </div>
        <div className="right">
          <div className='price-info'>
            <p>Summary</p>
          </div>
          {imageLoaded && (
            <div className="details-img">
              <img src={decodeURIComponent(imageUrl)} alt="Product" />
              <p>Image Size: {imageSize.width}x{imageSize.height}</p>
            </div>
          )}
          <div className='total'>
            <p>Total: </p>
            <div className='price'>
              <strong>${price}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;