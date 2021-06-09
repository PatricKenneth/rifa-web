import { HttpClient } from '../httpClient';

const baseURL = '/numbers';
class NumbersService {
  async get(status = '') {
    return HttpClient.get(`${baseURL}?status=${status}`);
  }

  async create(ticketDTO) {
    return HttpClient.post(`${baseURL}`, ticketDTO);
  }

  async findBy(query) {
    query = Object.keys(query)
      .filter((key) => query[key] !== undefined)
      .map((key) => `${key}=${query[key]}`)
      .join('&');
    return HttpClient.get(`${baseURL}/search?${query}`);
  }
}

export default new NumbersService();