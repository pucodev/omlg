import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios'

interface BaseError {
  code?: string
  message?: string
  error_code?: string
}

interface ApiError extends AxiosError<BaseError> {
  api_error_code?: string
}

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch'

export function isApiError(error: unknown): error is ApiError {
  return (
    axios.isAxiosError(error) &&
    typeof error.response?.data === 'object' &&
    error.response?.data !== null &&
    'error_code' in error.response.data
  )
}

// prettier-ignore
interface RequestGeneric<
  TResponse = unknown,
  TError extends BaseError = BaseError,
  TData = unknown
> {
  response: TResponse
  data: TData
  error: TError
}

const Api = {
  async request<T extends RequestGeneric>(
    method: HttpMethod,
    url: string,
    data?: T['data'],
  ): Promise<AxiosResponse<T['response']>> {
    const request: AxiosRequestConfig = {
      method,
      url,
      params: {},
      data: {},
    }

    if (method.toLowerCase() === 'get') {
      request.params = data
    } else {
      request.data = data
    }

    try {
      const response = await axios<T['response']>(request)
      return response
    } catch (err) {
      if (axios.isAxiosError<T['error']>(err)) {
        // Validate error
      }

      if (isApiError(err)) {
        err.api_error_code = err?.response?.data?.error_code
      }

      throw err
    }
  },
}

export default Api
