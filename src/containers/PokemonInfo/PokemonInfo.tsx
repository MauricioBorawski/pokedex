import { FunctionComponent } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { StatTable } from "./components";
import { PokemonInfo as PokemonData } from "../../types";
import { formatPokemonId } from "../../utils";

export const PokemonInfo: FunctionComponent = () => {
  const { state }: { state: PokemonData } = useLocation();

  console.log(state);

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
          {state.name}
        </Typography>
        <Typography
          align="center"
          variant="h6"
          color="text.secondary"
          gutterBottom
        >
          #{formatPokemonId(state.id)}
        </Typography>
      </div>
      <Grid>
        <div>
          <img
            src={state.sprites.back_default}
            alt={`${state.name} back`}
            style={{ width: "300px", height: "300px" }}
          />
          <img
            src={state.sprites.front_default}
            alt={`${state.name} front`}
            style={{ width: "300px", height: "300px" }}
          />
        </div>
        <div style={{ maxWidth: "90%" }}>
          <StatTable stats={state.stats} />
          <Container>
            <div>
              <Typography variant="h5">Height</Typography>
              <Typography>{state.height / 10}m</Typography>
            </div>
            <div>
              <Typography variant="h5">Weight</Typography>
              <Typography>{state.weight / 10}kg</Typography>
            </div>
            <div>
              <Typography variant="h5">Types</Typography>
              {state.types.map((type) => (
                <Typography>{type.type.name}</Typography>
              ))}
            </div>
            <div>
              <Typography variant="h5">Abilities</Typography>
              {state.abilities.map((ability) => (
                <Typography>{ability.ability.name}</Typography>
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
