import React from 'react';

import { secToString } from '../../utils/secToString';

import { Link } from 'react-router-dom';

export const Article = ({ data }) => {
  return (
    <article>
      <header>
        <h3>
          {data.title}
        </h3>
      </header>
      <p>
        The story's score: {data.score}
      </p>
      <address>
        By: {data.by}
      </address>
      <footer>
        <p>
          Date: <time>{secToString(data.time)}</time>
        </p>
      </footer>
      <Link to={`/news/${data.id}`}>Go to this news</Link>
    </article>
  )
}
