import React from 'react';

import { secToString } from '../../utils/secToString';

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { selectNewsById } from './newsSlice';

export const Article = ({ newsId }) => {
  const data = useSelector(state => selectNewsById(state, newsId));
  return (
    <article>
      <h3>
        {data ? data.title : 'Loading title...'}
      </h3>
      <p>
        Rating: {data ? data.score : 'Loading rating...'}
      </p>
      <p>
        By: {data ? data.by : 'Loading author...'}
      </p>
      <p>
        Date: {data ? secToString(data.time) : 'Loading date...'}
      </p>
      {data ?
        <Link to={`/news/${data.id}`}>Go to this news</Link>
      :
        'Loading link...'
      }
    </article>
  )
}
