import useFecth from "../../hooks/useFetch";
import "./featuredProperties.css";
import defaultImg from '../../assets/default.png'

const FeaturedProperties = () => {
  const { data, loading, error } = useFecth('http://localhost:5000/hotels?featured=true&limit=4')

  
  if (loading) return <>Loading...</>
  return (
    <div className="fp">
      {data.map((item, i) => (
        <div className="fpItem" key={i}>
          <img
            src={item.photos[0] || defaultImg}
            alt=""
            className="fpImg"
          />
          <span className="fpName">{item.name}</span>
          <span className="fpCity">{item.city}</span>
          <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
          {item.rating && <div className="fpRating">
            <button>{item.rating}</button>
            <span>Excellent</span>
          </div>}
        </div>
      ))}
    </div>
  );
};

export default FeaturedProperties;
