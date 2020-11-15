import Axios from "axios";

export interface IPokemonList {
  count: number;
  results: {
    id: number;
    name: string;
    sprite: string;
  }[];
}

interface IPokemonSprites {
  sprites: {
    front_default;
  };
}

export async function listPokemon(
  limit: number,
  offset: number
): Promise<IPokemonList> {
  const { data } = await Axios.get<IPokemonList>(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );

  for (let i = 0; i < data.results.length; i++) {
    const { data: d } = await Axios.get<IPokemonSprites>(
      `https://pokeapi.co/api/v2/pokemon/${offset + i + 1}`
    );

    data.results[i].sprite = d.sprites.front_default;
  }

  return {
    ...data,
    results: data.results.map((r, i) => {
      return { ...r, id: offset + i + 1 };
    }),
  };
}
