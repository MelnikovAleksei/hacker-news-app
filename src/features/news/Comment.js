import React from 'react';

import parse from 'html-react-parser';
import { decodeEntities } from '../../utils/decodeEntities';
import { secToString } from '../../utils/secToString';

export const Comment = ({ data }) => {
  return (
    <li>
      {data.kids && (
        <p>{data.kids.length} nested comment('s)</p>
      )}
      <address>by: {data.by}</address>
      <p>Date: <time>{secToString(data.time)}</time></p>
      <h4>Comment text:</h4>
      {parse(decodeEntities(data.text))}
    </li>
  )
}
