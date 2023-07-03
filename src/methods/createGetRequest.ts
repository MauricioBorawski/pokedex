import axios, { AxiosResponse } from "axios";
import { PokemonGetResponse } from "../types";

export type PokemonsGetRequest = (
  url: string,
  onSuccess: (data: AxiosResponse<PokemonGetResponse>) => void,
  onLoading?: () => void,
  onFinishLoading?: () => void,
  onError?: () => void
) => void;

export const createPokemonsGetRequest: PokemonsGetRequest = (
  url,
  onSuccess,
  onLoading,
  onFinishLoading,
  onError
) => {
  axios
    .get(url)
    .then((data: AxiosResponse<PokemonGetResponse>) => {
      if (onLoading) onLoading();
      return data;
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((error) => {
      console.log(error);
      if (onError) onError();
    })
    .finally(() => {
      if (onFinishLoading) onFinishLoading();
    });
};
