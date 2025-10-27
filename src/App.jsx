import './App.css';
import UsersPage from './Pages/UsersPage/UsersPage.tsx';
import store from './Redux/reduxStore.ts';
import { Provider } from 'react-redux';
import Header from './Components/Header/Header.tsx';
import Navbar from './Components/Navbar/Navbar.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserProfilePage from './Pages/UserProfilePage/UserProfilePage.tsx';
import HomePage from './Pages/HomePage/HomePage.tsx';
import AccountPage from './Pages/AccountPage/AccountPage.tsx';
import LoginPage from './Pages/LoginPage/LoginPage.tsx';
import RegistrationPage from './Pages/RegistrationPage/RegistrationPage.tsx';
import PostSnippetPage from './Pages/PostSnippetPage/PostSnippetPage.tsx';
import MySnippetsPage from './Pages/MySnippetsPage/MySnippetsPage.tsx';
import PostPage from './Pages/PostPage/PostPage.tsx';
import QuestionsPage from './Pages/QuestionsPage/QuestionsPage.tsx';
import AskQuestionPage from './Pages/AskQuestionPage/AskQuestionPage.tsx';
import EditSnippetPage from './Pages/EditSnippetPage/EditSnippetPage.tsx';
import MyQuestions from './Pages/MyQuestions/MyQuestions.tsx';
import EditQuestionPage from './Pages/EditQuestionPage/EditQuestionPage.tsx';

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
              <Route path={'/my-questions'} element={<MyQuestions />} />
              <Route path={'/ask-question'} element={<AskQuestionPage />} />
              <Route path={'/edit-snippet'} element={<EditSnippetPage />} />
              <Route
                path={'/edit-question-page'}
                element={<EditQuestionPage />}
              />
            </Routes>
          </div>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
