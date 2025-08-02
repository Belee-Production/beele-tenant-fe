import { useAuth, useNotification, useService } from '@/hooks';
import { StoreProfileService } from '@/services';
import strings from '@/utils/strings';
import { InboxOutlined, PhoneOutlined, ShopOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Menu, Select, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Dragger from 'antd/es/upload/Dragger';
import React, { useCallback, useEffect, useMemo } from 'react';

const Settings = () => {
  const [activeMenu, setActiveMenu] = React.useState('toko');
  const { token } = useAuth();
  const { execute, ...getAllStoreProfile } = useService(StoreProfileService.getAll);
  const { execute: fetchCategories, ...getAllCategories } = useService(StoreProfileService.getAllCategories);
  const udpateStoreProfile = useService(StoreProfileService.store);
  const [storeProfileForm] = Form.useForm();
  const { success, error } = useNotification();

  const fetchStoreProfile = useCallback(() => {
    execute({
      token: token
    });
  }, [execute, token]);

  useEffect(() => {
    fetchStoreProfile();
    fetchCategories({ token: token });
  }, [fetchCategories, fetchStoreProfile, token]);

  const categories = getAllCategories.data ?? [];
  const initialData = useMemo(() => {
    const storeProfile = getAllStoreProfile.data ?? {};
    return {
      ...storeProfile,
      category_id: storeProfile?.category_id?.id
    };
  }, [getAllStoreProfile.data]);

  const [realtimeData, setRealtimeData] = React.useState(initialData);

  useEffect(() => {
    storeProfileForm.setFieldsValue(initialData ?? {});
    setRealtimeData(initialData ?? {});
  }, [initialData, storeProfileForm]);

  function handleValuesChange(changedValue) {
    setRealtimeData({ ...realtimeData, ...changedValue });
  }

  const getFileList = (data) => {
    return [
      {
        url: data.logo,
        name: data.name
      }
    ];
  };

  return (
    <Card>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <Menu
            defaultSelectedKeys={[activeMenu]}
            defaultOpenKeys={[activeMenu]}
            onClick={(e) => setActiveMenu(e.key)}
            mode="inline"
            style={{ border: 0 }}
            items={[
              {
                key: 'toko',
                label: 'Profil Toko',
                icon: <ShopOutlined />
              },
              {
                key: 'social_media',
                label: 'Sosial Media',
                icon: <PhoneOutlined />
              }
            ]}
          />
        </div>
        <div className="col-span-9">
          {activeMenu === 'toko' && (
            <Form
              onValuesChange={handleValuesChange}
              form={storeProfileForm}
              layout="vertical"
              className="mb-4 mt-2 flex flex-col gap-y-12"
              onFinish={async (values) => {
                const { message, isSuccess } = await udpateStoreProfile.execute({ ...values }, token, values.logo.file);
                if (isSuccess) {
                  success('Berhasil', message);
                } else {
                  error('Gagal', message);
                }
                return isSuccess;
              }}
            >
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-col gap-y-2">
                  <Typography.Title level={5} style={{ margin: 0 }}>
                    Profil Toko
                  </Typography.Title>
                  <hr />
                  <span className="text-xs">
                    Profil toko ini akan menjadi identitas utama yang ditampilkan kepada pelanggan, termasuk nama, logo, tagline, dan deskripsi toko, dan akan digunakan secara otomatis di seluruh halaman toko kecuali Anda mengubahnya secara manual.
                  </span>
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
                      defaultFileList={getFileList(initialData)}
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">{strings('click_or_drag_file_to_this_area_to_upload')}</p>
                      <p className="ant-upload-hint">{strings('accepted_file_types_s')}</p>
                    </Dragger>
                  </Form.Item>
                </div>
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-col gap-y-2">
                  <Typography.Title level={5} style={{ margin: 0 }}>
                    Pemilik & Kontak Toko
                  </Typography.Title>
                  <hr />
                  <span className="text-xs">
                    Informasi pemilik dan kontak digunakan sebagai rujukan utama untuk komunikasi dan verifikasi toko. Data seperti nama pemilik, email, dan nomor telepon akan ditampilkan atau digunakan secara otomatis saat dibutuhkan, kecuali Anda
                    memperbaruinya.
                  </span>
                  <Form.Item
                    name="owner_name"
                    className="m-0"
                    label="Nama Pemilik Toko :"
                    rules={[
                      {
                        required: true,
                        message: 'Nama pemilik toko wajib diisi!'
                      }
                    ]}
                  >
                    <Input placeholder="Nama pemilik toko" size="large" />
                  </Form.Item>
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
                </div>
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-col gap-y-2">
                  <Typography.Title level={5} style={{ margin: 0 }}>
                    Kategori Toko
                  </Typography.Title>
                  <hr />
                  <span className="text-xs">Kategori toko membantu sistem menyesuaikan tampilan dan fitur yang relevan dengan jenis toko Anda. Pilihan ini akan diterapkan secara otomatis sebagai acuan utama, kecuali Anda mengubahnya.</span>
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
                </div>
              </div>

              <Form.Item className="mt-2">
                <Button className="w-fit" variant="solid" color="primary" size="large" htmlType="submit" loading={udpateStoreProfile.isLoading}>
                  Simpan
                </Button>
              </Form.Item>
              <hr />
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-col gap-y-2">
                  <Typography.Title level={5} style={{ margin: 0 }}>
                    Zona Bahaya
                  </Typography.Title>
                  <div className="flex flex-col gap-y-4 rounded-lg border border-red-500 p-4">
                    <span className="text-xs">
                      Pengaturan di zona ini berdampak langsung pada keberadaan dan visibilitas toko Anda. Karena sifatnya yang sensitif, perubahan hanya disarankan jika benar-benar diperlukan dan dilakukan dengan penuh kehati-hatian.
                    </span>
                    <hr />
                    <div className="flex items-center justify-between">
                      <div className="gap-y flex flex-col">
                        <b>Ubah Visibilitas Toko</b>
                        <small>Visibilitas toko sekarang adalah terlihat</small>
                      </div>
                      <Button danger>Ubah Visibilitas</Button>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
            </Form>
          )}
          {activeMenu === 'social_media' && (
            <div className="mb-4 mt-2 flex flex-col gap-y-12">
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-col gap-y-2">
                  <Typography.Title level={5} style={{ margin: 0 }}>
                    Media Sosial
                  </Typography.Title>
                  <hr />
                  <span className="text-xs">
                    Profil toko ini akan menjadi identitas utama yang ditampilkan kepada pelanggan, termasuk nama, logo, tagline, dan deskripsi toko, dan akan digunakan secara otomatis di seluruh halaman toko kecuali Anda mengubahnya secara manual.
                  </span>
                  <div className="grid grid-cols-12 gap-4">
                    <Card title={'Instagram'} className="col-span-2" size="small" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Settings;
