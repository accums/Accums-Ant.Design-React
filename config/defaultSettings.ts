import {ProLayoutProps} from '@ant-design/pro-components';


const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  title: '综合系统应用中心',
  navTheme: 'light',
  colorPrimary: '#1890ff',
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  waterMarkProps: {content: 'accums@pm.me'},
  pageTitleRender: false,
  pwa: true,
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  token: {},
  splitMenus: true,
  siderMenuType: 'sub',
};

export default Settings;
