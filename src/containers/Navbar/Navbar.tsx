import { FunctionComponent } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import ToolBar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";

export const Navbar: FunctionComponent = () => {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
    },
  }));

  return (
    <Box sx={{ flexGrow: 2 }}>
      <AppBar
        position="static"
        sx={{
          padding: "15px",
        }}
      >
        <ToolBar
          sx={{
            width: "90%",
            flexDirection: {xs: "column", sm: "row"},
            alignItems: {xs: "flex-start", sm: "center"}
          }}
        >
          <Typography
            variant="h3"
            noWrap
            sx={{
              flexGrow: 1,
              paddingLeft: "15px",
              fontSize: { xs: "2rem", sm: "3rem" },
              width: "fit-content",
            }}
          >
            Pokedex
          </Typography>

          <Search>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </ToolBar>
      </AppBar>
    </Box>
  );
};
