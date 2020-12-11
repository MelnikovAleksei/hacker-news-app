import React from 'react';

import { Article } from './Article';

import { useSelector, useDispatch } from 'react-redux';

import { fetchNews, selectNewsStatus, selectNewsError } from './newsSlice';

export const ListItem = ({ id }) => {
  const dispatch = useDispatch();
  const newsStatus = useSelector(selectNewsStatus);
  const newsError = useSelector(selectNewsError)

  React.useEffect(() => {
    dispatch(fetchNews(id))
  }, [id, dispatch])

  let content;

  if (newsStatus === 'loading') {
    content = <Article newsId={id}/>
  } else if (newsStatus === 'succeeded') {
    content = <Article newsId={id}/>
  } else if (newsStatus === 'failed') {
    content = <p>{newsError} news data</p>
  }
  return (
    <li>
      {content}
    </li>
  )
}
