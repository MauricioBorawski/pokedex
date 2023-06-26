import { FunctionComponent, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { StatTable } from "./components";
import { PokemonInfo as PokemonData } from "../../types";
import { defaultPokemonInfo, formatPokemonId } from "../../utils";
import axios, { AxiosResponse } from "axios";

export const PokemonInfo: FunctionComponent = () => {
  const { pokemonname } = useParams();
  const { state }: { state: PokemonData } = useLocation();
  const [pokemonData, setPokemonData] =
    useState<PokemonData>(defaultPokemonInfo);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoaading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!state) {
      const fetchData = async () =>
        await axios
          .get(`https://pokeapi.co/api/v2/pokemon/${pokemonname}`)
          .then((data) => {
            setIsLoading(true);
            return data;
          })
          .then((data: AxiosResponse<PokemonData>) => {
            setPokemonData(data.data);
          })
          .catch(() => {
            setIsError(true);
          })
          .finally(() => {
            setIsLoading(false);
          });

      fetchData();
    } else {
      setPokemonData(state);
    }
  }, [state, pokemonname]);

  if (isLoaading && !state) return <h1>Loading</h1>;
  if (isError) return <h1>Error</h1>;

  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        margin: "15px 0",
        padding: "25px",
        gap: "50px",
      }}
    >
      <div>
        <Typography
          variant="h3"
          sx={{
            textTransform: "capitalize",
          }}
        >
          {pokemonData.name}
        </Typography>
        <Typography
          align="center"
          variant="h6"
          color="text.secondary"
          gutterBottom
        >
          #{formatPokemonId(pokemonData.id)}
        </Typography>
      </div>
      <Grid>
        <div>
          <img
            src={pokemonData.sprites.back_default}
            alt={`${pokemonData.name} back`}
            style={{ width: "300px", height: "300px" }}
          />
          <img
            src={pokemonData.sprites.front_default}
            alt={`${pokemonData.name} front`}
            style={{ width: "300px", height: "300px" }}
          />
        </div>
        <div style={{ maxWidth: "90%" }}>
          <StatTable stats={pokemonData.stats} />
          <Container>
            <div>
              <Typography variant="h5">Height</Typography>
              <Typography>{pokemonData.height / 10}m</Typography>
            </div>
            <div>
              <Typography variant="h5">Weight</Typography>
              <Typography>{pokemonData.weight / 10}kg</Typography>
            </div>
            <div>
              <Typography variant="h5">Types</Typography>
              {pokemonData.types.map((type) => (
                <Typography key={type.type.name}>{type.type.name}</Typography>
              ))}
            </div>
            <div>
              <Typography variant="h5">Abilities</Typography>
              {pokemonData.abilities.map((ability) => (
                <Typography key={ability.ability.name}>
                  {ability.ability.name}
                </Typography>
              ))}
            </div>
          </Container>
        </div>
      </Grid>
    </Box>
  );
};

const Container = styled("div")({
  maxWidth: "575px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px",
  borderColor: "InfoBackground",
  border: "solid .7px",
  backgroundColor: "Background",
  borderRadius: "4px",
  marginTop: "25px",
  padding: "25px",
});

const Grid = styled("div")({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(max(300px, 100%/4), 1fr))",
  overflowX: "hidden",
  gap: "25px",
});
