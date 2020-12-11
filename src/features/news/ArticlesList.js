import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { fetchNews, selectAllNews, selectNewsStatus, selectNewsError } from './newsSlice';

import { UPDATE_TIME } from '../../utils/constants/constansts';

import { Article } from './Article';

export const ArticlesList = () => {
  const dispatch = useDispatch();

  const news = useSelector(selectAllNews);
  const newsStatus = useSelector(selectNewsStatus);
  const newsError = useSelector(selectNewsError);

  React.useEffect(() => {
    const updateNews = setTimeout(() => {
      dispatch(fetchNews());
    }, UPDATE_TIME)

    if (newsStatus === 'idle') {
      dispatch(fetchNews())
    }

    return () => {
      clearTimeout(updateNews);
    }
  }, [newsStatus, dispatch])

  let content;

  if (newsStatus === 'loading') {
    content = <p>Loading...</p>
  } else if (newsStatus === 'succeeded') {
    content = news.map(story => (
      <li key={story.id} id={story.id}><Article data={story} /></li>
    ))
  } else if (newsStatus === 'failed') {
    content = <p>{newsError}</p>
  }

  return (
    <>
      <button
        disabled={newsStatus === 'loading'}
        onClick={() => { dispatch(fetchNews()) }}
      >
        {newsStatus === 'loading' ?
          'Updating...'
        :
          'Update News'}
      </button>
      <h2>News list:</h2>
      <ol>
        {content}
      </ol>
    </>
  )
}
