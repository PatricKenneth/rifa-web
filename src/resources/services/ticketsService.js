import { HttpClient } from '../httpClient';

const baseURL = '/tickets';
class TicketsService {
  async create(ticketDTO) {
    return HttpClient.post(`${baseURL}`, ticketDTO);
  }
}

export default new TicketsService();