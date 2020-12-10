import React from 'react';

import { Comment } from './Comment';

export const CommentsList = ({ commentsIds }) => {
  const listItems = commentsIds.map(id => (
    <Comment
      key={id}
      id={id}
    />
  ))
  return (
    <>
      <ul>
        {listItems}
      </ul>
    </>
  )
}
