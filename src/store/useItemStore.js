import { create } from 'zustand';
import axios from 'axios';
import { apiConfig, CURRENT_API } from '../config/apiConfig';

const useItemStore = create((set, get) => ({
  items: [],
  favorites: [],
  isLoading: false,
  error: null,
  searchTerm: '',

  setSearchTerm: (term) => {
    set({ searchTerm: term });
  },

  fetchItems: async () => {
    const config = apiConfig[CURRENT_API];
    
    if (!config) {
      set({ error: 'API no configurada' });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(config.url);
      let items = config.getItems(response.data);

      if (CURRENT_API === 'pokeapi') {
        const detailedItems = await Promise.all(
          items.map(async (item, index) => {
            try {
              const detailResponse = await axios.get(item.url);
              return config.mapItem({ ...detailResponse.data, id: index + 1 });
            } catch (error) {
              console.error(`Error fetching pokemon details: ${error}`);
              return config.mapItem({ ...item, id: index + 1 });
            }
          })
        );
        items = detailedItems;
      } else {
        items = items.map((item, index) => config.mapItem(item, index));
      }

      set({ items, isLoading: false });
    } catch (error) {
      set({ 
        error: error.message || 'Error al cargar los datos',
        isLoading: false 
      });
    }
  },

  addToFavorites: (item) => {
    const { favorites } = get();
    if (!favorites.find(fav => fav.id === item.id)) {
      set({ favorites: [...favorites, item] });
    }
  },

  removeFromFavorites: (itemId) => {
    const { favorites } = get();
    set({ favorites: favorites.filter(fav => fav.id !== itemId) });
  },

  getFilteredItems: () => {
    const { items, searchTerm } = get();
    if (!searchTerm) return items;
    
    return items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },

  clearItems: () => {
    set({ items: [], error: null });
  }
}));

export default useItemStore;