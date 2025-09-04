/* eslint-disable no-unused-vars */
import { StoreOwner } from '@/models';
import api from '@/utils/api';

export default class StoreOwnerService {
  /**
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   *  data?: StoreOwner[];
   * }>}
   * */
  static async getAll({ token, ...filters }) {
    const params = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== null && value !== undefined && value !== ''));
    const response = await api.get('/pemilik-toko', { token, params });
    if (!response.data) return response;
    return { ...response, data: StoreOwner.fromApiData(response.data) };
  }

  /**
   * @param {StoreOwner} data
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   *  errors?: { [key: string]: string[] };
   * }}
   */
  static async store(data, token, file) {
    return await api.post('/pemilik-toko', { body: StoreOwner.toApiData(data), token, file: { foto: file } });
  }

  /**
   * @param {number} id
   * @param {StoreOwner} data
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   *  errors?: { [key: string]: string[] };
   * }>}
   */
  static async update(id, data, token) {
    return await api.patch(`/pemilik-toko/edit/${id}`, { body: StoreOwner.toApiData(data), token });
  }

  /**
   * @param {number} id
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   * }>}
   */
  static async delete(id, token) {
    return await api.delete(`/pemilik-toko/delete/${id}`, { token });
  }

  /**
   * @param {number[]} ids
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   * }>}
   */
  static async deleteBatch(ids, token) {
    return await api.delete(`/pemilik-toko/multi-delete/?id=${ids.join(',')}`, { token });
  }
}
