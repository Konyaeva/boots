import React from 'react';
import styles from './Card.module.sass';

//3 шаг Создаем функцию, которая показывает часть кода
// Карточка товара
//props передают в объект данные страницы
function Card({onFavorute, onPlus, title, imageUrl, price}) {
  const [isAdded, setIsAdded ] = React.useState(false);

  const onClickPlus = () => {
    onPlus( title, imageUrl, price);
    setIsAdded(!isAdded);  //Добавить в корзину и убрать с корзины
  };

    return (
        <div className={styles.card}>
        <div className={styles.favorite} onClick={onFavorute}>
        <img src="img/heart.svg" alt="unliked"/>
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