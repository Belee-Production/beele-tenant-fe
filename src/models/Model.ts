type ModelKeys = 'profil_desa' | 'dusun';

export default abstract class Model {
  static children: { [key in ModelKeys]?: ModelChildren | ModelChildren[] } = {
    profil_desa: undefined,
    dusun: undefined
  };
}

export type ModelChildren = new (...args: any[]) => Model;
