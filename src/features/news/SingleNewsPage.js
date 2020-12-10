import React from 'react';

import { useSelector } from 'react-redux';

import { selectNewsById } from './newsSlice';

import { secToString } from '../../utils/secToString';

import { Link } from 'react-router-dom';

import { Section } from '../../components/Section';

import { CommentsList } from './CommentsList';

export const SingleNewsPage = ({ match }) => {

  const { newsId } = match.params;

  const newsData = useSelector(state => selectNewsById(state, newsId));

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
          Number of Comments (root): {newsData.kids ? newsData.kids.length : '0'}
        </p>
        {newsData.kids ?
          <CommentsList commentsIds={newsData.kids}/>
        :
          null
        }
        <Link to="/">Back to news list</Link>
      </article>
    </Section>
  )
}
