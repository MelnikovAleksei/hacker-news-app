import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { RootComment } from './RootComment';

import {
  fetchRootComments,
  selectNewsById,
  selectAllRootComments,
  selectRootCommentsStatus,
  selectRootCommentsError
} from './newsSlice';

import { secToString } from '../../utils/secToString';

import { UPDATE_TIME } from '../../utils/constants/constansts';

import { Link } from 'react-router-dom';

import { Section } from '../../components/Section';

import { CommentsList } from './CommentsList';

export const SingleNewsPage = ({ match }) => {
  const dispatch = useDispatch();

  const rootComments = useSelector(selectAllRootComments);
  const rootCommentsStatus = useSelector(selectRootCommentsStatus);
  const rootCommentsError = useSelector(selectRootCommentsError);

  const { newsId } = match.params;

  const newsData = useSelector(state => selectNewsById(state, newsId));

  React.useEffect(() => {
    dispatch(fetchRootComments(newsData.kids));
  }, [dispatch, newsData])

  React.useEffect(() => {
    const updateRootComments = setTimeout(() => {
      dispatch(fetchRootComments(newsData.kids));
    }, UPDATE_TIME)

    if (rootCommentsStatus === 'idle') {
      dispatch(fetchRootComments(newsData.kids));
    }

    return () => {
      clearTimeout(updateRootComments);
    }
  }, [dispatch, rootCommentsStatus, newsData.kids])

  let commentsMarkup;

  if (rootCommentsStatus === 'loading') {
    commentsMarkup = (<p>Loading...</p>)
  } else if (rootCommentsStatus === 'succeeded') {
    commentsMarkup = rootComments.map(data =>
      data.deleted ?
        (<li key={data.id}>Comment has been deleted</li>)
      :
        (<RootComment key={data.id} data={data}/>)
    )
  } else if (rootCommentsStatus === 'failed') {
    commentsMarkup = <p>{rootCommentsError}</p>
  }

  const handleClickUpdate = () => {
    newsData.kids && dispatch(fetchRootComments(newsData.kids));
  }

  if (!newsData) {
    return (
        <section>
          <h2>News not found!</h2>
          <Link to="/">Back to news list</Link>
        </section>
    )
  }

  return (
    <Section>
      <article>
        <a
          href={newsData.url}
          target="_blank"
          rel="noreferrer"
        >
          Link to news
        </a>
        <h3>
          {newsData.title}
        </h3>
        <p>
          Date: {secToString(newsData.time)}
        </p>
        <p>
          By: {newsData.by}
        </p>
        <p>
          {newsData.kids ? newsData.descendants : '0'} comment('s)
        </p>
        <button
          type="button"
          onClick={handleClickUpdate}
          disabled={rootCommentsStatus === 'loading'}
        >
          {rootCommentsStatus === 'loading' ?
            'Loading...'
          :
            'Update comments'
          }
        </button>
        {newsData.kids && <CommentsList>{commentsMarkup}</CommentsList>}
        <Link to="/">Back to news list</Link>
      </article>
    </Section>
  )
}
