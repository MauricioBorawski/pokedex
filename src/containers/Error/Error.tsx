import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";

export const ErrorPage: FunctionComponent = () => {
  const { pokemonname } = useParams();
  const navigate = useNavigate();

  const [counter, setCounter] = useState<number>(10);

  setTimeout(() => {
    navigate("/");
  }, 11000);

  useEffect(() => {
    setTimeout(() => {
      if (counter > 0) setCounter(counter - 1);
    }, 1000);
  }, [counter]);

  return (
    <Container
      sx={{
        width: "75%",
        height: "75vh",
      }}
    >
      <Typography variant="h3">No pokemon was found.</Typography>
      <Typography variant="h5">
        Pokemon <strong>{pokemonname}</strong> doesn't exist, pleasecheck that
        the name or numbers are correct.
      </Typography>
      <Typography>
        You are going to be redirected to the home page in a {counter} seconds.
      </Typography>
    </Container>
  );
};
