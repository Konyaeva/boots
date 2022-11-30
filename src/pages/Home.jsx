import Card from '../components/Card'; 

function Home({
    items,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToCart,
    onAddToFavorite
}) {
    return (  
    <div className="content p-40">
     <div className="d-flex align-center justify-between mb-40">
     <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}</h1>
     <div className="search-block d-flex">
      <img src ='/img/search.svg' alt = 'search'/>
      {searchValue && <img onClick ={() => setSearchValue('')} 
      className="clear cu-p" src="/img/btn-remove.svg" alt="Clear" />}
      <input onChange = {onChangeSearchInput} value={searchValue} placeholder="Поиск ..." />
     </div>
     </div>

      <div className="d-flex flex-wrap">

        {/* 2 шаг указываем, где этот файл должен находится  */}
        {/* Делаем объект, чтобы передавать информацию, не дублируя ее */}
     
        {items.filter((item) => item.title.includes(searchValue)).map((item, index) => ( //Функция поиск товара
          <Card
          //Key нужно для уникального значения 
          key={index}
            title= {item.title}
            price= {item.price} 
            imageUrl = {item.imageUrl}
            onFavorite = {(obj) => onAddToFavorite(obj)}
            onPlus={(obj) => onAddToCart(obj)}
          /> 
          ))}
      </div>
    </div>

    );
}
export default Home;