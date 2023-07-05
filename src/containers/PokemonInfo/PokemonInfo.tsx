import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { styled, Stack } from "@mui/system";
import { Box, CircularProgress, Typography } from "@mui/material";
import { createGetRequest } from "@/methods";
import { defaultPokemonInfo, formatPokemonId } from "@/utils";
import { typeColors } from "@/utils/typecolors";
import { StatTable } from "./components";
import { ErrorPage } from "../Error";
import { PokemonInfo as PokemonData } from "@/types";
import { NotificationContext, useNotificationContext } from "@/context";

export const PokemonInfo: FunctionComponent = () => {
  const { pokemonname } = useParams();
  const { state }: { state: PokemonData } = useLocation();

  const { openNotification, notificationContent } =
    useNotificationContext(NotificationContext);

  const [pokemonData, setPokemonData] =
    useState<PokemonData>(defaultPokemonInfo);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonname}`;

  useEffect(() => {
    if (!state) {
      createGetRequest<PokemonData>({
        url: url,
        onSuccess: (data) => {
          setPokemonData(data.data);
        },
        onLoading: () => {
          setIsLoading(true);
        },
        onFinishLoading: () => {
          setIsLoading(false);
        },
        onError: () => {
          notificationContent("Oops! An error ocurred.");
          openNotification();
          setIsError(true);
        },
      });
    } else {
      setPokemonData(state);
    }
  }, [state, pokemonname]);

  if (isLoading && !state) return <CircularProgress aria-busy={isLoading} />;
  if (isError) return <ErrorPage />;

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
        <PokemonName>{pokemonData.name}</PokemonName>
        <PokemonId>#{formatPokemonId(pokemonData.id)}</PokemonId>
      </div>
      <Grid>
        <div>
          <img
            src={pokemonData.sprites.front_default}
            alt={`${pokemonData.name} front`}
            style={{ width: "300px", height: "300px" }}
          />
          <img
            src={pokemonData.sprites.back_default}
            alt={`${pokemonData.name} back`}
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
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {pokemonData.types.map((type) => (
                  <PokemonType name={type.type.name}>
                    {type.type.name}
                  </PokemonType>
                ))}
              </Stack>
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

const PokemonName = ({ children }: { children: ReactNode }) => (
  <Typography
    variant="h3"
    sx={{
      textTransform: "capitalize",
    }}
  >
    {children}
  </Typography>
);

const PokemonId = ({ children }: { children: ReactNode }) => (
  <Typography align="center" variant="h6" color="text.secondary" gutterBottom>
    {children}
  </Typography>
);

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

const PokemonType = ({
  children,
  name,
}: {
  children: ReactNode;
  name: string;
}) => (
  <Typography
    sx={{
      textTransform: "capitalize",
      background: typeColors[name],
      padding: "4px 15px",
      borderRadius: "10px",
      width: "3.5rem",
    }}
    key={name}
  >
    {children}
  </Typography>
);
