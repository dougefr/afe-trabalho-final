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
      "official-artwork": {
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
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
    };
  }[];
}

interface IPokemonSpecie {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
}

export default class PokemonService {
  public static async listPokemon(
    limit: number,
    offset: number
  ): Promise<IPokemonList> {
    const { data } = await Axios.get<IPokemonList>(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );

    for (let i = 0; i < data.results.length; i++) {
      try {
        const pokemon = await this.getPokemon(offset + i + 1);
        data.results[i].sprite = pokemon.sprites.front_default;
      } catch (err) {
        console.error(err);
      }
    }

    return {
      ...data,
      results: data.results
        .filter((r) => r.sprite)
        .map((r, i) => {
          return { ...r, id: offset + i + 1 };
        }),
    };
  }

  public static async getPokemon(id: number): Promise<IPokemonDetail> {
    const { data: pokemon } = await Axios.get<IPokemonDetail>(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );

    const { data: specie } = await Axios.get<IPokemonSpecie>(
      pokemon.species.url
    );

    pokemon.species.text = specie.flavor_text_entries.filter(
      (t) => t.language.name === "en"
    )[0].flavor_text;

    /*if(pokemon.species.text) {
      pokemon.species.text = pokemon.species.text.replaceAll(
        /[^\w\d\,\.A-zÀ-ú\?\!]/g,
        " "
      );
    }*/

    return pokemon;
  }
}
