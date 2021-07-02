import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

const arr = [
  {
    title: "Мужские Кроссовки Nike Blazer Mid Suede",
    price: 12999,
    imageUrl: "/img/sneakers/img-1.jpg",
  },
  {
    title: "Мужские Кроссовки Nike Air Max 270",
    price: 13990,
    imageUrl: "/img/sneakers/img-2.jpg",
  },
  {
    title: "Мужские Кроссовки Nike Blazer Mid Suede",
    price: 8999,
    imageUrl: "/img/sneakers/img-3.jpg",
  },
  {
    title: "Кроссовки Puma X Aka Boku Future Rider",
    price: 18590,
    imageUrl: "/img/sneakers/img-4.jpg",
  },
  {
    title: "Мужские Кроссовки Under Armour Curry 8",
    price: 14690,
    imageUrl: "/img/sneakers/img-5.jpg",
  },
  {
    title: "Мужские Кроссовки Nike Kyrie 7",
    price: 23990,
    imageUrl: "/img/sneakers/img-6.jpg",
  },
  {
    title: "Мужские Кроссовки Jordan Air Jordan 11",
    price: 15990,
    imageUrl: "/img/sneakers/img-7.jpg",
  },
  {
    title: "Мужские Кроссовки Nike LeBron XVIII",
    price: 19990,
    imageUrl: "/img/sneakers/img-8.jpg",
  },
  {
    title: "Мужские Кроссовки Nike Lebron XVIII Low",
    price: 17990,
    imageUrl: "/img/sneakers/img-9.jpg",
  },
  {
    title: "Мужские Кроссовки Nike Air Max 270",
    price: 17990,
    imageUrl: "/img/sneakers/img-10.jpg",
  },
  {
    title: "Мужские Кроссовки Nike Air Max 270",
    price: 5990,
    imageUrl: "/img/sneakers/img-11.jpg",
  },
  {
    title: "Мужские Кроссовки Nike Air Max 270",
    price: 44990,
    imageUrl: "/img/sneakers/img-12.jpg",
  },
];

function App() {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1 className="mb-40">Все кроссовки</h1>

          <div className="search-block  d-flex">
            <img src="/img/search-icon.svg" alt="search" />
            <input placeholder="Поиск..." type="text" />
          </div>
        </div>

        <div className="d-flex all-sneakers">
          {arr.map((obj) => (
            <Card
              title={obj.title}
              price={obj.price}
              imageUrl={obj.imageUrl}
              onClick={() => console.log(obj)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
