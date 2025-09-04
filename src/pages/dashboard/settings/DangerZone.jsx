import { Button, Form, Typography } from 'antd';

const DangerZone = () => {
  return (
    <Form className="mb-4 mt-2 flex flex-col gap-y-12">
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
          </div>
        </div>
      </div>
    </Form>
  );
};

export default DangerZone;
