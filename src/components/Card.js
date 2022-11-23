//3 шаг Создаем функцию, которая показывает часть кода
// Карточка товара
function Card(props) {
    return (
        <div className="card">
        <div className="favorite">
        <img src="img/heart.svg" alt="unliked"/>
        </div>
        <img width={133} height={112} src={props.imageUrl} alt="sneakers" />
        <h5>{props.title}</h5>
        <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column ">
          <span>Цена: </span>
          <b>{props.price} руб. </b>
          </div>
          <button className="button">
            <img width={11} height={11} src="/img/plus.svg" alt="plus" />
          </button>
        </div>
      </div>
    );
}

//4 шаг разрешает доступ к файлу Card
export default Card;
