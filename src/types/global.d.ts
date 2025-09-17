export {};
declare global {
  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }
  interface IModelPaginate<T> {
    data: {
      meta: {
        current: number;
        pageSize: number;
        pages: number;
        total: number;
      };
      result: T[];
    };
  }

  interface ILogin {
    access_token: string;
    // user: {
    //   email: string;
    //   phone: string;
    //   name: string;
    //   role: string;
    //   avatar: string;
    //   id: string;
    // };
    user: IUser;
  }

  interface IRegister {
    _id: string;
    email: string;
    name: string;
  }
  interface IUser {
    email: string;
    phone: string;
    name: string;
    role: {
      _id: string;
      name: string;
    };
    avatar: string;
    _id: string;
    isDeleted: boolean;
  }
  interface IUserTable {
    email: string;
    phone: string;
    name: string;
    role: string;
    _id: string;
    age: number;
    gender: string;
    password: string;
    isDeleted: boolean;
  }
  interface ICreateUser {
    name: string;
    email: string;
    role: string;
    gender: string;
    phone: string;
    age: number;
    password: string;
  }
  interface IFetchAccount {
    user: IUser;
  }

  interface IRole {
    name: string;
    _id: string;
  }
  interface ICategoryTable {
    _id: string;
    name: string;
    createBy: {
      _id: string;
      email: string;
    };
    createdAt: Date;
  }
  interface ICourseTable {
    _id: string;
    title: string;
    description: string;
    thumbnail: string;
    price: number;
    categoryId: string;
    createBy: {
      _id: string;
      email: string;
      name: string;
    };
  }
  interface IChapterTable {
    _id: string;
    title: string;
    order: number;
    courseId: string;
    createBy: {
      _id: string;
      email: string;
    };
    isDeleted: false;
  }
}
