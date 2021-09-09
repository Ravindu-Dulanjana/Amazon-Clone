import React from 'react'
import  './checkout.css'
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider'
import Subtotal from './Subtotal'


function Checkout() {
  const [{basket, user},dispatch] = useStateValue() ;

  return (
    <div className="checkout">
        <div className="checkout_left">
            {/* <img className="checkout_ad" src="" alt="" /> */}
            <div >
                <h4 className="checkout_user">Hello {user?.email}</h4>
                <h2 className="checkout_title">Your Shopping Basket</h2>
               

                {basket.map(item =>(
                  <CheckoutProduct
                  id ={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                  />
                ))}
                {/* BasketItem */}
                {/* BasketItem */}
                {/* BasketItem */}
                
            </div>

        </div>
        <div className="checkout_right">
           <Subtotal/>
        </div>
      
    </div>
  )
}

export default Checkout
