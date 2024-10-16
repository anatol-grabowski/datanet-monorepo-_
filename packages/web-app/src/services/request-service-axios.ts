import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import {
  Headers,
  RequestOptions,
  RequestService,
  RequestServiceError,
  Response,
} from './request-service'

export * from './request-service'

export class RequestServiceAxios implements RequestService {
  protected axios: AxiosInstance

  constructor() {
    this.axios = this.configureAxios()
  }

  protected configureAxios(): AxiosInstance {
    const ax = axios.create({})
    return ax
  }

  protected getFullUrl(baseUrl: string, url: string, query: any): string {
    const fullUrl = `${baseUrl}${url}`
    const q = qs.stringify(query, { arrayFormat: 'repeat' })
    if (q === '') return fullUrl
    const fullUrlWithQuery = fullUrl.includes('?') ? `${fullUrl}&${q}` : `${fullUrl}?${q}`
    return fullUrlWithQuery
  }

  protected requestToAxios(request: RequestOptions): AxiosRequestConfig {
    const { baseUrl = '', data, query, url = '', ...rest } = request
    const axiosReq: AxiosRequestConfig = {
      ...rest,
      data,
      url: this.getFullUrl(baseUrl, url, query),
    }
    return axiosReq
  }

  protected responseFromAxios(axiosRes: AxiosResponse): Response {
    const response: Response = {
      body: axiosRes.data,
      headers: axiosRes.headers as Headers,
      status: axiosRes.status,
    }
    return response
  }

  protected errorFromAxios(axiosErr: any, request: RequestOptions, error: RequestServiceError) {
    error.code = axiosErr.code
    error.request = request

    if (axiosErr.isAxiosError) {
      error.message = `${(request.method || 'get').toUpperCase()} '${request.baseUrl}${
        request.url
      }' failed`
      if (axiosErr.code != null) {
        error.message += `, code '${axiosErr.code}'`
      }
      if (axiosErr.response != null) {
        if (axiosErr.response.status != null) {
          error.message += `, status '${axiosErr.response.status}'`
        }
        error.response = this.responseFromAxios(axiosErr.response)
      }
    }
    return error
  }

  async request<T>(request: RequestOptions): Promise<Response<T>> {
    try {
      const axiosReq = this.requestToAxios(request)
      const axiosRes = await axios.request(axiosReq)
      const response = this.responseFromAxios(axiosRes)
      return response
    } catch (axiosErr) {
      const error = new RequestServiceError()
      this.errorFromAxios(axiosErr, request, error)
      throw error
    }
  }
}
