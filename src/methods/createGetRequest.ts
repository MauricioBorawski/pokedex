import axios, { AxiosResponse } from "axios";

/**
 * The `createGetRequest` function is a that sends a GET request to a specified URL
 * and handles success, loading, error, and finish loading callbacks.
 * @param {string} url - The URL of the GET request.
 * @param onSuccess - The `onSuccess` parameter is a callback function that will be called when the GET
 * request is successful. It takes one argument, `data`, which is the response data from the request.
 * @param [onLoading] - The `onLoading` parameter is a callback function that will be called when the
 * request is being made. It can be used to show a loading indicator or perform any other action while
 * the request is in progress.
 * @param [onFinishLoading] - The `onFinishLoading` parameter is a callback function that will be
 * called after the request has finished loading, regardless of whether it was successful or not.
 * @param [onError] - The `onError` parameter is a callback function that will be called if there is an
 * error during the HTTP GET request. It is optional and can be omitted if you don't need to handle
 * errors specifically.
 */
export const createGetRequest = <T>(
  url: string,
  onSuccess: (data: AxiosResponse<T>) => void,
  onLoading?: () => void,
  onFinishLoading?: () => void,
  onError?: () => void
) => {
  axios
    .get(url)
    .then((data: AxiosResponse<T>) => {
      if (onLoading) onLoading();
      return data;
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      if (onError) onError();
    })
    .finally(() => {
      if (onFinishLoading) onFinishLoading();
    });
};
