import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { PokemonContext, usePokemonContext } from "../../../context";
import { PokemonResult } from "../../../types";

export interface DisplayOptionProps {
  show: boolean;
  userInputValue: string;
  setShow: (value: boolean) => void;
}

export const DisplayOptions: FunctionComponent<DisplayOptionProps> = ({
  show,
  setShow,
  userInputValue,
}) => {
  const navigate = useNavigate();

  const { pokemonData } = usePokemonContext(PokemonContext);

  const [pokemonDataCopy, setPokemonDataCopy] =
    useState<PokemonResult[]>(pokemonData);

  const handleOnSelectItem = (pokemonName: string) => {
    navigate(`/pokemon/${pokemonName.toLowerCase()}`);
    setShow(false);
    setPokemonDataCopy(pokemonData);
  };

  useEffect(() => {
    setPokemonDataCopy(
      pokemonData.filter((data) => {
        const regex = new RegExp(`${userInputValue}`, "gi");
        return regex.test(data.name);
      })
    );
  }, [userInputValue]);

  return (
    <Box
      sx={{
        width: "100%",
        display: show ? "block" : "none",
        position: "absolute",
        zIndex: "100",
        backgroundColor: "gray",
      }}
    >
      <List>
        {pokemonDataCopy.map((pokemon) => (
          <ListItem
            key={pokemon.name}
            sx={{
              cursor: "pointer",
              ":hover": {
                backgroundColor: "ActiveBorder",
              },
            }}
            onClick={() => {
              handleOnSelectItem(pokemon.name);
            }}
          >
            <ListItemText sx={{ textTransform: "capitalize" }}>
              {pokemon.name}
            </ListItemText>
          </ListItem>
        ))}
        <ListItem
          sx={{
            cursor: "pointer",
            ":hover": {
              backgroundColor: "ActiveBorder",
            },
          }}
          onClick={() => {
            handleOnSelectItem(userInputValue);
          }}
        >
          {pokemonDataCopy.length < 1 && (
            <ListItemText>{userInputValue}</ListItemText>
          )}
        </ListItem>
      </List>
    </Box>
  );
};
