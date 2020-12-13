import React from 'react';

import parse from 'html-react-parser';
import { decodeEntities } from '../../utils/decodeEntities';
import { secToString } from '../../utils/secToString';
import { NestedCommentList } from './NestedCommentList';

export const RootComment = ({ data }) => {
  const [commentsList, setCommentsList] = React.useState(null);
  const [commentData, setCommentData] = React.useState({});

  React.useEffect(() => {
    setCommentData(data);
  }, [data])

  const handleCommentClick = () => {
    const nestedCommentListMarkup = <NestedCommentList commentsIds={commentData.kids}/>;
    setCommentsList(nestedCommentListMarkup)
  }

  return (
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
      {commentData.kids && commentsList}
    </li>
  )
}
