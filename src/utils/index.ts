export const formatPokemonId = (id?: number) => {
  if (!id) return "0000";

  const stringFromNumber = String(id);
  const numberLength = stringFromNumber.length;

  if (numberLength > 4) return stringFromNumber;

  return stringFromNumber.padStart(4, "0");
};
