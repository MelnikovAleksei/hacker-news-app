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
    content = news.map(story => (
      <li key={story.id} id={story.id}><Article data={story} /></li>
    ))
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
          'Loading...'
        :
          'Update News'}
      </button>
      <h2>News list {newsStatus === 'loading' && '(loading...)'}:</h2>
      {newsStatus === 'loading' && <p>Loading...</p>}
      <ol>
        {content}
      </ol>
    </>
  )
}
