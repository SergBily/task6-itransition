import $api from '../http/api';

export default class AuthService {
  static async login(name: string) {
    const r = await $api.post('/login', { name });
    return r;
  }
}
