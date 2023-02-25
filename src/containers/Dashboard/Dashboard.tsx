import { FunctionComponent, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';

export const Dashboard: FunctionComponent = () => {
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon");
    console.log("render");
  }, []);

  return <></>;
};
