import Modul from '@/constants/Modul';
import { useAuth, useCrudModal, useNotification, usePagination, useService } from '@/hooks';
import { SocialMediasService } from '@/services';
import { AppstoreOutlined, DeleteOutlined, EditOutlined, GlobalOutlined, PlusOutlined, TableOutlined } from '@ant-design/icons';
import { Button, Card, Empty, Radio, Skeleton, Space, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { socialMediaFormFields } from './FormFields';
import { DataTable } from '@/components';
import { parseUrl } from '@/utils/parseUrl';
import { SocialMedias as SocialMediasModel } from '@/models';
import { Delete, Edit } from '@/components/dashboard/button';

const SocialMedias = () => {
  const { token, user } = useAuth();
  const modal = useCrudModal();
  const { success, error } = useNotification();
  const { execute, ...getAllSocialMedias } = useService(SocialMediasService.getAll);
  const storeSocialMedia = useService(SocialMediasService.store);
  const updateSocialMedia = useService(SocialMediasService.update);
  const deleteSocialMedia = useService(SocialMediasService.delete);
  const deleteBatchSocialMedias = useService(SocialMediasService.deleteBatch);
  const socialMediaPagination = usePagination({ totalData: getAllSocialMedias.totalData });

  const fetchSocialMedias = useCallback(() => {
    execute({
      token: token,
      page: socialMediaPagination.page,
      per_page: socialMediaPagination.perPage
    });
  }, [execute, socialMediaPagination.page, socialMediaPagination.perPage, token]);

  useEffect(() => {
    fetchSocialMedias();
  }, [fetchSocialMedias]);

  const socialMedias = getAllSocialMedias.data ?? [];

  const [viewType, setViewType] = useState('card');
  const [selectedItem, setSelectedItem] = useState([]);

  const column = [
    {
      title: 'Tipe Sosial Media ',
      dataIndex: 'type',
      sorter: (a, b) => a.type.length - b.type.length,
      searchable: true
    },
    {
      title: 'Nama Akun',
      dataIndex: 'account_name',
      sorter: (a, b) => a.account_name.length - b.account_name.length,
      searchable: true
    },
    {
      title: 'Link',
      dataIndex: 'link',
      sorter: (a, b) => a.link.length - b.link.length,
      searchable: true,
      render: (_, record) => (
        <Button icon={<GlobalOutlined />} onClick={() => window.open(record.link, '_blank')}>
          Kunjungi
        </Button>
      )
    }
  ];

  const handleCreate = () => {
    modal.create({
      title: `Tambah ${Modul.SOCIAL_MEDIA}`,
      formFields: socialMediaFormFields,
      onSubmit: async (values) => {
        const { message, isSuccess } = await storeSocialMedia.execute({ ...values, link: 'https://' + values.link }, token);
        if (isSuccess) {
          success('Berhasil', message);
          fetchSocialMedias({ token: token, page: socialMediaPagination.page, per_page: socialMediaPagination.perPage });
        } else {
          error('Gagal', message);
        }
        return isSuccess;
      }
    });
  };

  const handleEdit = (item) => {
    modal.edit({
      data: { ...item, link: parseUrl(item.link) },
      title: `Tambah ${Modul.SOCIAL_MEDIA}`,
      formFields: socialMediaFormFields,
      onSubmit: async (values) => {
        const { message, isSuccess } = await updateSocialMedia.execute(item.id, { ...values, link: 'https://' + parseUrl(values.link) }, token);
        if (isSuccess) {
          success('Berhasil', message);
          fetchSocialMedias({ token: token });
        } else {
          error('Gagal', message);
        }
        return isSuccess;
      }
    });
  };

  const handleDelete = (item) => {
    modal.delete.default({
      title: `Delete ${Modul.SOCIAL_MEDIA}`,
      data: item,
      onSubmit: async () => {
        const { isSuccess, message } = await deleteSocialMedia.execute(item.id, token);
        if (isSuccess) {
          success('Berhasil', message);
          fetchSocialMedias({ token: token });
        } else {
          error('Gagal', message);
        }
        return isSuccess;
      }
    });
  };

  if (user) {
    column.push({
      title: 'Aksi',
      render: (_, record) => (
        <Space size="small">
          <Edit title={`Edit ${Modul.SOCIAL_MEDIA}`} model={SocialMediasModel} onClick={() => handleEdit(record)} />
          <Delete title={`Delete ${Modul.SOCIAL_MEDIA}`} model={SocialMediasModel} onClick={() => handleDelete(record)} />
        </Space>
      )
    });
  }

  return (
    <div className="mb-4 mt-2 flex flex-col gap-y-12">
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center justify-between">
            <Typography.Title level={5} style={{ margin: 0 }}>
              Media Sosial
            </Typography.Title>
            <div className="flex items-center gap-x-2">
              <Radio.Group
                value={viewType}
                onChange={(e) => {
                  setViewType(e.target.value);
                  setSelectedItem([]);
                }}
              >
                <Radio.Button value="table">
                  <TableOutlined />
                </Radio.Button>
                <Radio.Button value="card">
                  <AppstoreOutlined />
                </Radio.Button>
              </Radio.Group>
              {/* FIXME: TAMBAHKAN GUARD UNTUK PERMISSION DELETE */}
              <Button
                icon={<DeleteOutlined />}
                disabled={!selectedItem.length}
                danger
                onClick={() => {
                  modal.delete.batch({
                    title: `Hapus ${selectedItem.length} ${Modul.SOCIAL_MEDIA} Yang Dipilih ? `,
                    onSubmit: async () => {
                      const ids = selectedItem.map((item) => item.id);
                      const { message, isSuccess } = await deleteBatchSocialMedias.execute(ids, token);
                      if (isSuccess) {
                        success('Berhasil', message);
                        fetchSocialMedias({ token: token, page: socialMediaPagination.page, per_page: socialMediaPagination.perPage });
                        setSelectedItem([]);
                      } else {
                        error('Gagal', message);
                      }
                      return isSuccess;
                    }
                  });
                }}
              >
                {selectedItem.length} Hapus
              </Button>
              {/* FIXME: TAMBAHKAN GUARD UNTUK PERMISSION CREATE */}
              <Button icon={<PlusOutlined />} color="primary" variant="solid" onClick={() => handleCreate()}>
                Tambah
              </Button>
            </div>
          </div>
          <hr />
          <span className="mb-4 text-xs">
            Profil toko ini akan menjadi identitas utama yang ditampilkan kepada pelanggan, termasuk nama, logo, tagline, dan deskripsi toko, dan akan digunakan secara otomatis di seluruh halaman toko kecuali Anda mengubahnya secara manual.
          </span>
          {viewType === 'card' ? (
            <div className="grid grid-cols-12 gap-4">
              {getAllSocialMedias.isLoading ? (
                <>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Card className="col-span-2" key={index}>
                      <div className="flex items-center justify-center">
                        <Skeleton.Image active />
                      </div>
                    </Card>
                  ))}
                </>
              ) : socialMedias.length === 0 ? (
                <div className="col-span-12 flex justify-center">
                  <Empty description="Belum ada sosial media">
                    <Button icon={<PlusOutlined />} color="primary" variant="solid" onClick={() => handleCreate()}>
                      Tambah
                    </Button>
                  </Empty>
                </div>
              ) : (
                <>
                  {socialMedias.map((item) => (
                    <Card
                      key={item.id}
                      title={item.type}
                      className="col-span-2"
                      size="small"
                      actions={[
                        <EditOutlined key="edit" onClick={() => handleEdit(item)} />,
                        <DeleteOutlined key="delete" onClick={() => handleDelete(item)} />,
                        <GlobalOutlined key="visit" onClick={() => window.open(item.link, '_blank', 'noopener,noreferrer')} />
                      ]}
                    >
                      {item.account_name}
                    </Card>
                  ))}
                </>
              )}
            </div>
          ) : (
            <>
              <DataTable
                data={socialMedias}
                columns={column}
                loading={getAllSocialMedias.isLoading}
                map={(registrant) => ({ key: registrant.id, ...registrant })}
                pagination={socialMediaPagination}
                handleSelectedData={(_, selectedRows) => setSelectedItem(selectedRows)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialMedias;
