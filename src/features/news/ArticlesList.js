import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { fetchNews, selectAllNews, selectNewsStatus, selectNewsError } from './newsSlice';

import { Article } from './Article';

import { Section } from '../../components/Section';

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
      <Article key={story.id} data={story} />
    ))
  } else if (newsStatus === 'failed') {
    content = <div>{newsError}</div>
  }

  return (
    <Section>
      <button
        disabled={newsStatus === 'loading'}
        onClick={() => { dispatch(fetchNews()) }}
      >
        {newsStatus === 'loading' ?
          'Updating...'
        :
          'Update News'}
      </button>
      {content}
    </Section>
  )
}
