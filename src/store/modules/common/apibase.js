import axios from "axios";

export class APIBase {
  constructor(apiUrl, apiKey) {
    this.apiUrl = apiUrl;
    if (apiKey) {
      this.apiKey = apiKey;
    }
  }

  async get(queryUrl) {
    return await axios.get(this.apiUrl + queryUrl, {
      headers: this.getApiKeyHeader(),
      data: {}
    });
  }

  async post(param) {
    return await axios.post(this.apiUrl, param, {
      headers: this.getApiKeyHeader()
    });
  }

  getApiKeyHeader() {
    if (this.apiKey) {
      return { "Content-type": "application/json", Authorization: this.apiKey };
    } else {
      return { "Content-type": "application/json" };
    }
  }
}
