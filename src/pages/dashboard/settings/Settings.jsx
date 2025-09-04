import { Card, Menu } from 'antd';
import DangerZone from './DangerZone';
import StoreSettings from './StoreSettings';
import { useState } from 'react';
import { menuSettings } from './Menu';
import SocialMedias from './SocialMedias';
import StoreOwner from './StoreOwner';

const Settings = () => {
  const [activeMenu, setActiveMenu] = useState('toko');

  return (
    <Card>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <Menu defaultSelectedKeys={[activeMenu]} defaultOpenKeys={[activeMenu]} onClick={(e) => setActiveMenu(e.key)} mode="inline" style={{ border: 0 }} items={menuSettings} />
        </div>
        <div className="col-span-9">
          {activeMenu === 'toko' && <StoreSettings />}
          {activeMenu === 'pemilik_toko' && <StoreOwner />}
          {activeMenu === 'social_media' && <SocialMedias />}
          {activeMenu === 'danger_zone' && <DangerZone />}
        </div>
      </div>
    </Card>
  );
};

export default Settings;
