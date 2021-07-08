import React from "react";

import Card from "../components/Card";
// import AppContext from "../context";

function Home({items,  searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite, onAddToCart, isLoading}) 

{

const renderItems = () => {
  const filtredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );
 return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
   <Card
     key={index}
     loading={isLoading}
     onFavorite={(obj) => onAddToFavorite(obj)}
     onPlus={(obj) => onAddToCart(obj)}
     {...item}
   />
 ))
 
}

 return ( 
 <div className="content p-40">
 <div className="d-flex align-center justify-between mb-40">
   <h1 className="mb-40">
     {searchValue
       ? `Поиск по запросу: "${searchValue}"`
       : "Все кроссовки"}
   </h1>

   <div className="search-block  d-flex">
     <img src="/img/search-icon.svg" alt="search" />
     {searchValue && (
       <img
         onClick={() => setSearchValue("")}
         className="clear cu-p"
         src="/img/btn-remove.svg"
         alt="clear"
       />
     )}
     <input
       onChange={onChangeSearchInput}
       value={searchValue}
       placeholder="Поиск..."
       type="text"
     />
   </div>
 </div>

 <div className="d-flex all-sneakers">
   {renderItems()}
 </div>
</div>) 
}

export default Home;
