
import React from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../hooks/useCart';


function Header(props) {
    const { totalPrice } = useCart();


    return (
        <div>
        <header className="d-flex justify-between align-center p-40">
            <Link to='/'>
                <div className="d-flex align-center">

                    <img width={40} height={40} src="/img/logo.png" alt="logo" />
                    <div>
                        <h3 className="text-uppercase"> React Sneakers</h3>
                        <p className="opacity-5">Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className="d-flex">
                <li onClick={props.onClickCart} className="mr-30 cu-p">
                    <img width={18} height={18} src="/img/cart.svg" alt="Корзина" />
                    <span>{totalPrice} руб.</span>
                </li>

                <li className="mr-10 cu-p">
                    <Link to='/favorites'>
                        <img width={18} height={18} src="/img/heart.svg" alt="Закладки" />
                    </Link>
                </li>

                <Link to='/orders'>
                <li>
                    <img width={18} height={18} src="/img/user.svg" alt="Пользователь" />
                </li>
                    </Link>
            </ul>   
        </header>
        <div className='frog'>
        <h1 className='smith'>Stan Smith,<p className='forever'>Forever!</p></h1>
            <img src="/img/frog.svg" alt="Frog" />
           
            </div>
        </div>
    );
}
export default Header;