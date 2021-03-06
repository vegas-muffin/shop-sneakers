import React from "react";

import { Link } from "react-router-dom";
// import AppContext from "../context";
import { useCart } from "../hooks/useCart";

function Header(props) {
  const { totalPrice } = useCart();

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="headerLeft d-flex align-center">
          <img width="40" height="40" src="/img/logo.png" alt="logo" />

          <div className="headerInfo ">
            <h3 className="text-uppercase">React Skeakers</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>{" "}
      </Link>

      <ul className="d-flex">
        <li className="mr-30 cu-p" onClick={props.onClickCart}>
          <img src="/img/busket.svg" alt="busket" />{" "}
          <span> {totalPrice} руб.</span>
        </li>
        <li>
          <Link to="/favorites">
            <img src="/img/heart.svg" alt="bookmarker" />
          </Link>
        </li>

        <li>
          <Link to="/orders">
            <img src="/img/user.svg" alt="user" />{" "}
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
