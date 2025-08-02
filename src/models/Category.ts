import Model from './Model';

export interface IncomingApiData {
  id: number;
  nama_kategori: string;
  tipe_kategori: string;
  created_at: string;
  updated_at: string;
}

export interface OutgoingApiData {
  name: string;
}

type ReturnType<S, From, To> = S extends From[] ? To[] : To;

export default class Categories extends Model {
  constructor(
    public id: number,
    public category_name: string,
    public category_type: string,
    public created_at: string,
    public updated_at: string
  ) {
    super();
  }

  public static fromApiData<T extends IncomingApiData | IncomingApiData[]>(apiData: T): ReturnType<T, IncomingApiData, Categories> {
    if (Array.isArray(apiData)) return apiData.map((object) => this.fromApiData(object)) as ReturnType<T, IncomingApiData, Categories>;
    return new Categories(apiData.id, apiData.nama_kategori, apiData.tipe_kategori, apiData.created_at, apiData.updated_at) as ReturnType<T, IncomingApiData, Categories>;
  }
}
