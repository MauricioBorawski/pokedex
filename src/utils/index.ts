export const formatPokemonId = (id?: number) => {
  if (!id) return "0000";

  const stringFromNumber = String(id);
  const numberLength = stringFromNumber.length;

  if (numberLength > 4) return stringFromNumber;

  return stringFromNumber.padStart(4, "0");
};

export const defaultPokemonInfo = {
  id: 0,
  name: "",
  sprites: {
    front_default: "",
    back_default: "",
    front_shiny: "",
    back_shiny: "",
  },
  types: [],
  stats: [],
  height: 0,
  weight: 0,
  abilities: [],
};
