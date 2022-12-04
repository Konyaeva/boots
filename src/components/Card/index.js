import React from 'react';
import styles from './Card.module.sass';

//3 шаг Создаем функцию, которая показывает часть кода
// Карточка товара
//props передают в объект данные страницы
function Card({ id, onFavorite, onPlus, title, imageUrl, price, favorited = false }) {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus({ title, imageUrl, price });
    setIsAdded(!isAdded);  //Добавить в корзину и убрать с корзины
  };

  //функция кнопки favorite
  const onClickFavorite = () => {
    onFavorite({ id, title, imageUrl, price });
    setIsFavorite(!isFavorite);
  }
  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onClickFavorite}>
        <img src={isFavorite ? 'img/liked.svg' : '/img/unliked.svg'} alt="unliked" />
      </div>
      <img width={133} height={112} src={imageUrl} alt="sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column ">
          <span>Цена: </span>
          <b>{price} руб. </b>
        </div>
        <img className={styles.plus}
          // выделяем товар для корзины
          onClick={onClickPlus}
          src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
          alt="plus" />
      </div>
    </div>
  );
}

//4 шаг разрешает доступ к файлу Card
export default Card;
