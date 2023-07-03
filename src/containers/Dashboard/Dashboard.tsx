import { FunctionComponent, ReactNode } from "react";
import { usePokemonContext, PokemonContext } from "@/context";
import { Box, Button } from "@mui/material";
import { createGetRequest } from "@/methods";
import { PokemonCard } from "./components/Card";
import { PokemonGetResponse } from "@/types";

export const Dashboard: FunctionComponent = () => {
  const { pokemonData, setPokemonData, loadMoreUrl, setLoadMoreUrl } =
    usePokemonContext(PokemonContext);

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
      </Box>
      <ButtonContainer>
        <Button
          variant="contained"
          onClick={() => {
            createGetRequest<PokemonGetResponse>(loadMoreUrl, (data) => {
              setPokemonData([...pokemonData, ...data.data.results]);
              if (data.data.next) setLoadMoreUrl(data.data.next);
            });
          }}
        >
          Load more
        </Button>
      </ButtonContainer>
    </>
  );
};

const ButtonContainer: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => <Box sx={{ textAlign: "center", margin: "15px 0px" }}>{children}</Box>;
