import React from 'react';

import parse from 'html-react-parser';
import { decodeEntities } from '../../utils/decodeEntities';
import { secToString } from '../../utils/secToString';
import { NestedCommentList } from './NestedCommentList';

export const RootComment = ({ data }) => {
  const [commentsList, setCommentsList] = React.useState(null);

  const handleCommentClick = () => {
    const nestedCommentListMarkup = <NestedCommentList commentsIds={data.kids}/>;
    setCommentsList(nestedCommentListMarkup)
  }

  return (
    <li
      onClick={data.kids && handleCommentClick}
    >
      {data.kids && (
        <p>{data.kids.length} nested comment('s)</p>
      )}
      <address>by: {data.by}</address>
      <p>Date: <time>{secToString(data.time)}</time></p>
      <h4>Comment text:</h4>
      {parse(decodeEntities(data.text))}
      {data.kids && commentsList}
    </li>
  )
}
