import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import useItemStore from '../store/useItemStore';
import { CURRENT_API } from '../config/apiConfig';

const ItemDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { addToFavorites, removeFromFavorites, favorites } = useItemStore();
  
  const item = location.state?.item || useItemStore(state => 
    state.items.find(item => item.id === parseInt(id))
  );

  if (!item) {
    return (
      <div className="container">
        <div className="text-center py-5">
          <h2>Personaje no encontrado</h2>
          <p className="text-muted">El personaje que buscas no existe o no está disponible.</p>
          <Link to="/list" className="btn btn-primary">
            Volver a la Lista
          </Link>
        </div>
      </div>
    );
  }

  const isFavorite = favorites.some(fav => fav.id === item.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  const getApiDisplayName = (apiKey) => {
    const displayNames = {

      rickAndMorty: 'Rick & Morty',

    };
    return displayNames[apiKey] || apiKey;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src={item.image}
            alt={item.name}
            className="img-fluid rounded shadow"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/400x400?text=${encodeURIComponent(item.name)}`;
            }}
          />
        </div>
        <div className="col-md-6">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Inicio</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/list">Lista</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {item.name}
              </li>
            </ol>
          </nav>

          <h1 className="display-4 mb-3">{item.name}</h1>
          
          <div className="mb-4">
            <span className="badge bg-secondary fs-6 me-2">
              Tipo: {item.types}
            </span>
            <span className="badge bg-info fs-6">
              ID: {item.id}
            </span>
          </div>

          <div className="mb-4">
            <h5>Descripción</h5>
            <p className="text-muted">
              Este es un elemento de tipo {item.types} con ID {item.id}. 
              La información mostrada proviene de <strong>{getApiDisplayName(CURRENT_API)}</strong> y 
              se actualiza dinámicamente.
            </p>
          </div>

          <div className="d-flex gap-2 mb-4">
            <button
              className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`}
              onClick={handleFavoriteClick}
            >
              {isFavorite ? '❤️ Quitar de Favoritos' : '🤍 Agregar a Favoritos'}
            </button>
            <Link to="/list" className="btn btn-outline-primary">
              Volver a la Lista
            </Link>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;