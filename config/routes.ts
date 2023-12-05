/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，
 * 如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },

  // 系统管理 => 组织架构
  {
    path: '/system',
    component: './system/tenant',
    icon: 'smile',
  },
  {
    //租户管理
    path: '/system/org/tenant',
    component: './system/tenant',
  },
  {
    //机构管理
    path: '/system/org/organization',
    component: './system/organization',
  },
  {
    //职位管理
    path: '/system/org/position',
    component: './system/position',
  },
  {
    //用户管理
    path: '/system/org/user',
    component: './system/user',
  },

  // 系统管理 => 权限管理
  {
    path: '/system/power/menu',
    component: './system/menu',
  },
  {
    path: '/system/power/role',
    component: './system/role/',
  },

  // 系统管理 => 数据管理
  {
    path: '/system/data/datasource',
    component: './system/datasource',
  },
  {
    path: '/system/data/dict',
    component: './system/dict',
  },
  {
    path: '/system/data/icon',
    component: './system/icon',
  },

  // 系统管理 => 日志管理

  {
    path: '/system/log/oplog',
    component: './system/oplog',
  },

  // 系统管理 => 短信服务

  {
    path: '/system/sms/alibaba',
    component: './system/sms/alibaba',
  },

  {
    path: '/system/sms/sys',
    component: './system/sms/system/',
  },

  // 系统管理 => 文件服务

  {
    path: '/system/file/alibaba/oss',
    component: './system/file/alibaba/oss',
  },

  // =======================================================================
  {
    name: '智能流程系统',
    path: '/workflow',
    component: './workflow/model',
  },
  {
    name: '流程模型',
    icon: 'antDesign',
    path: '/workflow/model',
    component: './workflow/model',
  },
  {
    name: '流程部署',
    icon: 'deploymentUnit',
    path: '/workflow/deploy',
    component: './workflow/deploy',
  },
  {
    name: '流程定义',
    icon: 'codepen',
    path: '/workflow/define',
    component: './workflow/define',
  },
  {
    name: '发起流程',
    icon: 'codepen',
    path: '/workflow/start',
    component: './workflow/start',
  },
  {
    name: '流程实例',
    icon: 'audit',
    path: '/workflow/execution',
    component: './workflow/execution',
  },
  {
    name: '流程任务',
    icon: 'exception',
    path: '/workflow/task',
    component: './workflow/task',
  },


  // =======================================================================
  {
    name: '试验检测',
    path: '/detection',
    component: './detection/categorize',
  },

  //仪器设备
  {
    name: '仪器设备',
    path: '/detection/device',
    component: './detection/device',
  },

  {
    name: '设备管理',
    path: '/detection/device/management',
    component: './detection/device',
  },

  //标准规范

  {
    name: '试验检测分类',
    path: '/detection/specification/categorize',
    component: './detection/categorize',
  },
  {
    name: '试验检测参数',
    path: '/detection/specification/parameter',
    component: './detection/parameter',
  },

  //委托登记
  {
    name: '委托合同',
    path: '/detection/registration/entrust',
    component: './detection/entrust',
  },

  //样品管理
  {
    name: '样品管理',
    path: '/detection/sample/management',
    component: './detection/sample',
  },


  //样品管理
  {
    name: '试验记录',
    path: '/detection/prob/records',
    component: './detection/prob',
  },

  //=======================智慧挪车=====================================
  //智慧挪车
  {
    name: '智慧挪车',
    path: '/move/car/',
    component: './move/car',
  },

  {
    name: '智慧挪车',
    path: '/move/car/contact',
    component: './move/car',
  },

  {
    name: '智慧挪车',
    layout: false,
    path: '/move/car/contact/apps',
    component: './move/car/apps',
  },

  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
  {
    path: '/',
    redirect: '/welcome/',
    icon: 'Home',
  },
];
