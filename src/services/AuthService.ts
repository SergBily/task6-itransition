import { AxiosResponse } from 'axios';
import $api from '../http/api';

export default class AuthService {
  static async login(name: string): Promise<AxiosResponse> {
    return $api.post('/login', { name });
  }
}
