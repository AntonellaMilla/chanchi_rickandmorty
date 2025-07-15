import React from 'react';
import { Link } from 'react-router-dom';
import useItemStore from '../store/useItemStore';

const Card = ({ item }) => {
  const { addToFavorites, removeFromFavorites, favorites } = useItemStore();
  
  const isFavorite = favorites.some(fav => fav.id === item.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (isFavorite) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  return (
    <div className="col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm card-hover">
        <div className="position-relative">
          <img
            src={item.image}
            className="card-img-top"
            alt={item.name}
            style={{ height: '200px', objectFit: 'cover' }}
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/200x200?text=${encodeURIComponent(item.name)}`;
            }}
          />
          <button
            className={`btn btn-sm position-absolute top-0 end-0 m-2 ${
              isFavorite ? 'btn-danger' : 'btn-outline-light'
            }`}
            onClick={handleFavoriteClick}
            title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
        
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text text-muted">
            <small>Tipo: {item.types}</small>
          </p>
          <div className="mt-auto">
            <Link
              to={`/item/${item.id}`}
              className="btn btn-primary btn-sm"
              state={{ item }}
            >
              Ver Detalles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;