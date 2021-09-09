import React from 'react'
import './header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import {auth} from './firebase'
import { signOut } from '@firebase/auth';

function Header() {

    const [{basket, user}, dispatch] = useStateValue();

    const handleAuth = () => {

        if(user){
            signOut(auth).then(() =>{
                alert('Sign Out Successful')
            })
        }

    }

  return (
    <div className="header">
        <Link to="/">
        <img className="header_logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="dad" />
        </Link>
        
        <div className="header_search">
            <input className="header_searchInput" type="text"  />
            <SearchIcon className="header_searchIcon"/>

        </div>

        <div className="header_nav">
            <Link to={!user && "/login"} style={{textDecoration:'none'}}>
            <div onClick={handleAuth} className="header_option">
                <span className="header_optionlineOne">Hello {user?.email}</span>
                <span className="header_optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
            </div>
            </Link>

            <div className="header_option">
                <span className="header_optionlineOne">return</span>
                <span className="header_optionLineTwo">& Orders</span>
            </div>

            <div className="header_option">
                <span className="header_optionlineOne">Your</span>
                <span className="header_optionLineTwo">Prime</span>
            </div>
            <Link to="/checkout">
                <div className="header_optionBasket">
                    
                    <ShoppingBasketIcon />
                    
                    
                    <span className="header_optionLineTwo header_busketCount">{basket.length}</span>
                </div>
            </Link>

        </div>
      
    </div>
  )
}

export default Header
