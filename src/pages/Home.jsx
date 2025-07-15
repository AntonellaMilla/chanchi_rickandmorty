import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import CardList from '../components/CardList';
import useItemStore from '../store/useItemStore';

const Home = () => {
  const { items, isLoading, fetchItems } = useItemStore();

  useEffect(() => {
    if (items.length === 0) {
      fetchItems();
    }
  }, [items.length, fetchItems]);

  const homeItems = items.slice(0, 6);

  return (
    <div className="container">
      <Hero />
      
      <section>
        <h2 className="text-center mb-4">Personajes Destacados</h2>
        {isLoading ? (
          <div className="text-center">
            <div className="loading-spinner"></div>
            <p>Cargando elementos...</p>
          </div>
        ) : (
          <CardList items={homeItems} />
        )}
      </section>
    </div>
  );
};

export default Home;