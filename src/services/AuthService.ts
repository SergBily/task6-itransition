import $api from '../http/api';

export default class AuthService {
  static async login(name: string) {
    const r = $api.post('/login', { name });
    console.log(r, 'login');
    return r;
  }
}
