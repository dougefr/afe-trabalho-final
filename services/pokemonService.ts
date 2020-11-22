import Axios from "axios";

export interface IPokemonList {
  count: number;
  results: {
    id: number;
    name: string;
    sprite: string;
  }[];
}

export interface IPokemonDetail {
  name: string;
  order: number;
  sprites: {
    front_default: string;
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  species: {
    url: string;
    text: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
}

interface IPokemonSpecie {
  flavor_text_entries: {
    flavor_text: string;
  }[];
}

export async function listPokemon(
  limit: number,
  offset: number
): Promise<IPokemonList> {
  const { data } = await Axios.get<IPokemonList>(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );

  for (let i = 0; i < data.results.length; i++) {
    const pokemon = await getPokemon(offset + i + 1);
    data.results[i].sprite = pokemon.sprites.front_default;
  }

  return {
    ...data,
    results: data.results.map((r, i) => {
      return { ...r, id: offset + i + 1 };
    }),
  };
}

export async function getPokemon(id: number): Promise<IPokemonDetail> {
  const { data: pokemon } = await Axios.get<IPokemonDetail>(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  );

  const { data: specie } = await Axios.get<IPokemonSpecie>(pokemon.species.url);
  pokemon.species.text = specie.flavor_text_entries[0].flavor_text;

  return pokemon;
}
