// import React, { useEffect, useState } from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import Snippet from '../Snippet/Snippet.jsx';
// import styles from './PostPage.module.css';
// import {getSnippetsFromServerTC, postCommentTC} from '../../Redux/homePageReducer.js';
//
// const PostPage = (props) => {
//
//   const [comment, setComment] = useState('');
//   const dispatch= useDispatch();
//   const snippets = useSelector((state) => state.homePage.snippets);
//
//   const onInputCommentChange = (e) => {
//     setComment(e.target.value);
//   };
//
//   const snippet = snippets.filter(
//     (snippet) => snippet.id === props.selectedSnippetId
//   )[0];
//   const comments = snippet.comments.map((comment) => (
//     <div className={styles.comment} key={comment.id}>
//       {comment.content}
//     </div>
//   ));
//   const onSendCommandButtonClick = () => {
//     dispatch(postCommentTC(comment,snippet.id))
//     setComment('');
//   };
//
//   //pooling
//   useEffect(() => {
//
//     const intervalId = setInterval(() => {
//       dispatch(getSnippetsFromServerTC())
//     }, 1000);
//     return () => clearInterval(intervalId);
//   }, []);
//
//   return (
//     <div className={styles.postPage}>
//       <div className={styles.snippetWrapper}>
//         <Snippet snippet={snippet} />
//       </div>
//
//       <div className={styles.commentsSection}>
//         <div className={styles.commentsTitle}>
//           Comments related to the snippet:
//         </div>
//         <div className={styles.commentsList}>{comments}</div>
//       </div>
//
//       <div className={styles.commentInputSection}>
//         <input
//           className={styles.commentInput}
//           placeholder="Your comment..."
//           value={comment}
//           onChange={onInputCommentChange}
//         />
//         <button
//           className={styles.commentButton}
//           onClick={onSendCommandButtonClick}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };
//
// export default PostPage;
import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import Snippet from "../Snippet/Snippet.jsx";
import styles from './PostPage.module.css';
import Api from '../../Api/api.js'
import {setSnippetsAC} from "../../Redux/homePageReducer.js";



const PostPage = (props) => {

    const api = new Api();

    const [comment, setComment] = useState("");

    const onInputCommentChange = (e) => {
        setComment(e.target.value);
    }

    const snippet = props.snippets.filter((snippet)=>snippet.id===props.selectedSnippetId)[0];
    const comments = snippet.comments.map((comment)=><div className={styles.comment} key={comment.id}>{comment.content}</div>)
    const onSendCommandButtonClick = () => {
        api.postComment(comment, snippet.id);
        setComment('');
    }


    useEffect(()=>{
        const getData = async () => {
            const response = await api.getSnippets(props.currentPage, props.pageSize);
            const snippetsFromServer = response.data.data.data;
            props.setSnippets(snippetsFromServer);
        }
        const intervalId = setInterval(()=>{
            getData();
        },1000)
        return () => clearInterval(intervalId);
    },[])


    return (
        <div className={styles.postPage}>
            <div className={styles.snippetWrapper}>
                <Snippet snippet={snippet}/>
            </div>

            <div className={styles.commentsSection}>
                <div className={styles.commentsTitle}>Comments related to the snippet:</div>
                <div className={styles.commentsList}>
                    {comments}
                </div>
            </div>

            <div className={styles.commentInputSection}>
                <input
                    className={styles.commentInput}
                    placeholder="Your comment..."
                    value={comment}
                    onChange={onInputCommentChange}
                />
                <button className={styles.commentButton} onClick={onSendCommandButtonClick}>
                    Send
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        selectedSnippetId: state.homePage.selectedSnippetId,
        snippets: state.homePage.snippets,
        currentPage: state.homePage.currentPage,
        pageSize: state.homePage.pageSize,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSnippets: (snippets)=>dispatch(setSnippetsAC(snippets)),

    }
}

export default connect (mapStateToProps, mapDispatchToProps)(PostPage);

// "comments": [
//     {
//         "id": "195",
//         "content": "string"
//     },