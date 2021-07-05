import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

import React from "react";
import { Route } from "react-router-dom";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);

  const [searchValue, setSearchValue] = React.useState("");

  const [cartOpened, setCartOpened] = React.useState(false);

  // fetch("https://60e02e2c6b689e001788c95d.mockapi.io/items")
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((json) => setItems(json));

  React.useEffect(() => {
    async function fetchData() {
      const itemsResponce = await axios.get(
        "https://60e02e2c6b689e001788c95d.mockapi.io/items"
      );
      const cartResponce = await axios.get(
        "https://60e02e2c6b689e001788c95d.mockapi.io/cart"
      );
      const favoritesResponce = await axios.get(
        "https://60e02e2c6b689e001788c95d.mockapi.io/favorites"
      );      
      setCartItems(cartResponce.data);      
      setFavorites(favoritesResponce.data);
      setItems(itemsResponce.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(
          `https://60e02e2c6b689e001788c95d.mockapi.io/cart/${obj.id}`
        );
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        axios.post("https://60e02e2c6b689e001788c95d.mockapi.io/cart", obj);
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert("Не удалось добавить карточку в Корзину");
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://60e02e2c6b689e001788c95d.mockapi.io/favorites/${obj.id}`
        );
      } else {
        const { data } = await axios.post(
          "https://60e02e2c6b689e001788c95d.mockapi.io/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты");
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://60e02e2c6b689e001788c95d.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened ? (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      ) : null}

      <Header onClickCart={() => setCartOpened(true)} />

      <Route path="/" exact>
        <Home
          items={items}
          cartItems={cartItems}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
        ></Home>
      </Route>

      <Route path="/favorites" exact>
        <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
      </Route>
    </div>
  );
}

export default App;
