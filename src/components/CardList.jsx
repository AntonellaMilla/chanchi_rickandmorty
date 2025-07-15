import React from 'react';
import Card from './Card';

const CardList = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-5">
        <h3>No se encontraron elementos</h3>
        <p className="text-muted">Prueba con otro término de búsqueda</p>
      </div>
    );
  }

  return (
    <div className="row">
      {items.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CardList;