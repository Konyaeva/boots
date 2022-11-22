import Card from './components/Card'; //1 шаг Берем нужны нам файл 
import Header from './components/Header';
import Drawer from './components/Drawer';


function App() {
  return (
  <div className="wrapper clear">
    <Drawer /> {/* Корзина */}
    <Header />  {/* Шапка сайта */}
        
    {/* Поиск */}
    <div className="content p-40">
     <div className="d-flex align-center justify-between mb-40">
     <h1>Все кроссовки</h1>
     <div className="search-block d-flex">
      <img src ='/img/search.svg' alt = 'search'/>
      <input placeholder="Поиск ..." />
     </div>
     </div>

      <div className="d-flex">
        {/* 2 шаг указываем, где этот файл должен находится  */}
      <Card /> {/* Карточки товаров */}
      <Card />
      <Card />
      
      </div>
    </div>
  </div>
  );
}

export default App;
