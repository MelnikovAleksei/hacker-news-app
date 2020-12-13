const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();

export const decodeEntities = (str) => {
  return entities.decode(str);
}
