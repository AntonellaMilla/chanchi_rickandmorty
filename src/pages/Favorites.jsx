import React from 'react';
import { Link } from 'react-router-dom';
import CardList from '../components/CardList';
import useItemStore from '../store/useItemStore';


const Favorites = () => {
  const { favorites, removeFromFavorites } = useItemStore();

  const handleClearFavorites = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todos los favoritos?')) {
      favorites.forEach(fav => removeFromFavorites(fav.id));
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="container">
        <div className="text-center py-5">
          <h1> Mis Favoritos</h1>
          <div className="my-5">

            <h3 className="mt-3">No tienes favoritos aún</h3>
            <p className="text-muted">
              Agrega elementos a tus favoritos haciendo clic en el corazón
            </p>
            <Link to="/list" className="btn btn-primary">
              Explorar Elementos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col-md-6">
          <h1> Mis Favoritos</h1>
          <p className="text-muted">
            Tienes {favorites.length} elemento{favorites.length !== 1 ? 's' : ''} favorito{favorites.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="col-md-6 text-md-end">
          <button
            className="btn btn-outline-danger"
            onClick={handleClearFavorites}
          >
            Limpiar Favoritos
          </button>
        </div>
      </div>
      
      <CardList items={favorites} />
    </div>
  );
};

export default Favorites;