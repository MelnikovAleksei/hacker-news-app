import React from 'react';

import { NestedComment } from './NestedComment';

export const NestedCommentList = ({ commentsIds }) => {
  const [listComments, setListComments] = React.useState(null);
  React.useEffect(() => {
    const listItems = commentsIds.map(id => (
      <NestedComment key={id} id={id}/>
    ))
    setListComments(listItems);
  }, [commentsIds])
  return (
    <ul>
      {listComments}
    </ul>
  )
}
