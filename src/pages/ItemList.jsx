import React, { useEffect, useState } from 'react';
import CardList from '../components/CardList';
import useItemStore from '../store/useItemStore';
import { CURRENT_API } from '../config/apiConfig';

const ItemList = () => {
  const {
    items,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    fetchItems,
    getFilteredItems
  } = useItemStore();

  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(localSearchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localSearchTerm, setSearchTerm]);

  const filteredItems = getFilteredItems();

  const getApiDisplayName = (apiKey) => {
    const displayNames = {

      rickAndMorty: 'Rick & Morty',

    };
    return displayNames[apiKey] || apiKey;
  };

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col-md-8">
          <h1>Lista de Elementos</h1>
          <p className="text-muted">
            Explorando contenido desde: <strong>{getApiDisplayName(CURRENT_API)}</strong>
          </p>
        </div>
        <div className="col-md-4">
          <label htmlFor="searchInput" className="form-label">
            Buscar elementos:
          </label>
          <input
            id="searchInput"
            type="text"
            className="form-control"
            placeholder="Buscar por nombre..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center">
          <div className="loading-spinner"></div>
          <p>Cargando elementos...</p>
        </div>
      ) : (
        <>
          <div className="mb-3">
            <small className="text-muted">
              Mostrando {filteredItems.length} de {items.length} personajes
              {searchTerm && ` para "${searchTerm}"`}
            </small>
          </div>
          <CardList items={filteredItems} />
        </>
      )}
    </div>
  );
};

export default ItemList;