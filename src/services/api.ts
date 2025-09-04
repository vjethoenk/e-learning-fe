import axios from "services/axios.customize";
export const callLogin = async (username: string, password: string) => {
  await new Promise((r) => setTimeout(r, 1000));
  return axios.post<IBackendRes<ILogin>>("/auth/login", {
    username,
    password,
  });
};

export const callRegister = async (
  fullName: string,
  email: string,
  password: string,
  phone: string
) => {
  await new Promise((r) => setTimeout(r, 1000));
  return axios.post<IBackendRes<IRegister>>("/user/register", {
    fullName,
    email,
    password,
    phone,
  });
};
export const callFetchAccount = async () => {
  await new Promise((r) => setTimeout(r, 2000));
  return axios.get<IBackendRes<IFetchAccount>>("/auth/account");
};

export const callLogout = () => {
  return axios.post<IBackendRes<IUser>>("/auth/logout");
};
