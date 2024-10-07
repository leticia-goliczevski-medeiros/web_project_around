export default class API {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  get(path) {
    return fetch(`${path}`, {
      method: "GET",
      headers: this._headers,
    });
  }
}
