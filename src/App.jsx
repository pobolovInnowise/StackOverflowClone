import './App.css';
import UsersPage from './Pages/UsersPage/UsersPage.jsx';
import store from './Redux/reduxStore.js';
import { Provider } from 'react-redux';
import Header from './Components/Header/Header.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserProfilePage from './Pages/UserProfilePage/UserProfilePage.jsx';
import HomePage from './Pages/HomePage/HomePage.jsx';
import AccountPage from './Pages/AccountPage/AccountPage.jsx';
import LoginPage from './Pages/LoginPage/LoginPage.jsx';
import RegistrationPage from './Pages/RegistrationPage/RegistrationPage.jsx';
import PostSnippetPage from './Pages/PostSnippetPage/PostSnippetPage.jsx';
import MySnippetsPage from './Pages/MySnippetsPage/MySnippetsPage.jsx';
import PostPage from './Pages/PostPage/PostPage.jsx';
import QuestionsPage from './Pages/QuestionsPage/QuestionsPage.jsx';
import AskQuestionPage from './Pages/AskQuestionPage/AskQuestionPage.jsx';

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Provider store={store}>
          <Header />
          <Navbar />
          <div className="content">
            <Routes>
              <Route path={'/'} element={<HomePage />} />
              <Route path={'/users'} element={<UsersPage />} />
              <Route path={'/profile'} element={<UserProfilePage />} />
              <Route path={'/home'} element={<HomePage />} />
              <Route path={'/my-account'} element={<AccountPage />} />
              <Route path={'/login'} element={<LoginPage />} />
              <Route path={'/register'} element={<RegistrationPage />} />
              <Route path={'/post-snippet'} element={<PostSnippetPage />} />
              <Route path={'/my-snippets'} element={<MySnippetsPage />} />
              <Route path={'/snippet-details'} element={<PostPage />} />
              <Route path={'/questions'} element={<QuestionsPage />} />
              <Route path={'/ask-question'} element={<AskQuestionPage />} />
            </Routes>
          </div>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
