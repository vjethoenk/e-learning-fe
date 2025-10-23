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
    address: string;
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
  interface IProfileUser {
    name: string;
    email: string;
    gender: string;
    phone: string;
    age: number;
    address: string;
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
    thumbnail: string;
    description: string;
    color: string;
    icon: string;
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
    createdAt: date;
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
    lessonCount?: number;
  }
  interface ILessonTable {
    _id: string;
    title: string;
    description: string;
    sectionId: {
      _id: string;
      title: string;
    };
    videoId: string;
    thumbnail: string;
    duration: number;
    order: number;
    createBy: {
      _id: string;
      email: string;
    };
    isDeleted: boolean;
  }
  interface IQuizTable {
    _id: string;
    section_id: string;
    title: string;
  }

  interface IQuestionsTable {
    _id: string;
    quiz_id: string;
    questionText: string;
    answers: IAnswersTable[];
  }
  interface IAnswersTable {
    _id: string;
    question_id: string;
    answerText: string;
    order: number;
    isCorrect: false;
  }

  interface IListChat {
    _id: string;
    participants: string[];
    otherUser: IUserTable;
    lastMessage: {
      _id: string;
      chatId: string;
      senderId: string | IUserTable;
      content: string;
      updatedAt: Date;
      readBy?: string[];
    };
  }
  interface IPostTable {
    _id: string;
    title: string;
    thumbnail: string;
    content: string;
    slug: string;
    authorId?: string;
    createBy: {
      _id: string;
      email: string;
      name: string;
    };
    updateBy?: {
      _id: string;
      email: string;
    };
    deleteBy?: {
      _id: string;
      email: string;
    };
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    deletedAt?: Date;
  }

  interface ICreatePost {
    title: string;
    content: string;
    slug?: string;
    authorId?: string;
  }

  interface IUpdatePost {
    title?: string;
    content?: string;
    slug?: string;
    authorId?: string;
  }
}
