import React from 'react';

import { secToString } from '../../utils/secToString';

import { Link } from 'react-router-dom';

export const Article = ({ data }) => {
  return (
    <article>
      <h3>
        {data.title}
      </h3>
      <p>
        Rating: {data.score}
      </p>
      <p>
        By: {data.by}
      </p>
      <p>
        Date: {secToString(data.time)}
      </p>
      <Link to={`/news/${data.id}`}>Go to this news</Link>
    </article>
  )
}
