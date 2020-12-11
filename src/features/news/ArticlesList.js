import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { fetchNewsIds, selectAllNewsIds, selectNewsIdsStatus, selectNewsIdsError } from './newsSlice';

import { UPDATE_TIME } from '../../utils/constansts/constants';

import { ListItem } from './ListItem';

export const ArticlesList = () => {
  const dispatch = useDispatch();

  const newsIds = useSelector(selectAllNewsIds);
  const newsIdsStatus = useSelector(selectNewsIdsStatus);
  const newsIdsError = useSelector(selectNewsIdsError);

  React.useEffect(() => {
    const updateNewsIds = setTimeout(() => {
      dispatch(fetchNewsIds());
    }, UPDATE_TIME)

    if (newsIdsStatus === 'idle') {
      dispatch(fetchNewsIds())
    }

    return () => {
      clearTimeout(updateNewsIds);
    }
  }, [newsIdsStatus, dispatch])

  let content;

  if (newsIdsStatus === 'loading') {
    content = newsIds.map(id => (
      <ListItem key={id} id={id} />
    ))
  } else if (newsIdsStatus === 'succeeded') {
    content = newsIds.map(id => (
      <ListItem key={id} id={id} />
    ))
  } else if (newsIdsStatus === 'failed') {
    content = <p>{newsIdsError} news ids</p>
  }

  return (
    <>
      <button
        disabled={newsIdsStatus === 'loading'}
        onClick={() => { dispatch(fetchNewsIds()) }}
      >
        {newsIdsStatus === 'loading' ?
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
