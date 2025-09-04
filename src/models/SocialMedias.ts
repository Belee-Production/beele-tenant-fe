import Model from './Model';

export interface IncomingApiData {
  id: number;
  tipe: string;
  nama_akun: string;
  link: string;
  created_at: string;
  updated_at: string;
}

interface FormValue {
  type: string;
  account_name: string;
  link: string;
}
export interface OutgoingApiData {
  tipe: string;
  nama_akun: string;
  link: string;
}

type ReturnType<S, From, To> = S extends From[] ? To[] : To;

export default class SocialMedias extends Model {
  constructor(
    public id: number,
    public type: string,
    public account_name: string,
    public link: string,
    public created_at: string,
    public updated_at: string
  ) {
    super();
  }

  public static fromApiData<T extends IncomingApiData | IncomingApiData[]>(apiData: T): ReturnType<T, IncomingApiData, SocialMedias> {
    if (Array.isArray(apiData)) return apiData.map((object) => this.fromApiData(object)) as ReturnType<T, IncomingApiData, SocialMedias>;
    return new SocialMedias(apiData.id, apiData.tipe, apiData.nama_akun, apiData.link, apiData.created_at, apiData.updated_at) as ReturnType<T, IncomingApiData, SocialMedias>;
  }

  public static toApiData<T extends FormValue | FormValue[]>(socialMedias: T): ReturnType<T, FormValue, OutgoingApiData> {
    if (Array.isArray(socialMedias)) return socialMedias.map((object) => this.toApiData(object)) as ReturnType<T, FormValue, OutgoingApiData>;
    const apiData: OutgoingApiData = {
      tipe: socialMedias.type,
      nama_akun: socialMedias.account_name,
      link: socialMedias.link
    };

    return apiData as ReturnType<T, FormValue, OutgoingApiData>;
  }
}
