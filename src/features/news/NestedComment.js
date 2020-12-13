import React from 'react';

import { api } from '../../api/api';

import { NestedCommentList } from './NestedCommentList';

import parse from 'html-react-parser';
import { decodeEntities } from '../../utils/decodeEntities';
import { secToString } from '../../utils/secToString';


export const NestedComment = ({ id }) => {
  const [commentsList, setCommentsList] = React.useState(null);
  const [commentData, setCommentData] = React.useState({});

  React.useEffect(() => {
    api.getItemById(id)
      .then(
        (data) => {
          data.text = decodeEntities(data.text);
          setCommentData(data);
        },
        (err) => {
          console.log(err)
        }
      )
  }, [id])

  const handleCommentClick = () => {
      setCommentsList((
        <NestedCommentList commentsIds={commentData.kids}/>
      ))
  }

  return (
    commentData.deleted ?
      <li key={commentData.id}>Comment has been deleted</li>
    :
      <li
        onClick={commentData.kids && handleCommentClick}
      >
        {commentData.kids && (
          <p>{commentData.kids.length} nested comment('s)</p>
        )}
        <address>by: {commentData.by}</address>
        <p>Date: <time>{secToString(commentData.time)}</time></p>
        <h4>Comment text:</h4>
        {parse(decodeEntities(commentData.text))}
        {commentsList}
      </li>
  )
}
