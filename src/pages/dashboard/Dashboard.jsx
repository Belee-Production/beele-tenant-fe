import { useStoreOwner } from '@/hooks/useStoreOwner';
import { useStoreProfile } from '@/hooks/useStoreProfile';
import dateFormatter from '@/utils/dateFormatter';
import { EnvironmentOutlined, FacebookFilled, FieldTimeOutlined, InstagramFilled, ShopOutlined, UserOutlined, YoutubeFilled } from '@ant-design/icons';
import { Alert, Avatar, Card, Skeleton, Typography } from 'antd';

const Dashboard = () => {
  const { data: storeProfile, isLoading } = useStoreProfile();
  const { data: storeOwener } = useStoreOwner();

  return (
    <div className="grid grid-cols-12 gap-4">
      {isLoading ? (
        <>
          <Card className="col-span-10" cover={<img src="/image_asset/card_background.png" className="h-32 object-cover" />}>
            <div className="relative px-4">
              <div className="absolute -top-16">
                <Avatar size={90} icon={<ShopOutlined />} style={{ backgroundColor: '#fff', padding: '12px', color: 'black' }} className="shadow-md" />
              </div>
            </div>
            <div className="flex gap-x-6 px-4">
              <div className="mt-12 flex w-full flex-col gap-y-1 px-4">
                <Skeleton active />
              </div>
            </div>

            <div className="mb-6 mt-6 flex items-center gap-x-16 px-8">
              <div className="flex flex-col gap-y-3">
                <Typography.Title level={5} style={{ margin: 0 }}>
                  Lokasi
                </Typography.Title>
                <div className="inline-flex items-end gap-x-1 text-red-500">
                  <EnvironmentOutlined className="text-lg" />
                  <span className="text-sm">
                    <Skeleton.Input active />
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-y-3">
                <Typography.Title level={5} style={{ margin: 0 }}>
                  Bergabung
                </Typography.Title>
                <div className="inline-flex items-end gap-x-1 text-green-500">
                  <FieldTimeOutlined className="text-xl" />
                  <span className="text-sm">
                    <Skeleton.Input active />
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-y-3">
                <Typography.Title level={5} style={{ margin: 0 }}>
                  Total Produk
                </Typography.Title>
                <div className="inline-flex items-end gap-x-1 text-blue-500">
                  <ShopOutlined className="text-xl" />
                  <span className="text-sm">
                    <Skeleton.Input active />
                  </span>
                </div>
              </div>
            </div>
          </Card>
          <Card className="col-span-2 h-fit" title="Pemilik Toko">
            <div className="flex flex-col items-center gap-y-5">
              <Avatar shape="circle" icon={<UserOutlined />} size={100} className="text-3xl uppercase" />
              <Typography.Title level={5} style={{ textAlign: 'center', margin: 0 }}>
                <Skeleton.Input active />
              </Typography.Title>
            </div>
          </Card>
          <Card className="col-span-6">
            <Skeleton active />
          </Card>
          <Card className="col-span-6">
            <Skeleton active />
          </Card>
        </>
      ) : (
        <>
          {storeProfile?.completeness_status == 0 && <Alert className="col-span-12" description="Data toko anda masih belum lengkap, lengkapi data toko anda terlebih dahulu agar dapat menikmati fitur dari Belee." type="warning" showIcon closable />}
          <Card className="col-span-10" cover={<img src="/image_asset/card_background.png" className="h-32 object-cover" />}>
            <div className="relative px-4">
              <div className="absolute -top-16">
                <Avatar size={90} src={storeProfile?.logo} style={{ backgroundColor: '#fff', padding: '12px' }} className="shadow-md" />
              </div>
            </div>
            <div className="flex gap-x-6 px-4">
              <div className="mt-12 flex w-full flex-col gap-y-1 px-4">
                <Typography.Title level={4} style={{ margin: 0 }}>
                  {storeProfile?.store_name}
                </Typography.Title>
                <Typography.Text>{storeProfile?.desc}</Typography.Text>
              </div>
              <div className="flex items-center gap-x-2">
                <InstagramFilled className="text-2xl text-red-500" />
                <FacebookFilled className="text-2xl text-blue-500" />
                <YoutubeFilled className="text-2xl text-red-500" />
              </div>
            </div>

            <div className="mb-6 mt-6 flex items-center gap-x-16 px-8">
              <div className="flex flex-col gap-y-3">
                <Typography.Title level={5} style={{ margin: 0 }}>
                  Lokasi
                </Typography.Title>
                <div className="inline-flex items-end gap-x-1 text-red-500">
                  <EnvironmentOutlined className="text-lg" />
                  <span className="text-sm">Gorontalo, Tamalate</span>
                </div>
              </div>
              <div className="flex flex-col gap-y-3">
                <Typography.Title level={5} style={{ margin: 0 }}>
                  Bergabung
                </Typography.Title>
                <div className="inline-flex items-end gap-x-1 text-green-500">
                  <FieldTimeOutlined className="text-xl" />
                  <span className="text-sm">{dateFormatter(storeProfile?.created_at)}</span>
                </div>
              </div>
              <div className="flex flex-col gap-y-3">
                <Typography.Title level={5} style={{ margin: 0 }}>
                  Total Produk
                </Typography.Title>
                <div className="inline-flex items-end gap-x-1 text-blue-500">
                  <ShopOutlined className="text-xl" />
                  <span className="text-sm">12</span>
                </div>
              </div>
            </div>
          </Card>
          <Card className="col-span-2 h-fit" title="Pemilik Toko">
            <div className="flex flex-col items-center gap-y-5">
              <Avatar shape="circle" size={100} src={storeOwener?.photo} style={{ backgroundColor: '#fff' }} className="shadow-md" />
              <Typography.Title level={5} style={{ textAlign: 'center', margin: 0 }}>
                {storeOwener?.owner_name}
              </Typography.Title>
            </div>
          </Card>
          <Card className="col-span-6">ini akan jadi statistik penjualan</Card>
          <Card className="col-span-6">ini akan jadi statistik apalah</Card>
        </>
      )}
    </div>
  );
};

export default Dashboard;
