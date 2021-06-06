import { HttpClient } from '../httpClient';

const baseURL = '/numbers';
class NumbersService {
  async get(status = '') {
    return HttpClient.get(`${baseURL}?status=${status}`);
  }
}

export default new NumbersService();