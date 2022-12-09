import React from 'react';
import ContentLoader from 'react-content-loader';

import AppContext from '../../context';

import styles from './Card.module.sass';

//3 шаг Создаем функцию, которая показывает часть кода
// Карточка товара
//props передают в объект данные страницы

function Card({ 
  id, 
  onFavorite, 
  onPlus, 
  title, 
  imageUrl,
  price, 
  favorited = false, 
  loading = false,
}) {

  const { isItemAdded } = React.useContext(AppContext);  
  const [isFavorite, setIsFavorite] = React.useState(favorited);

 //Добавить в корзину и убрать с корзины
  const onClickPlus = () => {
    onPlus({ id, title, imageUrl, price });
  };

  //функция кнопки favorite
  const onClickFavorite = () => {
    onFavorite({ id, title, imageUrl, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {
        loading ? <ContentLoader
          rtl
          speed={2}
          width={600}
          height={265}
          viewBox="0 0 600 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="39" y="167" rx="0" ry="0" width="1" height="0" />
          <rect x="447" y="16" rx="10" ry="10" width="150" height="155" />
          <rect x="447" y="183" rx="10" ry="10" width="150" height="15" />
          <rect x="494" y="206" rx="10" ry="10" width="100" height="15" />
          <rect x="514" y="234" rx="5" ry="5" width="80" height="27" />
          <rect x="447" y="227" rx="10" ry="10" width="40" height="35" />
        </ContentLoader>  : 

          //фрагмент  
          <>
            <div className={styles.favorite} onClick={onClickFavorite}>
              <img src={isFavorite ? 'img/liked.svg' : '/img/unliked.svg'} alt="unliked" />
            </div>
            <img width='100%' height={135} src={imageUrl} alt="sneakers" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column ">
                <span>Цена: </span>
                <b>{price} руб. </b>
              </div>
              <img className={styles.plus}
                // выделяем товар для корзины
                onClick={onClickPlus}
                src={isItemAdded(id) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
                alt="plus" 
                />
                
            </div>
          </>
      }

    </div>
  );
}

//4 шаг разрешает доступ к файлу Card
export default Card;
