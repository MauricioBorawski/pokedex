import { FunctionComponent } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { PokemonStats } from "../../../types";

export const StatTable: FunctionComponent<{
  stats: Array<PokemonStats>;
}> = ({ stats }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{textTransform: "capitalize"}}>
            {stats.map((stat) => (
              <TableCell>{stat.stat.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {stats.map((stat) => (
              <TableCell>{stat.base_stat}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
