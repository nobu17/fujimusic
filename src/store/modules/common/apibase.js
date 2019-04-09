import axios from "axios";

export class APIBase {
  constructor(apiUrl, apiKey) {
    this.apiUrl = apiUrl;
    if (apiKey) {
      this.apiKey = apiKey;
    }
  }

  async getWithFullUrl(fullUrl) {
    return await axios.get(fullUrl, {
      headers: this.getApiKeyHeader(),
      data: {}
    });    
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

  async postWithMultiPartData(param) {
    return await axios.post(this.apiUrl, param, {
      headers: this.getApiKeyMultiPartHeader()
    });
  }

  getApiKeyHeader() {
    if (this.apiKey) {
      return { "Content-type": "application/json", Authorization: this.apiKey };
    } else {
      return { "Content-type": "application/json" };
    }
  }

  getApiKeyMultiPartHeader() {
    if (this.apiKey) {
      return {
        "Content-type": "multipart/form-data",
        Authorization: this.apiKey
      };
    } else {
      return { "Content-type": "multipart/form-data" };
    }
  }
}

export class ApiError extends Error {
  constructor(message, stusCode) {
    super(message);
    this.stusCode = stusCode;
    this.isAuthError = false;
    this.isServerError = false;
    if (stusCode >= 400 && stusCode < 500) {
      this.isAuthError = true;
    } else if (stusCode >= 500 && stusCode < 600) {
      this.isServerError = true;
    }
  }
}
