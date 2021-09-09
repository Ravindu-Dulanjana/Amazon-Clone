import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "@firebase/auth";
import { useStateValue } from "./StateProvider";
import  Payment  from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


const promise = loadStripe('pk_test_51JXbR3SITVU9pKUDAXo63FN6prC3B5MWIlgH4JpGTlYOYNADAAFfYcfWXsK2X2RpV4t7iqX1zIN2ASMTRCefDNMT009tdSJgL6')



function App() {
  
  const[{},dispatch] = useStateValue();

  useEffect(() => {

    onAuthStateChanged(auth, (user) =>{
      console.log('THE USER IS>>>',user)

      if(user) {
          dispatch({
            type: 'SET_USER',
            user:user
          })
      }
      else{
        dispatch({
          type:'SET_USER',
          user:null
        })
      }

    })


  }, [])

  return (
    <Router>
      <div className="app">
        
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
            <Payment/>
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
