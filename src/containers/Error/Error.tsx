import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";

export const ErrorPage: FunctionComponent = () => {
  const { pokemonname } = useParams();

  return (
    <Container
      sx={{
        width: "75%",
        height: "75vh",
      }}
    >
      <h1>No pokemon was found.</h1>
      <Typography>
        Pokemon <strong>{pokemonname}</strong> doesn't exist, pleasecheck that the name or
        numbers are correct.
      </Typography>
    </Container>
  );
};
