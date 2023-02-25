import { FunctionComponent, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Box from "@mui/material/Box";
import { PokemonCard } from "./components/Card";
import { PokemonResult, PokemonGetResponse } from "../../types";

export const Dashboard: FunctionComponent = () => {
  const [pokemonData, setPokemonData] = useState<PokemonResult[]>([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((data: AxiosResponse<PokemonGetResponse>) => {
        setPokemonData([...pokemonData, ...data.data.results]);
      });
  }, []);

  return (
    <Box>
      {pokemonData.map((data) => (
        <PokemonCard
          name={data.name}
          pokemonInfoUrl={data.url}
          key={data.name}
        />
      ))}
    </Box>
  );
};
