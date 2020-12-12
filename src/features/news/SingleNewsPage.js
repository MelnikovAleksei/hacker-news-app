import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { fetchRootComments, selectNewsById, selectAllRootComments, selectRootCommentsStatus, selectRootCommentsError } from './newsSlice';

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
    const updateRootComments = setTimeout(() => {
      newsData.kids && dispatch(fetchRootComments(newsData.kids));
    }, UPDATE_TIME)

    newsData.kids && dispatch(fetchRootComments(newsData.kids));

    return () => {
      clearTimeout(updateRootComments);
    }
  }, [dispatch, newsData])

  if (!newsData) {
    return (
        <section>
            <h2>News not found!</h2>
            <Link to="/">Back to news list</Link>
        </section>
    )
  }

  let commentsMarkup;

  if (rootCommentsStatus === 'loading') {
    commentsMarkup = (<CommentsList data={Object.values(rootComments)}/>);
  } else if (rootCommentsStatus === 'succeeded') {
    commentsMarkup = (<CommentsList data={Object.values(rootComments)}/>);
  } else if (rootCommentsStatus === 'failed') {
    commentsMarkup = <p>{rootCommentsError}</p>
  }

  const handleClickUpdate = () => {
    newsData.kids && dispatch(fetchRootComments(newsData.kids));
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
          {newsData.kids ? newsData.kids.length : '0'} root comment('s)
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
        {commentsMarkup}
        <Link to="/">Back to news list</Link>
      </article>
    </Section>
  )
}
