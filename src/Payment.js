import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "./axios";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import "./payment.css";
import { subTotal } from "./reducer";
import { useStateValue } from "./StateProvider";
import { useHistory } from 'react-router-dom';

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe()
  const elements = useElements()
  const history = useHistory()

  const [succeeded, setsucceeded] = useState(false)
  const [processing, setprocessing] = useState("")
  const [error, seterror] = useState(null)
  const [disabled, setdisabled] = useState(true)
  const [clientSecret, setclientSecret] = useState(true)


  useEffect(()=>{

    const getClientSecret = async () => {

      const response = await axios({
        mathod: 'POST',
        url: `/payments/create?total=${subTotal(basket) * 100}`
      });
      setclientSecret(response.data.clientSecret)


    }
    getClientSecret();  

  },[basket])

  console.log('the secret', clientSecret)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setprocessing(true)

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method:{
        card: elements.getElement(CardElement)
      }
    }).then(( { paymentIntent }) =>{
      setsucceeded(true)
      seterror(null)
      setprocessing(false)

      history.replace('/orders')
    })
  }


  const handleChange = e => {
    setdisabled(e.empty)
    seterror(e.error ? e.error.massage : "")
  }

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout ( <Link to="/checkout"> {basket?.length} items </Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>delivary address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
         
        </div>
        <div className="payment__section">
        <div className="payment__title">
            <h3>Review Item and Delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
            <div className="payment__title">
              <h3>Payment Method</h3>
             </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange}/>
              <div className="payment__priceContainer">
              <CurrencyFormat
                  renderText={(value) =>(
                     <h3>Order Total : {value}</h3> 
                     
                  )}
                  decimalScale={2}
                  value={subTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}

              />
              <button disabled={processing || disabled || succeeded}>
                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
              </button>
              </div>

              {error && <div>{error}</div> }
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
