import React from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";

function App() {
  const mockApiUrl = "https://60e02e2c6b689e001788c95d.mockapi.io";
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);

  const [searchValue, setSearchValue] = React.useState("");

  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  // fetch("https://60e02e2c6b689e001788c95d.mockapi.io/items")
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((json) => setItems(json));

  React.useEffect(() => {
    async function fetchData() {
      const itemsResponce = await axios.get(`${mockApiUrl}/items`);
      const cartResponce = await axios.get(`${mockApiUrl}/cart`);
      const favoritesResponce = await axios.get(`${mockApiUrl}/favorites`);

      setIsLoading(false);

      setCartItems(cartResponce.data);
      setFavorites(favoritesResponce.data);
      setItems(itemsResponce.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(`${mockApiUrl}/cart/${obj.id}`);
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        axios.post(`${mockApiUrl}/cart`, obj);
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert("Не удалось добавить карточку в Корзину");
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`${mockApiUrl}/favorites/${obj.id}`);
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(`${mockApiUrl}/favorites`, obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты");
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`${mockApiUrl}/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        onAddToFavorite,
        isItemAdded,
        setCartOpened,
        setCartItems,
      }}
    >
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
            isLoading={isLoading}
          ></Home>
        </Route>

        <Route path="/favorites" exact>
          <Favorites />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;
