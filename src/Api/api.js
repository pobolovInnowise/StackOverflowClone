import axios from 'axios';

export const api = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default class Api {
  registerUser = async (username, password) => {
    const api_url = '/api/register';
    const response = await axios.post(api_url, {
      username: username,
      password: password,
    });
    console.log(response.data);
  };

  loginUser = async (username, password) => {
    let api_url = '/api/auth/login';
    let response = await axios.post(api_url, {
      username: username,
      password: password,
    });
    return response;
  };

  logoutUser = async () => {
    const api_url = '/api/auth/logout';
    const response = await axios.post(api_url, {});
    return response;
  };

  getUsers = async (pageNumber, pageSize) => {
    const api_url = `/api/users?page=${pageNumber}&limit=${pageSize}&sortBy=username:ASC`;
    const response = await axios.get(api_url);
    return response;
  };
  getUserProfile = async (userId) => {
    const api_url = `/api/users/${userId}/statistic`;
    const response = await axios.get(api_url);
    return response;
  };
  getSnippets = async (pageNumber, pageSize) => {
    const api_url = `/api/snippets?page=${pageNumber}&limit=${pageSize}&sortBy=username:ASC`;
    const response = await axios.get(api_url);
    return response;
  };

  changeUsername = async (username) => {
    const api_url = `/api/me`;
    const response = await axios.patch(api_url, {
      username: username,
    });
    return response;
  };

  changePassword = async (oldPassword, newPassword) => {
    const api_url = `/api/me/password`;
    const response = await axios.patch(api_url, {
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
    return response;
  };

  postSnippet = async (language, code) => {
    const api_url = `/api/snippets`;
    const response = await axios.post(api_url, {
      code: code,
      language: language,
    });
    return response;
  };

  getSnippetsByUserId = async (id) => {
    const api_url = `/api/snippets?userId=${id}&limit=100`;
    const response = await axios.get(api_url);
    return response;
  };

  postMarkForSnippet = async (snippetId, mark) => {
    const api_url = `/api/snippets/${snippetId}/mark`;
    const response = await axios.post(api_url, {
      mark: mark,
    });
    return response;
  };

  getSnippetLanguages = async () => {
    const api_url = `/api/snippets/languages`;
    const response = await axios.get(api_url);
    return response;
  };

  getQuestions = async (pageNumber, pageSize) => {
    const api_url = `/api/questions?page=${pageNumber}&limit=${pageSize}&sortBy=username:ASC`;
    const response = await axios.get(api_url);
    return response;
  };

  postComment = async (content, snippetId) => {
    const api_url = `/api/comments`;
    const response = await axios.post(api_url, {
      content: content,
      snippetId: snippetId,
    });
    return response;
  };

  postQuestion = async (title, description, code) => {
    const api_url = `/api/questions`;
    const response = await axios.post(api_url, {
      title: title,
      description: description,
      attachedCode: code,
    });
    return response;
  };
}
