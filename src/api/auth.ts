import { api } from "@/lib/api";
import { ILogin, ILoginResponse, ISignup } from "@/types/auth";

export const signup = (user: ISignup): Promise<void> => api.post('/auth/signup', user);

export const login = (user: ILogin): Promise<ILoginResponse> => api.post('/auth/login', user);
