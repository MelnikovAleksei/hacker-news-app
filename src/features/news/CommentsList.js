import React from 'react';

import { Comment } from './Comment';

export const CommentsList = ({ data }) => {
  const listItems = data.map(item => (
    <Comment
      key={item.id}
      data={item}
    />
  ))
  return (
    <ul>
      {listItems}
    </ul>
  )
}
