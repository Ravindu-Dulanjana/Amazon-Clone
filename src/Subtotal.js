import React from 'react'
import './subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from './StateProvider'
import { subTotal } from './reducer';
import { MenuItem } from '@material-ui/core';
import { useHistory } from 'react-router-dom';


function Subtotal() {
    const history = useHistory()
    const [{basket,dispatch}] = useStateValue();
    

  return (
    <div className="subtotal">
        <CurrencyFormat
            renderText={(value) =>(
                <>
                    <p>
                        Subtotal ({basket.length} items): <strong> 
                           {value}
                        </strong>
                    </p>
                    <small className="subtotal_gift">
                        <input type="checkbox" />This order contains a gift
                    </small>
                </>
            )}
            decimalScale={2}
            value={subTotal(basket)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}

        />

        <button onClick={ e => history.push('/payment')}>Process to Checkout</button>
       
    </div>
  )
}


export default Subtotal
