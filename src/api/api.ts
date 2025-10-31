import axios from 'axios';

import { QuestionType } from '../Types/types';

export const api_axios = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

class Api {

  registerUser = async (username: string, password: string) => {
    const api_url = '/api/register';
    try {
      const response = await api_axios.post(api_url, { username, password });
      return response;
    } catch (error) {
      throw error;
    }
  };

  loginUser = async (username: string, password: string) => {
    const api_url = '/api/auth/login';
    try {
      const response = await api_axios.post(api_url, { username, password });
      return response;
    } catch (error) {
      throw error;
    }
  };

  logoutUser = async () => {
    const api_url = '/api/auth/logout';
    try {
      const response = await api_axios.post(api_url, {});
      return response;
    } catch (error) {
      throw error;
    }
  };

  getUsers = async (pageNumber: number, pageSize: number) => {
    const api_url = `/api/users?page=${pageNumber}&limit=${pageSize}&sortBy=username:ASC`;
    try {
      const response = await api_axios.get(api_url);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getUserProfile = async (userId: number) => {
    const api_url = `/api/users/${userId}/statistic`;
    try {
      const response = await api_axios.get(api_url);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getSnippets = async (pageNumber: number, pageSize: number) => {
    const api_url = `/api/snippets?page=${pageNumber}&limit=${pageSize}&sortBy=username:ASC`;
    try {
      const response = await api_axios.get(api_url);
      return response;
    } catch (error) {
      return { error };
    }
  };

  changeUsername = async (username: string) => {
    const api_url = '/api/me';
    try {
      const response = await api_axios.patch(api_url, { username });
      return response;
    } catch (error) {
      throw error;
    }
  };

  changePassword = async (oldPassword: string, newPassword: string) => {
    const api_url = '/api/me/password';
    try {
      const response = await api_axios.patch(api_url, { oldPassword, newPassword });
      return response;
    } catch (error) {
      throw error;
    }
  };

  postSnippet = async (language: string, code: string) => {
    const api_url = '/api/snippets';
    try {
      const response = await api_axios.post(api_url, { code, language });
      return response;
    } catch (error) {
      throw error;
    }
  };

  getSnippetsByUserId = async (id: number) => {
    const api_url = `/api/snippets?userId=${id}&limit=100`;
    try {
      const response = await api_axios.get(api_url);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getQuestionsByUserId = async (id: number) => {
    try {
      const resultArray = [];
      const firstPageUrl = `/api/questions?page=1&limit=100`;
      const response = await api_axios.get(firstPageUrl);
      const questions_100: QuestionType[] = response.data.data.data;
      const totalItemsCount: number = response.data.data.meta.totalItems;
      const myQuestions = questions_100.filter(q => q.user.id === id);
      resultArray.push(...myQuestions);
      const pageCount = Math.ceil(totalItemsCount / 100);
      for (let page = 2; page <= pageCount; page++) {
        const url = `/api/questions?page=${page}&limit=100`;
        const resp = await api_axios.get(url);
        const questions_100: QuestionType[] = resp.data.data.data;
        const myQuestions = questions_100.filter(q => q.user.id === id);
        resultArray.push(...myQuestions);
      }
      return resultArray;
    } catch (error) {
      throw error;
    }
  };

  postMarkForSnippet = async (snippetId: number, mark: string) => {
    const api_url = `/api/snippets/${snippetId}/mark`;
    try {
      const response = await api_axios.post(api_url, { mark });
      return response;
    } catch (error) {
      throw error;
    }
  };

  getSnippetLanguages = async () => {
    const api_url = '/api/snippets/languages';
    try {
      const response = await api_axios.get(api_url);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getQuestions = async (pageNumber: number, pageSize: number) => {
    const api_url = `/api/questions?page=${pageNumber}&limit=${pageSize}&sortBy=username:ASC`;
    try {
      const response = await api_axios.get(api_url);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postComment = async (content: string, snippetId: number) => {
    const api_url = '/api/comments';
    try {
      const response = await api_axios.post(api_url, { content, snippetId });
      return response;
    } catch (error) {
      throw error;
    }
  };

  postQuestion = async (title: string, description: string, code: string) => {
    const api_url = '/api/questions';
    try {
      const response = await api_axios.post(api_url, { title, description, attachedCode: code });
      return response;
    } catch (error) {
      throw error;
    }
  };

  deleteAccount = async () => {
    const api_url = '/api/me';
    try {
      const response = await api_axios.delete(api_url);
      return response;
    } catch (error) {
      throw error;
    }
  };

  changeSnippet = async (language: string, code: string, snippetId: number) => {
    const api_url = `/api/snippets/${snippetId}`;
    try {
      const response = await api_axios.patch(api_url, { code, language });
      return response;
    } catch (error) {
      throw error;
    }
  };

  changeQuestion = async (title: string, description: string, code: string, questionId: number) => {
    const api_url = `/api/questions/${questionId}`;
    try {
      const response = await api_axios.patch(api_url, { title, description, attachedCode: code });
      return response;
    } catch (error) {
      throw error;
    }
  };

  getMe = async () => {
    const api_url = '/api/me';
    try {
      const response = await api_axios.get(api_url);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export default new Api();
