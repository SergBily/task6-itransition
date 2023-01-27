import $api from '../http/api';
import UserModel from '../models/userModel';

export default class UserService {
  static async getAllUsers(): Promise<UserModel[]> {
    const r = await $api.get('/users');
    return r.data;
  }
}
