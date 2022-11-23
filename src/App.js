import Card from './components/Card'; //1 шаг Берем нужны нам файл 
import Header from './components/Header';
import Drawer from './components/Drawer';

const arr = [
  {
    title: 'Мужские Кроссовки Nike Blazer Mid Suede', 
    price: 12999, 
    imageUrl:'/img/sneakers/1.jpg', 
  },
  {
  title: 'Мужские Кроссовки Nike Blazer Mid Suede', 
  price: 12999, 
  imageUrl:'/img/sneakers/2.jpg', 
},
  {
  title: 'Мужские Кроссовки Nike Air Max 270', 
  price: 15600, 
  imageUrl:'/img/sneakers/3.jpg', 
},
  {
  title: 'Мужские Кроссовки Puma X Aka Boku Future Rider', 
  price: 8499, 
  imageUrl:'/img/sneakers/4.jpg', 
  }, 
  {
    title: 'Мужские Кроссовки Puma X Aka Boku Future Rider', 
    price: 8499, 
    imageUrl:'/img/sneakers/5.jpg', 
    }, 
];

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
        {/* Делаем объект, чтобы передавать информацию, не дублируя ее */}
     
        {arr.map((obj) => (
          <Card
            title= {obj.title}
            price= {obj.price} 
            imageUrl = {obj.imageUrl}
          /> 
        ))}
       
      </div>
    </div>
  </div>
  );
}

export default App;
