import { stringsMap } from '@/data/strings';
import Model from './Model';
import asset from '@/utils/asset';

export interface IncomingApiData {
  id: number;
  nama_toko: string;
  nama_pemilik: string;
  tagline: string;
  deskripsi: string;
  kategori_id: {
    id: number;
    nama_kategori: string;
    tipe_kategori: string;
  };
  email: string;
  telepon: string;
  logo: string;
  status_kelengkapan: boolean;
  created_at: string;
  updated_at: string;
}

interface FormValue {
  store_name: string;
  owner_name: string;
  tagline: string;
  desc: string;
  category_id: string;
  logo: string;
  email: string;
  telp: string;
}

export interface OutgoingApiData {
  nama_toko: string;
  nama_pemilik: string;
  tagline: string;
  deskripsi: string;
  kategori_id: string;
  logo: string;
  email: string;
  telepon: string;
}

type ReturnType<S, From, To> = S extends From[] ? To[] : To;

export default class StoreProfile extends Model {
  constructor(
    public id: number,
    public store_name: string,
    public owner_name: string,
    public tagline: string,
    public desc: string,
    public category_id: {
      id: number;
      category_name: string;
      category_type: string;
    },
    public email: string,
    public telp: string,
    public logo: string,
    public completeness_status: boolean,
    public created_at: string,
    public updated_at: string
  ) {
    super();
  }

  public static fromApiData<T extends IncomingApiData | IncomingApiData[]>(apiData: T): ReturnType<T, IncomingApiData, StoreProfile> {
    if (Array.isArray(apiData)) return apiData.map((object) => this.fromApiData(object)) as ReturnType<T, IncomingApiData, StoreProfile>;
    return new StoreProfile(
      apiData.id,
      apiData.nama_toko,
      apiData.nama_pemilik,
      apiData.tagline,
      apiData.deskripsi,
      {
        id: apiData.kategori_id.id,
        category_name: apiData.kategori_id.nama_kategori,
        category_type: apiData.kategori_id.tipe_kategori
      },
      apiData.email,
      apiData.telepon,
      asset(apiData.logo),
      apiData.status_kelengkapan,
      apiData.created_at,
      apiData.updated_at
    ) as ReturnType<T, IncomingApiData, StoreProfile>;
  }

  public static toApiData<T extends FormValue | FormValue[]>(storeProfile: T): ReturnType<T, FormValue, OutgoingApiData> {
    if (Array.isArray(storeProfile)) return storeProfile.map((object) => this.toApiData(object)) as ReturnType<T, FormValue, OutgoingApiData>;
    const apiData: OutgoingApiData = {
      nama_toko: storeProfile.store_name,
      nama_pemilik: storeProfile.owner_name,
      tagline: storeProfile.tagline,
      deskripsi: storeProfile.desc,
      kategori_id: storeProfile.category_id,
      logo: storeProfile.logo,
      email: storeProfile.email,
      telepon: storeProfile.telp
    };

    return apiData as ReturnType<T, FormValue, OutgoingApiData>;
  }
}
