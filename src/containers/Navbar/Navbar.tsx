import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToolBar from "@mui/material/Toolbar";
import { AppBar, Box, InputBase, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { DisplayOptions } from "./components/DisplayOptions";
import { useDebounce } from "@/hooks";

export const Navbar: FunctionComponent = () => {
  const navigate = useNavigate();

  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [userInputValue, setUserInputValue] = useState<string>("");

  const handleInput = useDebounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      setUserInputValue(inputValue);
      setOpenOptions(true);
    },
    300
  );

  useEffect(() => {
    if (userInputValue.length === 0) {
      setOpenOptions(false);
    }
  }, [userInputValue]);

  return (
    <Container>
      <AppBar
        position="static"
        sx={{
          padding: "15px",
        }}
      >
        <ToolBar
          sx={{
            width: "90%",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
          }}
        >
          <Title>
            <Link
              to={"/"}
              style={{
                color: "#ccc",
                textDecoration: "none",
              }}
            >
              Pokédex
            </Link>
          </Title>
          <Search>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{
                "aria-label": "search",
              }}
              onChange={handleInput}
              onKeyUp={(arg) => {
                if (arg.key === "Enter") {
                  navigate(`/pokemon/${userInputValue.toLowerCase()}`);
                }
              }}
            />
            <DisplayOptions
              show={openOptions}
              setShow={(value: boolean) => {
                setOpenOptions(value);
              }}
              userInputValue={userInputValue}
            />
          </Search>
        </ToolBar>
      </AppBar>
    </Container>
  );
};

const Container = ({ children }: { children: ReactNode }) => (
  <Box sx={{ flexGrow: 2 }}>{children}</Box>
);

const Title = ({ children }: { children: ReactNode }) => (
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
    {children}
  </Typography>
);

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
