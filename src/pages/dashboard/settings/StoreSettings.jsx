import { useAuth, useNotification, useService } from '@/hooks';
import { useStoreProfile } from '@/hooks/useStoreProfile';
import { StoreProfileService } from '@/services';
import strings from '@/utils/strings';
import { InboxOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Skeleton, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Dragger from 'antd/es/upload/Dragger';
import { useEffect, useMemo, useState } from 'react';

const StoreSettings = () => {
  const { token } = useAuth();
  const { data: storeProfileData, isLoading, refetch } = useStoreProfile();

  const { execute: fetchCategories, ...getAllCategories } = useService(StoreProfileService.getAllCategories);
  const udpateStoreProfile = useService(StoreProfileService.store);
  const [storeProfileForm] = Form.useForm();
  const { success, error } = useNotification();

  useEffect(() => {
    fetchCategories({ token: token });
  }, [fetchCategories, token]);

  const categories = getAllCategories.data ?? [];
  const initialData = useMemo(() => {
    return {
      ...storeProfileData,
      category_id: storeProfileData?.category_id?.id
    };
  }, [storeProfileData]);

  const [realtimeData, setRealtimeData] = useState(initialData);

  useEffect(() => {
    storeProfileForm.setFieldsValue(initialData ?? {});
    setRealtimeData(initialData ?? {});
  }, [initialData, storeProfileForm]);

  function handleValuesChange(changedValue) {
    setRealtimeData({ ...realtimeData, ...changedValue });
  }

  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (initialData?.logo) {
      setFileList([
        {
          uid: '-1',
          name: initialData.name || 'logo-toko.webp',
          status: 'done',
          url: initialData.logo
        }
      ]);
    }
  }, [initialData]);

  return (
    <Form
      onValuesChange={handleValuesChange}
      form={storeProfileForm}
      layout="vertical"
      className="mb-4 mt-2 flex flex-col gap-y-3"
      onFinish={async (values) => {
        const { message, isSuccess } = await udpateStoreProfile.execute({ ...values }, token, values.logo.file);
        if (isSuccess) {
          success('Berhasil', message);
          refetch();
        } else {
          error('Gagal', message);
        }
        return isSuccess;
      }}
    >
      <div className="mb-12 flex flex-col gap-y-2">
        <div className="flex flex-col gap-y-2">
          <Typography.Title level={5} style={{ margin: 0 }}>
            Profil Toko
          </Typography.Title>
          <hr />
          <span className="text-xs">
            Profil toko ini akan menjadi identitas utama yang ditampilkan kepada pelanggan, termasuk nama, logo, tagline, dan deskripsi toko, dan akan digunakan secara otomatis di seluruh halaman toko kecuali Anda mengubahnya secara manual.
          </span>
          {isLoading ? (
            <div className="mt-4 flex flex-col gap-y-3">
              <Skeleton.Input active style={{ width: '100%' }} size="small" />
              <Skeleton.Input active style={{ width: '100%' }} size="small" />
              <Skeleton.Input active style={{ width: '100%' }} size="small" />
              <Skeleton.Input active style={{ width: '100%' }} size="small" />
            </div>
          ) : (
            <>
              <Form.Item
                name="store_name"
                className="m-0"
                label="Nama Toko :"
                rules={[
                  {
                    required: true,
                    message: 'Nama toko wajib diisi!'
                  }
                ]}
              >
                <Input placeholder="Nama toko" size="large" />
              </Form.Item>
              <Form.Item
                name="tagline"
                className="m-0"
                label="Tagline :"
                rules={[
                  {
                    required: true,
                    message: 'Tagline wajib diisi!'
                  }
                ]}
              >
                <Input placeholder="Tagline toko" size="large" />
              </Form.Item>
              <Form.Item
                name="desc"
                className="m-0"
                label="Deskripsi :"
                rules={[
                  {
                    required: true,
                    message: 'Deskripsi toko wajib diisi!'
                  }
                ]}
              >
                <TextArea placeholder="Deskripsi toko" size="large" />
              </Form.Item>
              <Form.Item
                name="logo"
                className="m-0"
                label="Logo Toko :"
                rules={[
                  {
                    required: true,
                    message: 'Logo toko wajib diisi!'
                  }
                ]}
              >
                <Dragger
                  accept={['.png', '.jpg', '.jpeg', 'webp'].join(', ')}
                  name="logo"
                  maxCount={1}
                  beforeUpload={() => {
                    return false;
                  }}
                  listType="picture"
                  fileList={fileList}
                  onChange={({ fileList }) => setFileList(fileList)}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">{strings('click_or_drag_file_to_this_area_to_upload')}</p>
                  <p className="ant-upload-hint">{strings('accepted_file_types_s')}</p>
                </Dragger>
              </Form.Item>
            </>
          )}
        </div>
      </div>
      <div className="mb-12 flex flex-col gap-y-2">
        <div className="flex flex-col gap-y-2">
          <Typography.Title level={5} style={{ margin: 0 }}>
            Pemilik & Kontak Toko
          </Typography.Title>
          <hr />
          <span className="text-xs">
            Informasi pemilik dan kontak digunakan sebagai rujukan utama untuk komunikasi dan verifikasi toko. Data seperti nama pemilik, email, dan nomor telepon akan ditampilkan atau digunakan secara otomatis saat dibutuhkan, kecuali Anda
            memperbaruinya.
          </span>
          {isLoading ? (
            <div className="mt-4 flex flex-col gap-y-3">
              <Skeleton.Input active style={{ width: '100%' }} size="small" />
              <Skeleton.Input active style={{ width: '100%' }} size="small" />
              <Skeleton.Input active style={{ width: '100%' }} size="small" />
            </div>
          ) : (
            <>
              <Form.Item
                name="email"
                className="m-0"
                label="Email :"
                rules={[
                  {
                    required: true,
                    message: 'Email toko wajib diisi!'
                  }
                ]}
              >
                <Input placeholder="Email toko" size="large" />
              </Form.Item>
              <Form.Item
                name="telp"
                className="m-0"
                label="Telepon :"
                rules={[
                  {
                    required: true,
                    message: 'Nomor Telepon toko wajib diisi!'
                  }
                ]}
              >
                <Input placeholder="Nomor telepon toko" size="large" />
              </Form.Item>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-col gap-y-2">
          <Typography.Title level={5} style={{ margin: 0 }}>
            Kategori Toko
          </Typography.Title>
          <hr />
          <span className="text-xs">Kategori toko membantu sistem menyesuaikan tampilan dan fitur yang relevan dengan jenis toko Anda. Pilihan ini akan diterapkan secara otomatis sebagai acuan utama, kecuali Anda mengubahnya.</span>
          {isLoading ? (
            <div className="mt-4 flex flex-col gap-y-3">
              <Skeleton.Input active style={{ width: '100%' }} size="small" />
            </div>
          ) : (
            <Form.Item
              name="category_id"
              className="m-0"
              label="Kategori Toko  :"
              rules={[
                {
                  required: true,
                  message: 'Kategori toko wajib diisi!'
                }
              ]}
            >
              <Select size="large" placeholder="Kategori toko">
                {categories.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.category_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </div>
      </div>
      <Form.Item>
        <Button className="w-fit" variant="solid" color="primary" size="large" htmlType="submit" loading={udpateStoreProfile.isLoading}>
          Simpan
        </Button>
      </Form.Item>
    </Form>
  );
};

export default StoreSettings;
