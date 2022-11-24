import React from 'react';
import Card from './components/Card'; //1 шаг Берем нужны нам файл 
import Header from './components/Header';
import Drawer from './components/Drawer';



//функциия открытие корзины
function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [cartOpened, setCartOpened] = React.useState(false);

  //бэкенд карточки товара залит сюда https://mockapi.io/projects/637f70212f8f56e28e8c10fc 

React.useEffect(() => {
  fetch('https://637f70212f8f56e28e8c10fb.mockapi.io/items')
  .then((res) => {
    return res.json();
  })
  .then((json) => {
    setItems(json);
  });
}, []);

//добавление товара в корзину 
const onAddToCart = (obj) => {
  setCartItems(prev => [...prev, obj]);
};


  return (
  <div className="wrapper clear">
    {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false) } /> } 
    <Header onClickCart={() => setCartOpened(true)}/>  {/* Шапка сайта */}
    {/* Поиск */}
    <div className="content p-40">
     <div className="d-flex align-center justify-between mb-40">
     <h1>Все кроссовки</h1>
     <div className="search-block d-flex">
      <img src ='/img/search.svg' alt = 'search'/>
      <input placeholder="Поиск ..." />
     </div>
     </div>

      <div className="d-flex flex-wrap">

        {/* 2 шаг указываем, где этот файл должен находится  */}
        {/* Делаем объект, чтобы передавать информацию, не дублируя ее */}
     
        {items.map((item) => (
          <Card
            title= {item.title}
            price= {item.price} 
            imageUrl = {item.imageUrl}
            onFavorute = {() => console.log('Добавили в закладки')}
            onPlus={(obj) => onAddToCart(item)}
          /> 
        ))}
       
      </div>
    </div>
  </div>
  );
}

export default App;

