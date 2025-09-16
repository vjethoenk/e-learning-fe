import type { ICreateCategory } from "@/components/admin/category/create.category";
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

//User
export const callUserApi = async (query: string) => {
  await new Promise((r) => setTimeout(r, 1000));
  return axios.get<IModelPaginate<IUserTable>>(`/users${query}`);
};
export const createUser = async (data: ICreateUser) => {
  return axios.post<IBackendRes<ICreateUser>>(`/users`, data);
};
export const updateUser = async (data: ICreateUser, id: string) => {
  await new Promise((r) => setTimeout(r, 2000));
  return axios.put<IBackendRes<ICreateUser>>(`/users/${id}`, data);
};
export const deleteUser = async (id: string) => {
  return axios.delete<IBackendRes<IUserTable>>(`users/${id}`);
};
export const getByUserId = async (id: string) => {
  return axios.get<IBackendRes<IUserTable>>(`users/${id}`);
};
//End User

//Category
export const getAllCategory = async (query: string) => {
  await new Promise((r) => setTimeout(r, 1000));
  return axios.get<IModelPaginate<ICategoryTable>>(`/category${query}`);
};
export const getByCategoryId = async (id: string) => {
  return axios.get<IBackendRes<ICategoryTable>>(`category/${id}`);
};
export const createCategory = async (data: ICreateCategory) => {
  return axios.post<IBackendRes<ICreateCategory>>(`/category`, data);
};
export const updateCategory = async (data: ICreateCategory, id: string) => {
  await new Promise((r) => setTimeout(r, 2000));
  return axios.put<IBackendRes<ICreateCategory>>(`/category/${id}`, data);
};
export const deleteCategory = async (id: string) => {
  return axios.delete<IBackendRes<ICategoryTable>>(`category/${id}`);
};
//End Category

//Role api
export const getByRoleId = async (id: string) => {
  return axios.get<IBackendRes<IRole>>(`/role/${id}`);
};
export const getAllRole = async () => {
  return axios.get<IBackendRes<IRole[]>>(`/role`);
};
