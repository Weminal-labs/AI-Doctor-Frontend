import axios from "axios";

// Import types
import type {
  Axios,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosInterceptorOptions,
} from "axios";

type _AxiosInterceptor = {
  request: AxiosInterceptorManager<InternalAxiosRequestConfig>;
  response: AxiosInterceptorManager<AxiosResponse>;
};

type _KindOfOnFulfilled = {
  request: (
    value: InternalAxiosRequestConfig<any>
  ) =>
    | InternalAxiosRequestConfig<any>
    | Promise<InternalAxiosRequestConfig<any>>;
  response: (
    value: AxiosResponse<any, any>
  ) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>;
};

let _instance: APIManager | null = null;

export class APIManager {
  private _http!: Axios;

  constructor(config: AxiosRequestConfig) {
    if (_instance) return _instance;

    this._http = axios.create(config);

    // Place this in the last line
    _instance = this;
  }

  /**
   * Unsubscribe the listener.
   * @param type
   * @param id
   */
  unHook(type: keyof _AxiosInterceptor, id: number) {
    this._http.interceptors[type].eject(id);
  }

  /**
   * Subscribe a listener to the lifecycle of a request.
   * @param type
   * @param onFulfilled
   * @param onRejected
   * @param options
   * @returns
   */
  hook<Type extends keyof _KindOfOnFulfilled>(
    type: Type,
    onFulfilled?: _KindOfOnFulfilled[Type] | null | undefined,
    onRejected?: ((error: any) => any) | null,
    options?: AxiosInterceptorOptions
  ) {
    if (type === "request") {
      onFulfilled;
      return this._http.interceptors.request.use(
        onFulfilled as _KindOfOnFulfilled["request"],
        onRejected,
        options
      );
    }

    return this._http.interceptors.response.use(
      onFulfilled as _KindOfOnFulfilled["response"],
      onRejected,
      options
    );
  }

  /**
   * Make a HTTP Get request
   * @param url
   * @param config
   * @returns
   */
  async get<ResponseData>(url: string, config: AxiosRequestConfig) {
    try {
      const response = await this._http.get<ResponseData>(url, config);
      return response;
    } catch (e: any) {
      console.warn(e.message);
    }
  }

  /**
   * Make a HTTP Post request
   * @param url
   * @param config
   * @returns
   */
  async post<Payload, ResponseData>(
    url: string,
    data: Payload,
    config: AxiosRequestConfig
  ) {
    try {
      const response = await this._http.post<ResponseData>(url, data, config);
      return response;
    } catch (e: any) {
      console.warn(e.message);
    }
  }

  /**
   * Make a HTTP Put request
   * @param url
   * @param data
   * @param config
   * @returns
   */
  async put<Payload, ResponseData>(
    url: string,
    data: Payload,
    config: AxiosRequestConfig
  ) {
    try {
      const response = await this._http.put<ResponseData>(url, data, config);
      return response;
    } catch (e: any) {
      console.warn(e.message);
    }
  }

  /**
   * Make a HTTP Patch request
   * @param url
   * @param data
   * @param config
   * @returns
   */
  async patch<Payload, ResponseData>(
    url: string,
    data: Payload,
    config: AxiosRequestConfig
  ) {
    try {
      const response = await this._http.patch<ResponseData>(url, data, config);
      return response;
    } catch (e: any) {
      console.warn(e.message);
    }
  }

  /**
   * Make a HTTP Delete request
   * @param url
   * @param data
   * @param config
   * @returns
   */
  async delete<ResponseData>(url: string, config: AxiosRequestConfig) {
    try {
      const response = await this._http.delete<ResponseData>(url, config);
      return response;
    } catch (e: any) {
      console.warn(e.message);
    }
  }
}
