import { FunctionComponent, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { PokemonCard } from "./components/Card";
import { PokemonResult, PokemonGetResponse } from "../../types";

export const Dashboard: FunctionComponent = () => {
  const [pokemonData, setPokemonData] = useState<PokemonResult[]>([]);
  const [loadMoreUrl, setLoadMoreUrl] = useState("");

  const additionalFetchedPokemons: Array<PokemonResult[]> = [];

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((data: AxiosResponse<PokemonGetResponse>) => {
        setPokemonData([...pokemonData, ...data.data.results]);
        setLoadMoreUrl(data.data.next);
      });
  }, []);

  function loadMore(nextUrl: string) {
    axios.get(nextUrl).then((data: AxiosResponse<PokemonGetResponse>) => {
      setPokemonData([...pokemonData, ...data.data.results]);
      setLoadMoreUrl(data.data.next);
    });
  }

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(max(300px, 100%/4), 1fr))",
          gridTemplateRows: "auto 1fr",
          placeItems: "center",
          gap: "5px",
        }}
      >
        {pokemonData.map((data) => (
          <PokemonCard
            name={data.name}
            pokemonInfoUrl={data.url}
            key={data.name}
          />
        ))}
        {additionalFetchedPokemons.map((results) =>
          results.map((result) => (
            <PokemonCard
              name={result.name}
              pokemonInfoUrl={result.url}
              key={result.name}
            />
          ))
        )}
      </Box>
      <div style={{ textAlign: "center", margin: "15px 0px" }}>
        <Button
          variant="contained"
          onClick={() => {
            loadMore(loadMoreUrl);
          }}
        >
          Load more
        </Button>
      </div>
    </>
  );
};
