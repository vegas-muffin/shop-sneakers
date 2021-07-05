import Card from "../components/Card";

function Home({items, cartItems, searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite, onAddToCart}) {
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
   {items
     .filter((item) =>
       item.title.toLowerCase().includes(searchValue.toLowerCase())
     )
     .map((item, index) => (
       <Card
         key={index}
         id={item.id}
         title={item.title}
         price={item.price}
         imageUrl={item.imageUrl}
         onFavorite={(obj) => onAddToFavorite(obj)}
         onPlus={(obj) => onAddToCart(obj)}
         added={cartItems.some(obj=>Number(obj.id)===Number(item.id))}
         loading={true}
       />
     ))}
 </div>
</div>) 
}

export default Home;
