/* eslint-disable no-unused-vars */
import { useAuth, useNotification, usePagination, useService } from '@/hooks';
import { useStoreOwner } from '@/hooks/useStoreOwner';
import { StoreOwnerService } from '@/services';
import strings from '@/utils/strings';
import { InboxOutlined } from '@ant-design/icons';
import { Button, Form, Input, Skeleton, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Dragger from 'antd/es/upload/Dragger';
import { useEffect, useMemo, useState } from 'react';

const StoreOwner = () => {
  const { token } = useAuth();
  const { data: storeOwnerData, isLoading, refetch } = useStoreOwner();
  const updateOwnerProfile = useService(StoreOwnerService.store);
  const [storeOwnerForm] = Form.useForm();
  const { success, error } = useNotification();

  const initialData = useMemo(() => {
    return storeOwnerData ?? {};
  }, [storeOwnerData]);

  const [realtimeData, setRealtimeData] = useState(initialData);

  useEffect(() => {
    storeOwnerForm.setFieldsValue(initialData);
    setRealtimeData(initialData);
  }, [initialData, storeOwnerForm]);

  function handleValuesChange(changedValue) {
    setRealtimeData({ ...realtimeData, ...changedValue });
  }

  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (initialData?.photo) {
      setFileList([
        {
          uid: '-1',
          name: initialData.name || 'logo-toko.webp',
          status: 'done',
          url: initialData.photo
        }
      ]);
    }
  }, [initialData]);

  return (
    <Form
      onValuesChange={handleValuesChange}
      form={storeOwnerForm}
      layout="vertical"
      className="mb-4 mt-2 flex flex-col gap-y-6"
      onFinish={async (values) => {
        const { message, isSuccess } = await updateOwnerProfile.execute({ ...values }, token, values.photo.file);
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
            Profil Pemilik Toko
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
                name="desc"
                className="m-0"
                label="Deskripsi :"
                rules={[
                  {
                    required: true,
                    message: 'Deskripsi pemilik wajib diisi!'
                  }
                ]}
              >
                <TextArea placeholder="Deskripsi pemilik" size="large" />
              </Form.Item>
              <Form.Item
                name="telp"
                className="m-0"
                label="Nomor telp Pemilik Toko :"
                rules={[
                  {
                    required: true,
                    message: 'Nomor telp pemilik toko wajib diisi!'
                  }
                ]}
              >
                <Input placeholder="Nomor telp pemilik toko" size="large" />
              </Form.Item>
              <Form.Item
                name="title"
                className="m-0"
                label="Jabatan Pemilik Toko :"
                rules={[
                  {
                    required: true,
                    message: 'Jabatan pemilik toko wajib diisi!'
                  }
                ]}
              >
                <Input placeholder="Jabatan pemilik toko" size="large" />
              </Form.Item>
              <Form.Item
                name="photo"
                className="m-0"
                label="Foto Pemilik Toko :"
                rules={[
                  {
                    required: true,
                    message: 'Logo toko wajib diisi!'
                  }
                ]}
              >
                <Dragger
                  accept={['.png', '.jpg', '.jpeg', 'webp'].join(', ')}
                  name="photo"
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
      <Form.Item>
        <Button className="w-fit" variant="solid" color="primary" size="large" htmlType="submit" loading={updateOwnerProfile.isLoading}>
          Simpan
        </Button>
      </Form.Item>
    </Form>
  );
};

export default StoreOwner;
