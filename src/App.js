import React from 'react';
import axios from 'axios'; //сохраняет товар в бэк корзина
import Card from './components/Card'; //1 шаг Берем нужны нам файл 
import Header from './components/Header';
import Drawer from './components/Drawer';



//функциия открытие корзины
function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([]) //Отображения каталога
  const [searchValue, setSearchValue] = React.useState('') //Поиск
  const [cartOpened, setCartOpened] = React.useState(false); //Открытие корзины и закрытие 

  //бэкенд карточки товара залит сюда https://mockapi.io/projects/637f70212f8f56e28e8c10fc 

React.useEffect(() => {
  axios.get('https://637f70212f8f56e28e8c10fb.mockapi.io/items')//каталог корзины весит в бэк 
  .then((res) => {
    setItems(res.data);
  });
  axios.get('https://637f70212f8f56e28e8c10fb.mockapi.io/items')//каталог корзины весит в бэк, то что будет в корзине сохранить
  .then((res) => {
    setCartItems(res.data);
  });
}, []);

//добавление товара в корзину 
const onAddToCart = (obj) => {
  axios.post('https://637f70212f8f56e28e8c10fb.mockapi.io/cart', obj);//каталог корзины весит в бэк 
  setCartItems((prev) => [...prev, obj]);
};

// Удалние из корзины 
const onRemoveItem = (id) => {
  // axios.delete(`https://637f70212f8f56e28e8c10fb.mockapi.io/cart ${id}`);//каталог корзины весит в бэк 
  setCartItems((prev) => prev.filter(item => item.id !== id));
};

const onChangeSearchInput = (event) => {
  setSearchValue(event.target.value);
}

  return (
  <div className="wrapper clear">
    {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove = {onRemoveItem} /> } 
    <Header onClickCart={() => setCartOpened(true)}/>  {/* Шапка сайта */}
    {/* Поиск */}
    <div className="content p-40">
     <div className="d-flex align-center justify-between mb-40">
     <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}</h1>
     <div className="search-block d-flex">
      <img src ='/img/search.svg' alt = 'search'/>
      {searchValue && <img onClick ={() => setSearchValue('')} 
      className="clear cu-p" src="/img/btn-remove.svg" alt="Clear" />}
      <input onChange = {onChangeSearchInput} value={searchValue} placeholder="Поиск ..." />
     </div>
     </div>

      <div className="d-flex flex-wrap">

        {/* 2 шаг указываем, где этот файл должен находится  */}
        {/* Делаем объект, чтобы передавать информацию, не дублируя ее */}
     
        {items.filter(item => item.title.includes(searchValue)).map((item, index) => ( //Функция поиск товара
          <Card
          //Key нужно для уникального значения 
          key={index}
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

