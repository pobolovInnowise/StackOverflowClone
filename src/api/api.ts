import axios from 'axios';

import { QuestionType } from '../Types/types';

export const api = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

  class Api {


  registerUser = async (username: string, password: string) => {
    const api_url: string = '/api/register';
    const response = await axios.post(api_url, {
      username: username,
      password: password,
    });

  };

  loginUser = async (username: string, password: string) => {
    let api_url: string = '/api/auth/login';
    try {
      let response = await axios.post(api_url, {
        username: username,
        password: password,
      });
      return response;
    } catch (error) {

      return 'error';
    }
  };

  logoutUser = async () => {
    const api_url: string = '/api/auth/logout';
    const response = await axios.post(api_url, {});
    return response;
  };

  getUsers = async (pageNumber: number, pageSize: number) => {
    const api_url: string = `/api/users?page=${pageNumber}&limit=${pageSize}&sortBy=username:ASC`;
    const response = await axios.get(api_url);
    return response;
  };
  getUserProfile = async (userId: number) => {
    const api_url: string = `/api/users/${userId}/statistic`;
    const response = await axios.get(api_url);
    return response;
  };
  getSnippets = async (pageNumber: number, pageSize: number) => {
    const api_url: string = `/api/snippets?page=${pageNumber}&limit=${pageSize}&sortBy=username:ASC`;
    const response = await axios.get(api_url);
    console.log(response);
    return response;
  };

  changeUsername = async (username: string) => {
    const api_url: string = `/api/me`;
    const response = await axios.patch(api_url, {
      username: username,
    });
    return response;
  };

  changePassword = async (oldPassword: string, newPassword: string) => {
    const api_url: string = `/api/me/password`;
    const response = await axios.patch(api_url, {
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
    return response;
  };

  postSnippet = async (language: string, code: string) => {
    const api_url: string = `/api/snippets`;
    const response = await axios.post(api_url, {
      code: code,
      language: language,
    });
    return response;
  };

  getSnippetsByUserId = async (id: number) => {
    const api_url: string = `/api/snippets?userId=${id}&limit=100`;
    const response = await axios.get(api_url);
    return response;
  };

  getQuestionsByUserId = async (id: number) => {
    const resultArray = [];

    const api_url: string = `/api/questions?page=1&limit=100`;
    const response = await axios.get(api_url);
    const questions_100: QuestionType[] = response.data.data.data;
    const totalItemsCount: number = response.data.data.meta.totalItems; // 720

    const myQuestions: QuestionType[] = questions_100.filter(
      (question: QuestionType): boolean => question.user.id === id
    );
    resultArray.push(...myQuestions);

    const pageCount: number = Math.ceil(totalItemsCount / 100); // 7.2 => 8

    if (pageCount > 1) {
      for (let page: number = 2; page <= pageCount; page++) {
        const api_url: string = `/api/questions?page=${page}&limit=100`;
        const response = await axios.get(api_url);
        const questions_100: QuestionType[] = response.data.data.data;
        const myQuestions: QuestionType[] = questions_100.filter(
          (question: QuestionType): boolean => question.user.id === id
        );
        resultArray.push(...myQuestions);
      }
    }

    return resultArray;
  };

  postMarkForSnippet = async (snippetId: number, mark: string) => {
    const api_url: string = `/api/snippets/${snippetId}/mark`;
    const response = await axios.post(api_url, {
      mark: mark,
    });
    return response;
  };

  getSnippetLanguages = async () => {
    const api_url: string = `/api/snippets/languages`;
    const response = await axios.get(api_url);
    return response;
  };

  getQuestions = async (pageNumber: number, pageSize: number) => {
    const api_url: string = `/api/questions?page=${pageNumber}&limit=${pageSize}&sortBy=username:ASC`;
    const response = await axios.get(api_url);
    return response;
  };

  postComment = async (content: string, snippetId: number) => {
    const api_url: string = `/api/comments`;
    const response = await axios.post(api_url, {
      content: content,
      snippetId: snippetId,
    });
    return response;
  };

  postQuestion = async (title: string, description: string, code: string) => {
    const api_url: string = `/api/questions`;
    const response = await axios.post(api_url, {
      title: title,
      description: description,
      attachedCode: code,
    });
    return response;
  };

  deleteAccount = async () => {
    const api_url: string = `/api/me`;
    const response = await axios.delete(api_url);
    return response;
  };

  changeSnippet = async (language: string, code: string, snippetId: number) => {
    const api_url: string = `/api/snippets/${snippetId}`;
    const response = await axios.patch(api_url, {
      code: code,
      language: language,
    });
    return response;
  };

  changeQuestion = async (
    title: string,
    description: string,
    code: string,
    questionId: number
  ) => {
    const api_url: string = `/api/questions/${questionId}`;
    const response = await axios.patch(api_url, {
      title: title,
      description: description,
      attachedCode: code,
    });
    return response;
  };
}



export default new Api();
