import type { ICreateCategory } from "@/components/admin/category/create.category";
import type { ICreateChapter } from "@/components/admin/chapter/create.chapter";
import type { ICreateCourse } from "@/components/admin/courses/create.course";
import type { ICreateLesson } from "@/components/admin/lessons/create.lesson";
import type { AxiosResponse } from "axios";
import axios from "services/axios.customize";
export const callLogin = async (username: string, password: string) => {
  await new Promise((r) => setTimeout(r, 1000));
  return axios.post<IBackendRes<ILogin>>("/auth/login", {
    username,
    password,
  });
};

export const callRegister = async (
  name: string,
  email: string,
  password: string,
  phone: number
) => {
  await new Promise((r) => setTimeout(r, 1000));
  return axios.post<IBackendRes<IRegister>>("/users/register", {
    name,
    email,
    password,
    phone,
  });
};
export const callFetchAccount = async (): Promise<AxiosResponse<IBackendRes<IFetchAccount>>> => {
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
  // await new Promise((r) => setTimeout(r, 2000));
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
  //await new Promise((r) => setTimeout(r, 2000));
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
export const getChapterLessonCount = async (id: string) => {
  return axios.get(`/lessons/count/${id}`);
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
export const uploadFileCategory = async (file: File) => {
  const formData = new FormData();
  formData.append("fileUpload", file);

  const res = await axios.post("/files/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      folder_type: "category",
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

//Payment
export const createPayment = async (
  userId: string,
  courseId: string,
  amount: number
) => {
  return await axios.post("/payment/create", {
    userId,
    courseId,
    amount,
  });
};
export const checkCourse = async (user_id: string, course_id: string) => {
  return axios.get(`enrollments/check?userId=${user_id}&courseId=${course_id}`);
};

//Quiz Api
export const getAllQuiz = async (id: string) => {
  // await new Promise((r) => setTimeout(r, 2000));
  return axios.get(`/quizzes/${id}`);
};
export const getAllQuestions = async (id: string) => {
  await new Promise((r) => setTimeout(r, 2000));
  return axios.get(`/quizzes/questions/${id}`);
};
export const createQuiz = async (id: string, data: {}) => {
  return await axios.post(`/quizzes/${id}`, data);
};
export const createQuestions = async (id: string, data: any) => {
  return await axios.post(`/quizzes/${id}/questions`, data);
};
export const createAnswers = async (id: string, data: {}) => {
  return await axios.post(`/quizzes/questions/${id}/answers`, data);
};
export const getQuestionById = async (id: string) => {
  return await axios.get(`/quizzes/ques/${id}`);
};
//end

export const getUserChats = (userId: string) =>
  axios.get(`/chats/user/${userId}`);

export const getMessages = (chatId: string) =>
  axios.get(`/chats/${chatId}/messages`);

export const createChat = (participants: string[]) =>
  axios.post(`/chats`, { participants });

export const sendMessage = (
  chatId: string,
  senderId: string,
  content: string
) => axios.post(`/chats/${chatId}/messages`, { senderId, content });

export const getOrCreateChat = (userId: string, teacherId: string) =>
  axios.post("/chats/get-or-create", { userId, teacherId });

export const markAsRead = (chatId: string, userId: string) =>
  axios.post(`/api/chats/${chatId}/messages/read`, { userId });
//post
export const getAllPost = async (query: string = "") => {
  return axios.get<IModelPaginate<IPostTable>>(`/posts${query}`);
};


// Lấy chi tiết 1 bài viết theo ID
export const getPostById = async (id: string) => {
  return axios.get<IBackendRes<IPostTable>>(`/posts/${id}`);
};

// Tạo mới bài viết
export const createPost = async (data: ICreatePost) => {
  return axios.post<IBackendRes<IPostTable>>(`/posts`, data);
};

// Cập nhật bài viết theo ID
export const updatePost = async (id: string, data: IUpdatePost) => {
  await new Promise((r) => setTimeout(r, 1000));
  return axios.patch<IBackendRes<IPostTable>>(`/posts/${id}`, data);
};

// Xoá mềm bài viết
export const deletePost = async (id: string) => {
  return axios.delete<IBackendRes<IPostTable>>(`/posts/${id}`);
};

// Upload file thumbnail (nếu cần upload ảnh cho bài viết)
export const uploadFilePost = async (file: File) => {
  const formData = new FormData();
  formData.append("fileUpload", file);

  const res = await axios.post("/files/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      folder_type: "post",
    },
  });

  return res.data;
};
