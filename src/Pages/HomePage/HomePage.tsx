import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import {
  setSelectedSnippetIdAC,
  setCurrentPageAC,
  getSnippetsFromServerTC,
} from '../../Redux/homePageReducer';
import Snippet from '../Snippet/Snippet.js';
import { useNavigate } from 'react-router-dom';
import Paginator from '../../Components/Paginator/Paginator';
import { SnippetType } from '../../Types/types';

const HomePage = () => {
  const navigate = useNavigate();

  const snippets: SnippetType[] = useAppSelector(
    (state) => state.homePage.snippets
  );
  const totalSnippetsCount: number = useAppSelector(
    (state) => state.homePage.totalSnippetsCount
  );
  const isFetching: boolean = useAppSelector(
    (state) => state.homePage.isFetching
  );
  const pageSize: number = useAppSelector((state) => state.homePage.pageSize);
  const currentPage: number = useAppSelector(
    (state) => state.homePage.currentPage
  );

  const dispatch = useAppDispatch();

  const pagesCount = Math.ceil(totalSnippetsCount / pageSize);

  const onSnippetClick = (id: number) => {
    dispatch(setSelectedSnippetIdAC(id));
    navigate('/snippet-details');
  };

  const snippetsElements = snippets.map((snippet: SnippetType) => (
    <div key={snippet.id}>
      <Snippet snippet={snippet} onCommentClick={onSnippetClick}></Snippet>
    </div>
  ));

  useEffect(() => {
    dispatch(getSnippetsFromServerTC());
  }, [currentPage]);

  return (
    <div>
      <div>
        <Paginator
          pagesCount={pagesCount}
          currentPage={currentPage}
          callback={(currentPage: number) =>
            dispatch(setCurrentPageAC(currentPage))
          }
        />
      </div>
      <div>{isFetching ? 'Loading, please wait...' : snippetsElements}</div>
    </div>
  );
};

export default HomePage;
