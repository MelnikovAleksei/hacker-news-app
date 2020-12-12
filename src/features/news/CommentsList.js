import React from 'react';

import { RootComment } from './RootComment';

export const CommentsList = ({ data }) => {
  const listItems = data.map(item => item.deleted ? (<li key={item.id}>Comment has been deleted</li>) : (<RootComment key={item.id} data={item}/>));

  return (
    <ul>
      {listItems}
    </ul>
  )
}
