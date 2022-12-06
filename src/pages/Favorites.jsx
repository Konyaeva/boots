import React from "react";
import Card from "../components/Card";
import { AppContext } from '../App';

function Favorites({ onAddToFavorite }) {
  const state = React.useContext(AppContext);

  
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>

      </div>

      <div className="d-flex flex-wrap">
        {[].map((item, index) => ( //Функция поиск товара
          <Card
            //Key нужно для уникального значения 
            key={index}
            favorited={true}
            {...item} //находятся все свойства 
            onFavorite={onAddToFavorite}
          />
        ))}
      </div>
    </div>

  );
}
export default Favorites;