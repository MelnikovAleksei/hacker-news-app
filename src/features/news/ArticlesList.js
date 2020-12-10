import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { fetchNews, selectAllNews, selectNewsStatus, selectNewsError } from './newsSlice';

import { Article } from './Article';

export const ArticlesList = () => {
  const dispatch = useDispatch();

  const news = useSelector(selectAllNews);
  const newsStatus = useSelector(selectNewsStatus);
  const newsError = useSelector(selectNewsError);

  React.useEffect(() => {
    const updateNews = setTimeout(() => {
      dispatch(fetchNews());
    }, 60000)

    if (newsStatus === 'idle') {
      dispatch(fetchNews())
    }

    return () => {
      clearTimeout(updateNews);
    }
  }, [newsStatus, dispatch])

  let content;

  if (newsStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if (newsStatus === 'succeeded') {
    content = news.map(story => (
      <li key={story.id} id={story.id}><Article data={story} /></li>
    ))
  } else if (newsStatus === 'failed') {
    content = <div>{newsError}</div>
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
