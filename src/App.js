import React from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import axios from 'axios'; //сохраняет товар в бэк корзина
import Header from './components/Header';
import Drawer from './components/Card/Drawer';
import AppContext from './context';


import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

//функциия открытие корзины
function App() {
  const [items, setItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]); //каталог избранного
  const [cartItems, setCartItems] = React.useState([]); //Отображения каталога
  const [searchValue, setSearchValue] = React.useState(''); //Поиск
  const [cartOpened, setCartOpened] = React.useState(false); //Открытие корзины и закрытие 
  const [isLoading, setIsLoading] = React.useState(true); //при загрузки страницы фейк карты

  //бэкенд карточки товара залит сюда https://mockapi.io/projects/637f70212f8f56e28e8c10fc 

  React.useEffect(() => {
  async function fetchData() {
    try {
      const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
   await axios.get('https://637f70212f8f56e28e8c10fb.mockapi.io/cart'),//каталог корзины весит в бэк, то что будет в корзине сохранить
   await axios.get('https://637f70212f8f56e28e8c10fb.mockapi.io/favorites'),//каталог корзины весит в бэк, то что будет в корзине сохранить
   await axios.get('https://637f70212f8f56e28e8c10fb.mockapi.io/items'),//каталог корзины весит в бэк 
    ]);

  setIsLoading(false); //заканчивает загрузку фейк карточек
  setCartItems(cartResponse.data);
  setFavorites(favoritesResponse.data);
  setItems(itemsResponse.data);
} catch (error) {
  alert('Ошибка при запросе данных ;(');
  console.error(error);
}
  };

fetchData(); 
  }, []);

  //добавление товара в корзину 
  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) == Number(obj.id));
    if (findItem) {
      setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
      await axios.delete(`https://637f70212f8f56e28e8c10fb.mockapi.io/cart/${findItem.id}`);
    } else {
      setCartItems((prev) => [...prev, obj]);
      const {data} = await axios.post('https://637f70212f8f56e28e8c10fb.mockapi.io/cart', obj);//каталог корзины весит в бэк 
      setCartItems((prev) => prev.map(item => {
        if ( item.parentId === data.parentId ) {
          return {
            ...item,
            id: data.id
          };
        }
        return item;
      }));
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
      console.error(error);
  }
    };

  // Удалние из корзины 
  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://637f70212f8f56e28e8c10fb.mockapi.io/cart/${id}`);//каталог корзины весит в бэк 
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.error(error);
    }
  };

  //Добавление товара в избранное
  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id ) === Number(obj.id))) {
        axios.delete(`https://637f70212f8f56e28e8c10fb.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
        //запрос на удаление похоже id
      } else {
        const { data } = await axios.post('https://637f70212f8f56e28e8c10fb.mockapi.io/favorites', obj);//каталог корзины весит в бэк 
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в закладки');
      console.error(error);
    }
  };

//Проверяет корзину на наличие товара 
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

const isItemAdded = (id) => {
  return cartItems.some((obj) => Number(obj.parentId) === Number(id));
}

  return (
    //Все мое приложение должен знать AppContex
    <AppContext.Provider value={{items, 
    cartItems, 
    favorites, 
    isItemAdded, 
    onAddToFavorite, 
    setCartOpened, 
    setCartItems,
    onAddToFavorite,
    onAddToCart,
    }}>
      <div className="wrapper clear">
        <Drawer
        items={cartItems}
        onClose={() => setCartOpened(false)}
        onRemove={onRemoveItem}
        opened = {cartOpened}
      />
      <Header onClickCart={() => setCartOpened(true)} />
      <Routes>
        <Route path="/" element={<Home
          items={items}
          cartItems={cartItems}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart} 
          isLoading={isLoading}
          />}
        />
        <Route path="/favorites" element={
          <Favorites 
          />}
        />
         <Route path="/orders" element={
          <Orders 
          />}
        />
      </Routes>
    </div>
    </AppContext.Provider>
  );
}

export default App;

