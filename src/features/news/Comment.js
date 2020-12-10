import React from 'react';

import { api } from '../../api/api';
import { CommentsList } from './CommentsList';

import parse from 'html-react-parser';
import { decodeEntities } from '../../utils/decodeEntities';
import { secToString } from '../../utils/secToString';

export const Comment = ({ id }) => {
  const [isLoadingCommentData, setIsLoadingCommentData] = React.useState(false);
  const [commentsList, setCommentsList] = React.useState(null);
  const [commentData, setCommentData] = React.useState({});

  React.useEffect(() => {
    setIsLoadingCommentData(true);
    api.getItemById(id)
      .then(
        (data) => {
          data.text = parse(decodeEntities(data.text));
          setCommentData(data);
        },
        (err) => {
          console.log(err)
        }
      )
      .finally(() => {
        setIsLoadingCommentData(false);
      })
  }, [id])

  const handleCommentClick = () => {
      setCommentsList((
        <CommentsList commentsIds={commentData.kids}/>
      ))

  }

  return (
    <>

      <li
        onClick={commentData.kids && handleCommentClick}
      >
        {commentData.kids && (
          <p>{commentData.kids.length} nested comment('s)</p>
        )}
        <p>by: {commentData.by}</p>
        <p>Date: {secToString(commentData.time)}</p>
        <h4>Comment text:</h4>
        {isLoadingCommentData ?
          'Loading...'
        :
          commentData.text
        }
        {commentsList}
      </li>
    </>
  )
}
