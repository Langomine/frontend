import createClient from "openapi-fetch";
import {paths} from "./schema";

const api = createClient<paths>({ baseUrl: import.meta.env.VITE_API_BASE_URL })

export { api }