import {IApiResponse} from 'api.types';
import {API_STATES, ERROR_MESSAGES, HTTP_REQ_METHODS} from '../constants';
import axiosInstance from './request.service';
import axios, {AxiosResponse} from 'axios';

const makeRequest = async <T>(
  url: string,
  method: REQ_METHODS_TYPE,
  params: QueryParamsType = null,
): Promise<IApiResponse<T>> => {
  const axiosParams = {
    url,
    method,
    params,
  };
  try {
    const resp = await axiosInstance(axiosParams);
    return _processApiResponse<T>(resp);
  } catch (error) {
    return _processError<T>(error);
  }
};

export const makeGetRequest = async (
  url: string,
  queryParams: QueryParamsType = null,
): Promise<any> => {
  return makeRequest(url, HTTP_REQ_METHODS.GET, queryParams);
};

const _processApiResponse = <T>(resp: AxiosResponse): IApiResponse<T> => {
  return {
    status: API_STATES.SUCCESS,
    message: API_STATES.SUCCESS,
    data: resp.data,
  };
};

const _processError = <T>(error: unknown): Promise<IApiResponse<T>> => {
  let errorResponse = {
    message: ERROR_MESSAGES.GENERIC_ERROR_MESSAGE,
    status: API_STATES.FAILURE,
  };
  if (axios.isAxiosError(error)) {
    errorResponse.message = error.message;
  }
  return Promise.reject(errorResponse);
};
