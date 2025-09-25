import type { ICreateCategory } from "@/components/admin/category/create.category";
import type { ICreateChapter } from "@/components/admin/chapter/create.chapter";
import type { ICreateCourse } from "@/components/admin/courses/create.course";
import type { ICreateLesson } from "@/components/admin/lessons/create.lesson";
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

//APi Course
export const getAllCourse = async (query: string) => {
  await new Promise((r) => setTimeout(r, 1000));
  return axios.get<IModelPaginate<ICourseTable>>(`/courses${query}`);
};
export const getAllCourseByUserId = async (id: string, query: string) => {
  await new Promise((r) => setTimeout(r, 1000));
  return axios.get<IModelPaginate<ICourseTable>>(`/courses/user/${id}${query}`);
};
export const getByCourseId = async (id: string) => {
  return axios.get<IBackendRes<ICourseTable>>(`/courses/${id}`);
};
export const deleteCourse = async (id: string) => {
  return axios.delete<IBackendRes<ICourseTable>>(`courses/${id}`);
};
export const createCourse = async (data: ICreateCourse) => {
  return axios.post<IBackendRes<ICreateCourse>>(`/courses`, data);
};
export const updateCourse = async (data: ICreateCourse, id: string) => {
  await new Promise((r) => setTimeout(r, 2000));
  return axios.put<IBackendRes<ICreateCourse>>(`/courses/${id}`, data);
};
//End Course

//APIs Chapter
export const getAllChapter = async (id: string) => {
  await new Promise((r) => setTimeout(r, 1000));
  return axios.get(`/sections/course/${id}`);
};
export const createChapter = async (data: ICreateChapter) => {
  return axios.post<IBackendRes<ICreateChapter>>(`/sections`, data);
};
export const updateChapter = async (data: ICreateChapter, id: string) => {
  await new Promise((r) => setTimeout(r, 2000));
  return axios.put<IBackendRes<ICreateChapter>>(`/sections/${id}`, data);
};
export const getByChapterId = async (id: string) => {
  return axios.get(`/sections/${id}`);
};
export const deleteChapter = async (id: string) => {
  return axios.delete<IBackendRes<IChapterTable>>(`/sections/${id}`);
};
//End Chapter

//Api Lesson
export const createLesson = async (data: ICreateLesson) => {
  return axios.post(`/lessons`, data);
};
export const getAllApiLesson = async (id: string, query: string) => {
  await new Promise((r) => setTimeout(r, 2000));
  return axios.get<IModelPaginate<ILessonTable>>(
    `/lessons/sectionId/${id}${query}`
  );
};
export const getByLessonId = async (id: string) => {
  return axios.get(`/lessons/${id}`);
};
export const updateLesson = async (id: string, data: ICreateLesson) => {
  await new Promise((r) => setTimeout(r, 2000));
  return axios.put<IBackendRes<ICreateLesson>>(`/lessons/${id}`, data);
};
export const deleteLesson = async (id: string) => {
  return axios.delete<IBackendRes<ILessonTable>>(`/lessons/${id}`);
};
//End

//UploadFile
export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("fileUpload", file);

  const res = await axios.post("/files/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      folder_type: "course",
    },
  });

  return res.data;
};
export const uploadFileLesson = async (file: File) => {
  const formData = new FormData();
  formData.append("fileUpload", file);

  const res = await axios.post("/files/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      folder_type: "lesson",
    },
  });

  return res.data;
};
//End Upload

// upload video to YouTube
export const uploadYoutubeVideo = async (
  file: File,
  data: { title: string; description: string; userId: string }
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("userId", data.userId);
  const res = await axios.post(`/youtube/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

//Role api
export const getByRoleId = async (id: string) => {
  return axios.get<IBackendRes<IRole>>(`/role/${id}`);
};
export const getAllRole = async () => {
  return axios.get<IBackendRes<IRole[]>>(`/role`);
};
