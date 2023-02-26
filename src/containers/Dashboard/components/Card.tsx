import { FunctionComponent, useEffect, useState, useId } from "react";
import axios, { AxiosResponse } from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PokemonInfo } from "../../../types";
import { formatPokemonId } from "../../../utils";

export interface PokemonCardProps {
  name: string;
  pokemonInfoUrl: string;
}

export const PokemonCard: FunctionComponent<PokemonCardProps> = ({
  name,
  pokemonInfoUrl,
}) => {
  const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo | undefined>(
    undefined
  );

  useEffect(() => {
    axios.get(pokemonInfoUrl).then((data: AxiosResponse<PokemonInfo>) => {
      setPokemonInfo(data.data);
    });
  }, []);

  return (
    <Box
      sx={{
        margin: "15px 0",
      }}
    >
      <Card
        sx={{
          width: "300px",
          height: "485px"
        }}
      >
        <CardMedia
          component="img"
          src={pokemonInfo?.sprites.front_default}
          alt={`${name} image`}
        />
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            #{formatPokemonId(pokemonInfo?.id)}
          </Typography>
          <Typography
            variant="h4"
            component="div"
            sx={{
              textTransform: "capitalize",
            }}
            gutterBottom
          >
            {name}
          </Typography>

          <Stack direction="row" gap="25px">
            {pokemonInfo?.types.map((type, i) => (
              <Typography
                variant="h6"
                sx={{ textTransform: "capitalize" }}
                key={name + i}
              >
                {type.type.name}
              </Typography>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
