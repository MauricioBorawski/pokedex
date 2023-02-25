import { FunctionComponent, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
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
        maxWidth: "275px",
        display: "grid",
        margin: "15px 0",
      }}
    >
      <Card>
        <CardMedia
          component="img"
          src={pokemonInfo?.sprites.front_default}
          height="200"
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

          {pokemonInfo?.types.map((type) => (
            <Typography>{type.type.name}</Typography>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};
