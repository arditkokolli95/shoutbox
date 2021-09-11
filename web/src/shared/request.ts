import axios from "axios";

export enum APIMethod {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

const prefix = process.env.isProd ? 'https://' : 'http://';

// TODO: supply as env
const URL = 'localhost'
const PORT = 5000

const ApiRequest = axios.create({
  baseURL: `${prefix}${URL}:${PORT}/`,
});

const request = async(url: string, method?: APIMethod, body?: any) => {
  let requestMethod;
  switch (method) {
    case  APIMethod.POST:
      const config = body.getHeaders ? { headers: { ...body.getHeaders() } } : undefined;
      requestMethod = () => ApiRequest.post(url, body, config); 
      break;
    case APIMethod.GET:
    default:
      requestMethod = () => ApiRequest.get(url);
    break;
  }

  const result = await requestMethod();
  const { data, status } = result

  return { result: data, status }
}

export default request;