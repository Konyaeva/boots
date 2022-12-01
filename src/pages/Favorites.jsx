import Card from "../components/Card";
function Favorites({items, onAddToFavorite}) {
    return (  
    <div className="content p-40">
     <div className="d-flex align-center justify-between mb-40">
     <h1>Мои закладки</h1>
    
     </div>

      <div className="d-flex flex-wrap">
      {items.map((item, index) => ( //Функция поиск товара
          <Card
          //Key нужно для уникального значения 
          key={index}
            favorited = {true}
            {...item} //находятся все свойства 
            onFavorite= {onAddToFavorite}
          /> 
          ))}
      </div>
    </div>

    );
}
export default Favorites;