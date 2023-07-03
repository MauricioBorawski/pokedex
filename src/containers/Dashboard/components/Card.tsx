import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PokemonInfo } from "@/types";
import { formatPokemonId } from "@/utils";
import { typeColors } from "@/utils/typecolors";
import { createGetRequest } from "@/methods";

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

  const navigate = useNavigate();

  useEffect(() => {
    createGetRequest<PokemonInfo>(pokemonInfoUrl, (data) => {
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
          height: "485px",
        }}
      >
        <CardMedia
          component="img"
          src={pokemonInfo?.sprites.front_default}
          alt={`${name} image`}
          onClick={() => {
            navigate(`/pokemon/${name}`, { state: pokemonInfo });
          }}
          sx={{
            cursor: "pointer",
            ":hover": {
              filter: "brightness(1.1)",
            },
          }}
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
                sx={{
                  textTransform: "capitalize",
                  background: typeColors[type.type.name],
                  padding: "4px 15px",
                  borderRadius: "10px",
                }}
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
