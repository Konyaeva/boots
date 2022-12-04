import React from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import axios from 'axios'; //сохраняет товар в бэк корзина
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';



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
  }

fetchData(); 
  }, []);

  //добавление товара в корзину 
  const onAddToCart = (obj) => {
    if (cartItems.find((item) => Number(item.id) == Number(obj.id))) {
      axios.delete(`https://637f70212f8f56e28e8c10fb.mockapi.io/cart/${obj.id}`);
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(item.id)));
    } else {
      axios.post('https://637f70212f8f56e28e8c10fb.mockapi.io/cart', obj);//каталог корзины весит в бэк 
      setCartItems((prev) => [...prev, obj]);
    }
  };

  // Удалние из корзины 
  const onRemoveItem = (id) => {
    axios.delete(`https://637f70212f8f56e28e8c10fb.mockapi.io/cart/${id}`);//каталог корзины весит в бэк 
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  //Добавление товара в избранное
  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id == obj.id)) {
        axios.delete(`https://637f70212f8f56e28e8c10fb.mockapi.io/favorites/${obj.id}`);//запрос на удаление похоже id
        // setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post('https://637f70212f8f56e28e8c10fb.mockapi.io/favorites', obj);//каталог корзины весит в бэк 
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в закладки')
    }
  };


  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer
        items={cartItems}
        onClose={() => setCartOpened(false)}
        onRemove={onRemoveItem}
      />}
      <Header onClickCart={() => setCartOpened(true)} />
      <Routes>
        <Route path="/" element={<Home
          items={items}
          cartItems={cartItems}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart} />}
          isLoading={isLoading}
        />
        <Route path="/favorites" element={
          <Favorites
            items={favorites}
            onAddToFavorite={onAddToFavorite}
          />}
        />
      </Routes>
    </div>
  );
}

export default App;

