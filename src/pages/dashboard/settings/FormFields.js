import { InputType } from '@/constants';
import Modul from '@/constants/Modul';

export const socialMediaFormFields = () => [
  {
    label: `Tipe ${Modul.SOCIAL_MEDIA}`,
    name: 'type',
    type: InputType.TEXT,
    rules: [
      {
        required: true,
        message: `Nama toko harus diisi`
      }
    ],
    size: 'large'
  },
  {
    label: `ID/Username/Nama Akun`,
    name: 'account_name',
    type: InputType.TEXT,
    rules: [
      {
        required: true,
        message: `ID/Username/Nama harus diisi`
      }
    ],
    size: 'large'
  },
  {
    label: `Link Sosial Media`,
    name: 'link',
    type: InputType.TEXT,
    rules: [
      {
        required: true,
        message: `Link sosial media harus diisi`
      },
      {
        validator: (_, value) => {
          if (!value) return Promise.resolve();

          if (value.startsWith('https://') || value.startsWith('http://')) {
            return Promise.reject(new Error('Mohon isi link tanpa menggunakan https://'));
          }

          return Promise.resolve();
        }
      }
    ],
    size: 'large',
    extra: {
      addonBefore: 'http://'
    }
  }
];
