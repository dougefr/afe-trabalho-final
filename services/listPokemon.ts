import Axios from "axios";

export interface IPokemonList {
  count: number;
  results: {
    id: number;
    name: string;
  }[];
}

export async function listPokemon(
  limit: number,
  offset: number
): Promise<IPokemonList> {
  const { data } = await Axios.get<IPokemonList>(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  return {
    ...data,
    results: data.results.map((r, i) => {
      return { ...r, id: offset + i + 1 };
    }),
  };
}
