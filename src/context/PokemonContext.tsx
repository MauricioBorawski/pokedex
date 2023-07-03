import axios, { AxiosResponse } from "axios";
import {
  createContext,
  useState,
  ReactElement,
  useEffect,
  useContext,
} from "react";
import { PokemonGetResponse, PokemonResult } from "../types";

interface PokemonContextReturnType {
  pokemonData: PokemonResult[];
  loadMoreUrl: string;
  setPokemonData: (results: PokemonResult[]) => void;
  setLoadMoreUrl: (url: string) => void;
}

export const PokemonContext = createContext<PokemonContextReturnType | null>(
  null
);

export const PokemonContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [pokemonData, setPokemonData] = useState<PokemonResult[]>([]);
  const [loadMoreUrl, setLoadMoreUrl] = useState("");

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=150")
      .then((data: AxiosResponse<PokemonGetResponse>) => {
        setPokemonData([...pokemonData, ...data.data.results]);
        setLoadMoreUrl(data.data.next);
      });
  }, []);

  return (
    <PokemonContext.Provider
      value={{ pokemonData, setPokemonData, loadMoreUrl, setLoadMoreUrl }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = (
  context: React.Context<PokemonContextReturnType | null>
) => {
  const { pokemonData, loadMoreUrl, setPokemonData, setLoadMoreUrl } =
    useContext(context) as unknown as PokemonContextReturnType;

  return { pokemonData, loadMoreUrl, setLoadMoreUrl, setPokemonData };
};
