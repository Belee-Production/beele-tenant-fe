import { DatatableColumn, FormField as FormFieldType, Override } from '@/types';
import strings from '@/utils/strings';
import { DescriptionsItemType } from 'antd/es/descriptions';
import Model from './Model';
import { InputType } from '@/constants';

export interface IncomingApiData {
  nama_pemilik: string;
  deskripsi: string;
  telepon: string;
  jabatan: string;
  foto: string;
}

interface FormValue {
  owner_name: string;
  title: string;
  desc: string;
  telp: string;
  photo: string;
}

export interface OutgoingApiData {
  nama_pemilik: string;
  jabatan: string;
  deskripsi: string;
  telepon: string;
  foto: string;
}

type ReturnType<S, From, To> = S extends From[] ? To[] : To;

export default class StoreOwner extends Model {
  constructor(
    public owner_name: string,
    public desc: string,
    public telp: string,
    public title: string,
    public photo: string
  ) {
    super();
  }

  public static fromApiData<T extends IncomingApiData | IncomingApiData[]>(apiData: T): ReturnType<T, IncomingApiData, StoreOwner> {
    if (Array.isArray(apiData)) return apiData.map((object) => this.fromApiData(object)) as ReturnType<T, IncomingApiData, StoreOwner>;
    return new StoreOwner(apiData.nama_pemilik, apiData.deskripsi, apiData.telepon, apiData.jabatan, apiData.foto) as ReturnType<T, IncomingApiData, StoreOwner>;
  }

  public static toApiData<T extends FormValue | FormValue[]>(storeOwner: T): ReturnType<T, FormValue, OutgoingApiData> {
    if (Array.isArray(storeOwner)) return storeOwner.map((object) => this.toApiData(object)) as ReturnType<T, FormValue, OutgoingApiData>;
    const apiData: OutgoingApiData = {
      nama_pemilik: storeOwner.owner_name,
      jabatan: storeOwner.title,
      deskripsi: storeOwner.desc,
      telepon: storeOwner.telp,
      foto: storeOwner.photo
    };

    return apiData as ReturnType<T, FormValue, OutgoingApiData>;
  }
}
