import {
  createContext,
  useState,
  ReactElement,
  useEffect,
  useContext,
} from "react";
import { PokemonGetResponse, PokemonResult } from "../types";
import { createGetRequest } from "../methods";

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

  const url = "https://pokeapi.co/api/v2/pokemon?limit=151";

  useEffect(() => {
    createGetRequest<PokemonGetResponse>(url, (data) => {
      setPokemonData([...pokemonData, ...data.data.results]);
      if (data.data.next) setLoadMoreUrl(data.data.next);
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
