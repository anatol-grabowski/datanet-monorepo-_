type Primitive = string | number | boolean | null | undefined
export interface Obj {
  // eslint-disable-next-line no-use-before-define
  [member: string]: Json
}
type Json = Primitive | Obj | Array<Json>

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'
export type Headers = Record<string, string | undefined>
type ResponseTypes = 'json' | 'text' | 'stream' | 'arraybuffer'

export interface RequestOptions {
  method?: Method
  baseUrl?: string
  url?: string
  query?: Obj
  headers?: Headers
  data?: any
  responseType?: ResponseTypes
}

export interface Response<T = any> {
  status: number
  body: T
  headers: Headers
}

export abstract class RequestService {
  /**
   * @throws {RequestServiceError}
   */
  abstract request<T>(options: RequestOptions): Promise<Response<T>>
}

export class RequestServiceError extends Error {
  request!: RequestOptions
  response!: Response
  code!: string
}
