class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _handleOriginalResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  getItemById(id) {
    return fetch(`${this._url}/v0/item/${id}.json`, {
      method: 'GET',
      headers: this._headers
    }).then(this._handleOriginalResponse)
  }

  getNewStoriesIds() {
    return fetch(`${this._url}/v0/topstories.json?print=pretty&orderBy="$key"&limitToFirst=100`, {
      method: 'GET',
      headers: this._headers
    }).then(this._handleOriginalResponse)
  }
}

export const api = new Api({
  baseUrl: 'https://hacker-news.firebaseio.com',
  headers: {
    'Content-Type': 'application/json'
  }
});
