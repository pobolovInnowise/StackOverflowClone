import './App.css';
import UsersPage from './Pages/UsersPage/UsersPage';
import store from './Redux/reduxStore';
import { Provider } from 'react-redux';
import Header from './Components/Header/Header';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserProfilePage from './Pages/UserProfilePage/UserProfilePage';
import HomePage from './Pages/HomePage/HomePage';
import AccountPage from './Pages/AccountPage/AccountPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegistrationPage from './Pages/RegistrationPage/RegistrationPage';
import PostSnippetPage from './Pages/PostSnippetPage/PostSnippetPage';
import MySnippetsPage from './Pages/MySnippetsPage/MySnippetsPage';
import PostPage from './Pages/PostPage/PostPage';
import QuestionsPage from './Pages/QuestionsPage/QuestionsPage';
import AskQuestionPage from './Pages/AskQuestionPage/AskQuestionPage';
import EditSnippetPage from './Pages/EditSnippetPage/EditSnippetPage';
import MyQuestions from './Pages/MyQuestions/MyQuestions';
import EditQuestionPage from './Pages/EditQuestionPage/EditQuestionPage';


const App: React.FC = () => {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Provider store={store}>
          <Header />
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/my-account" element={<AccountPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/post-snippet" element={<PostSnippetPage />} />
              <Route path="/my-snippets" element={<MySnippetsPage />} />
              <Route path="/snippet-details" element={<PostPage />} />
              <Route path="/questions" element={<QuestionsPage />} />
              <Route path="/my-questions" element={<MyQuestions />} />
              <Route path="/ask-question" element={<AskQuestionPage />} />
              <Route path="/edit-snippet" element={<EditSnippetPage />} />
              <Route path="/edit-question-page" element={<EditQuestionPage />} />
            </Routes>
          </div>
        </Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;