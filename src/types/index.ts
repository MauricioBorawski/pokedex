// PokeApi

export interface PokemonResult {
  name: string;
  url: string;
}

export interface PokemonGetResponse {
  count: number;
  next: null | string;
  previous: null | string;
  results: Array<PokemonResult>;
}

export interface PokemonInfo {
  id: number;
  name: string;
  sprites: PokemonSprite;
  types: Array<PokemonType>;
  stats: Array<PokemonStats>;
  height: number;
  weight: number;
  abilities: Array<PokemonAbilities>;
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

export interface PokemonStats {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonAbilities {
  ability: {
    name: string;
  };
}
