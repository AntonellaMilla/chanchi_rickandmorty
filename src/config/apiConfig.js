export const CURRENT_API = "rickAndMorty"


export const apiConfig ={
  rickAndMorty: {
    url: 'https://rickandmortyapi.com/api/character',
    getItems: (data) => data.results,
    mapItem: (item) => ({
      id: item.id,
      name: item.name,
      image: item.image,
      types: item.species,
    }),
  }
}