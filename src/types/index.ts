// PokeApi

export interface PokemonResult {
  name: string;
  url: string;
}

export interface PokemonGetResponse {
  count: number;
  next: string;
  previous: null | string;
  results: Array<PokemonResult>;
}

export interface PokemonInfo {
  id: number;
  sprites: PokemonSprite;
  types: Array<PokemonType>;
}

export interface PokemonSprite {
  front_default: string;
  back_default: string;
  front_shiny: string;
  back_shiny: string;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
  };
}
