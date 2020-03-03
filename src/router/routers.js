import Main from '@/components/main'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  // 登录
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  // 首页
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: false,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: false,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home/homeshow.vue')
      }
    ]
  },
  {
    path: '',
    name: 'ame_report',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: '/new_ame_report',
        name: 'new_ame_report',
        meta: {
          title: '新填报页面',
          hideInMenu: true
        },
        component: () => import('@/view/new-write-page/write-page.vue')
      },
      {
        path: '/addReport',
        name: 'addReport',
        meta: {
          title: '新增填报',
          hideInMenu: true
        },
        component: () => import('@/view/ame-report/report-audit-add.vue')
      },
      {
        path: '/addReportReturn',
        name: 'addReportReturn',
        meta: {
          title: '重新填报',
          hideInMenu: true
        },
        component: () => import('@/view/ame-report/report-audit-return.vue')
      },
      {
        path: '/addDispose',
        name: 'addDispose',
        meta: {
          title: '事件办理审批',
          hideInMenu: true
        },
        component: () => import('@/view/ame-report/report-dispose-add.vue')
      },
      {
        path: '/addInform',
        name: 'addInform',
        meta: {
          title: '添加审核',
          hideInMenu: true
        },
        component: () => import('@/view/ame-report/report-inform-add.vue')
      }
    ]
  },
  {
    path: '/ame_report_all',
    name: 'ame_report_all',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: '/reportAll',
        name: 'reportAll',
        meta: {
          title: '事件报告分析',
          hideInMenu: true
        },
        component: () => import('@/view/ame-report/report-all-add.vue')
      }
    ]
  },
  // 流程设计更新
  {
    path: '/process',
    name: 'process',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: '/ame_desgin_add',
        name: 'ame_desgin_add',
        meta: {
          title: '流程设计新增',
          hideInMenu: true
        },
        component: () => import('@/view/ame-adverse/adverse-desginadd.vue')
      },
      {
        path: '/ame_desgin_update',
        name: 'ame_desgin_update',
        meta: {
          title: '流程设计更新',
          hideInMenu: true
        },
        component: () => import('@/view/ame-adverse/adverse-desgin.vue')
      }
    ]
  },
  // 事件管理--ycbx
  {
    path: '/event_notification',
    name: 'event_notification',
    component: Main,
    meta: {
      hideInBread: true,
      icon: 'ios-ribbon',
      title: '事件管理',
      access: ['event_write:view']
    },
    children: [
      {
        path: 'event_write',
        name: 'event_write',
        meta: {
          title: '事件填报',
          access: ['event_write:view']
        },
        // component: () => import('@/view/ame-report/report-audit.vue')
        // 市医院重新改版
        component: () => import('@/view/affairList/affair-list.vue')
      },
      {
        path: 'event_handle',
        name: 'event_handle',
        meta: {
          title: '事件办理',
          access: ['event_handle:view']
        },
        // component: () => import('@/view/ame-report/report-dispose.vue')
        // 市医院重新改版
        component: () => import('@/view/affairList/affair-handler-list.vue')
      },
      {
        path: 'event_manager',
        name: 'event_manager',
        meta: {
          title: '事件列表',
          access: ['event_manager:view']
        },
        // component: () => import('@/view/ame-report/report-dispose.vue')
        // 市医院重新改版
        component: () => import('@/view/affairList/affair-manager-list.vue')
      },
      {
        path: 'affair_nurse_add',
        name: 'affair_nurse_add',
        meta: {
          title: '新增护理填报',
          hideInMenu: true
        },
        component: () => import('@/view/affairList/affair-form/nurse-form.vue')
      },
      {
        path: 'affair_appliance_add',
        name: 'affair_appliance_add',
        meta: {
          title: '新增医疗器械不良事件',
          hideInMenu: true
        },
        component: () => import('@/view/affairList/affair-form/appliance-form.vue')
      },
      {
        path: 'affair_blood_add',
        name: 'affair_blood_add',
        meta: {
          title: '新增输血不良反应事件',
          hideInMenu: true
        },
        component: () => import('@/view/affairList/affair-form/blood-form.vue')
      },
      {
        path: 'affair_drug_add',
        name: 'affair_drug_add',
        meta: {
          title: '新增药品不良反应事件',
          hideInMenu: true
        },
        component: () => import('@/view/affairList/affair-form/drug-form.vue')
      },
      {
        path: 'affair_mistake_add',
        name: 'affair_mistake_add',
        meta: {
          title: '新增用药差错填报事件',
          hideInMenu: true
        },
        component: () => import('@/view/affairList/affair-form/mistake-form.vue')
      },
      {
        path: 'affair_other_add',
        name: 'affair_other_add',
        meta: {
          title: '新增其他不良事件',
          hideInMenu: true
        },
        component: () => import('@/view/affairList/affair-form/other-form.vue')
      },
      {
        path: 'affair_nurse_detail',
        name: 'affair_nurse_detail',
        meta: {
          title: '护理事件详情',
          hideInMenu: true
        },
        component: () => import('@/view/affairList/affair-details/nurse-details.vue')
      },
      {
        path: 'affair_appliance_detail',
        name: 'affair_appliance_detail',
        meta: {
          title: '医疗器械不良事件详情',
          hideInMenu: true
        },
        component: () => import('@/view/affairList/affair-details/appliance-details.vue')
      },
      {
        path: 'affair_blood_detail',
        name: 'affair_blood_detail',
        meta: {
          title: '输血不良反应事件详情',
          hideInMenu: true
        },
        component: () => import('@/view/affairList/affair-details/blood-details.vue')
      },
      {
        path: 'affair_drug_detail',
        name: 'affair_drug_detail',
        meta: {
          title: '药品不良反应事件详情',
          hideInMenu: true
        },
        component: () => import('@/view/affairList/affair-details/drug-details.vue')
      },
      {
        path: 'affair_mistake_detail',
        name: 'affair_mistake_detail',
        meta: {
          title: '用药差错不良事件详情',
          hideInMenu: true
        },
        component: () => import('@/view/affairList/affair-details/mistake-details.vue')
      },
      {
        path: 'affair_other_detail',
        name: 'affair_other_detail',
        meta: {
          title: '其他不良事件详情',
          hideInMenu: true
        },
        component: () => import('@/view/affairList/affair-details/other-details.vue')
      }
      // {
      //   path: 'event_audit',
      //   name: 'event_audit',
      //   meta: {
      //     title: '事件审核'
      //   },
      //   component: () => import('@/view/ame-report/report-inform.vue')
      // }
    ]
  },

  // 事件统计--ycbx
  {
    path: '/event_statistics',
    name: 'event_statistics',
    component: Main,
    meta: {
      hideInBread: true,
      icon: 'ios-list-box',
      title: '事件统计',
      access: ['event_floor:view']
    },
    children: [
      {
        path: 'event_floor',
        name: 'event_floor',
        meta: {
          title: '全院统计查询',
          access: ['event_floor:view']
        },
        component: () => import('@/view/ame-incident/incident-all.vue')
      },
      {
        path: 'event_personage',
        name: 'event_personage',
        meta: {
          title: '本科室统计'
        },
        component: () => import('@/view/ame-incident/incident-personage.vue')
      }
      // {
      //   path: 'event_all',
      //   name: 'event_all',
      //   meta: {
      //     title: '事件分析统计',
      //     access: ['event_all:view']
      //   },
      //   component: () => import('@/view/ame-report/report-all.vue')
      // }
    ]
  },
  // 系统管理--ycbx
  {
    path: '/system_settings',
    name: 'system_settings',
    component: Main,
    meta: {
      hideInBread: true,
      icon: 'md-settings',
      title: '系统管理',
      access: ['sys_category:view']
    },
    children: [
      {
        path: 'sys_category',
        name: 'sys_category',
        meta: {
          title: '科室管理',
          access: ['sys_category:view']
        },
        component: () => import('@/view/ame-adverse/adverse-desk.vue')
      },
      {
        path: 'sys_grade',
        name: 'sys_grade',
        meta: {
          title: '不良事件等级设置',
          access: ['sys_grade:view']
        },
        component: () => import('@/view/ame-adverse/adverse-grade.vue')
      },
      {
        path: 'sys_desginList',
        name: 'sys_desginList',
        meta: {
          title: '不良事件流程模型管理',
          access: ['sys_desginList:view']
        },
        component: () => import('@/view/ame-adverse/adverse-desginList.vue')
      },
      {
        path: 'sys_process',
        name: 'sys_process',
        meta: {
          title: '不良事件类型流程设置',
          access: ['sys_process:view']
        },
        component: () => import('@/view/ame-adverse/adverse-dispose.vue')
      }
      // {
      //   path: 'sys_inpatient',
      //   name: 'sys_inpatient',
      //   meta: {
      //     title: '病区管理',
      //     access: ['sys_inpatient:view']
      //   },
      //   component: () => import('@/view/ame-adverse/adverse-inpatient.vue')
      // },
      // {
      //   path: 'sys_fill',
      //   name: 'sys_fill',
      //   meta: {
      //     title: '事件填报字段管理',
      //     access: ['sys_fill:view']
      //   },
      //   component: () => import('@/view/ame-fill/fill-table.vue')
      // },
      // {
      //   path: 'sys_type_new',
      //   name: 'sys_type_new',
      //   meta: {
      //     title: '不良事件类型设置',
      //     access: ['sys_type_new:view']
      //   },
      //   component: () => import('@/view/ame-adverse/dispose-type-new.vue')
      // },
      // {
      //   path: 'sys_dispose_event_reason_tree',
      //   name: 'sys_dispose_event_reason_tree',
      //   meta: {
      //     title: '事件原因树设置',
      //     access: ['sys_dispose_event_reason_tree:view']
      //   },
      //   component: () => import('@/view/ame-adverse/dispose-event-reason-tree.vue')
      // },
      // {
      //   path: 'sys_dict',
      //   name: 'sys_dict',
      //   meta: {
      //     title: '字典库管理',
      //     access: ['sys_dict:view']
      //   },
      //   component: () => import('@/view/ame-adverse/adverse-dict.vue')
      // }
    ]
  },
  // 权限管理--ycbx
  {
    path: '/auth',
    name: 'auth',
    component: Main,
    meta: {
      hideInBread: true,
      icon: 'ios-key',
      title: '权限管理',
      access: ['user:view']
    },
    children: [
      {
        path: 'key_user',
        name: 'key_user',
        meta: {
          title: '用户管理',
          access: ['user:view']
        },
        component: () => import('@/view/ame-authc/User.vue')
      },
      {
        path: 'key_role',
        name: 'key_role',
        meta: {
          title: '角色管理',
          access: ['role:view']
        },
        component: () => import('@/view/ame-authc/Role.vue')
      },
      {
        path: 'key_resource',
        name: 'key_resource',
        meta: {
          title: '资源管理',
          access: ['resource:view']
        },
        component: () => import('@/view/ame-authc/Resource.vue')
      }
    ]
  },
  // 通知管理--ycbx
  {
    path: '/inform',
    name: 'inform',
    component: Main,
    meta: {
      hideInBread: true,
      title: '消息通知',
      access: ['user_inform:view']
    },
    children: [
      {
        path: 'user_inform',
        name: 'user_inform',
        meta: {
          icon: 'md-megaphone',
          title: '通知管理',
          access: ['user_inform:view']
        },
        component: () => import('@/view/ame-inform/inform.vue')
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },
  // 流程设计新增
  // {
  //   path: '/processAdd',
  //   name: 'processAdd',
  //   component: Main,
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   children: [
  //     {
  //       path: '/ame_desgin_add',
  //       name: 'ame_desgin_add',
  //       meta: {
  //         title: '流程设计新增',
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/ame-adverse/adverse-desginadd.vue')
  //     }
  //   ]
  // },
  // 市医院事件新增路由
  // {
  //   path: '/event',
  //   name: 'event',
  //   component: Main,
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   children: [
  //     {
  //       path: '/affair_nurse_add',
  //       name: 'affair_nurse_add',
  //       meta: {
  //         title: '新增护理填报',
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/affairList/affair-form/nurse-form.vue')
  //     },
  //     {
  //       path: '/affair_appliance_add',
  //       name: 'affair_appliance_add',
  //       meta: {
  //         title: '新增医疗器械不良事件',
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/affairList/affair-form/appliance-form.vue')
  //     },
  //     {
  //       path: '/affair_blood_add',
  //       name: 'affair_blood_add',
  //       meta: {
  //         title: '新增输血不良反应事件',
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/affairList/affair-form/blood-form.vue')
  //     },
  //     {
  //       path: '/affair_drug_add',
  //       name: 'affair_drug_add',
  //       meta: {
  //         title: '新增药品不良反应事件',
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/affairList/affair-form/drug-form.vue')
  //     },
  //     {
  //       path: '/affair_mistake_add',
  //       name: 'affair_mistake_add',
  //       meta: {
  //         title: '新增用药差错填报事件',
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/affairList/affair-form/mistake-form.vue')
  //     },
  //     {
  //       path: '/affair_other_add',
  //       name: 'affair_other_add',
  //       meta: {
  //         title: '新增其他不良事件',
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/affairList/affair-form/other-form.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/affair_appliance_add',
  //   name: 'affair_appliance_add',
  //   component: Main,
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   children: [
  //     {
  //       path: '/affair_appliance_add',
  //       name: 'affair_appliance_add',
  //       meta: {
  //         title: '新增医疗器械不良事件',
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/affairList/affair-form/appliance-form.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/affair_blood_add',
  //   name: 'affair_blood_add',
  //   component: Main,
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   children: [
  //     {
  //       path: '/affair_blood_add',
  //       name: 'affair_blood_add',
  //       meta: {
  //         title: '新增输血不良反应事件',
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/affairList/affair-form/blood-form.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/affair_drug_add',
  //   name: 'affair_drug_add',
  //   component: Main,
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   children: [
  //     {
  //       path: '/affair_drug_add',
  //       name: 'affair_drug_add',
  //       meta: {
  //         title: '新增药品不良反应事件',
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/affairList/affair-form/drug-form.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/affair_mistake_add',
  //   name: 'affair_mistake_add',
  //   component: Main,
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   children: [
  //     {
  //       path: '/affair_mistake_add',
  //       name: 'affair_mistake_add',
  //       meta: {
  //         title: '新增用药差错填报事件',
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/affairList/affair-form/mistake-form.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/affair_other_add',
  //   name: 'affair_other_add',
  //   component: Main,
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   children: [
  //     {
  //       path: '/affair_other_add',
  //       name: 'affair_other_add',
  //       meta: {
  //         title: '新增其他不良事件',
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/affairList/affair-form/other-form.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/affair_appliance_detail',
  //   name: 'affair_appliance_detail',
  //   component: Main,
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   children: [
  //     {
  //       path: '/affair_appliance_detail',
  //       name: 'affair_appliance_detail',
  //       meta: {
  //         title: '医疗器械不良事件详情',
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/affairList/affair-details/appliance-details.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/affair_blood_detail',
  //   name: 'affair_blood_detail',
  //   component: Main,
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   children: [
  //     {
  //       path: '/affair_blood_detail',
  //       name: 'affair_blood_detail',
  //       meta: {
  //         title: '输血不良反应事件详情',
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/affairList/affair-details/blood-details.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/affair_drug_detail',
  //   name: 'affair_drug_detail',
  //   component: Main,
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   children: [
  //     {
  //       path: '/affair_drug_detail',
  //       name: 'affair_drug_detail',
  //       meta: {
  //         title: '药品不良反应事件详情',
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/affairList/affair-details/drug-details.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/affair_mistake_detail',
  //   name: 'affair_mistake_detail',
  //   component: Main,
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   children: [
  //     {
  //       path: '/affair_mistake_detail',
  //       name: 'affair_mistake_detail',
  //       meta: {
  //         title: '用药差错不良事件详情',
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/affairList/affair-details/mistake-details.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/affair_other_detail',
  //   name: 'affair_other_detail',
  //   component: Main,
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   children: [
  //     {
  //       path: '/affair_other_detail',
  //       name: 'affair_other_detail',
  //       meta: {
  //         title: '其他不良事件详情',
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/affairList/affair-details/other-details.vue')
  //     }
  //   ]
  // },
  // 用户管理
  // {
  //   path: '/person',
  //   name: 'person',
  //   component: Main,
  //   meta: {
  //     hideInBread: true
  //   },
  //   children: [
  //     {
  //       path: 'person_management',
  //       name: 'person_management',
  //       meta: {
  //         icon: 'md-person',
  //         title: '员工管理'
  //       },
  //       component: () => import('@/view/ame-user/userTable.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/ame_report',
  //   name: 'ame_report',
  //   meta: {
  //     title: '添加填报',
  //     hideInMenu: true
  // },
  //   component: () => import('@/view/ame-report/report-audit-add.vue')
  // },
  // {
  //   path: '/ame_report',
  //   name: 'ame_report',
  //   component: Main,
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   children: [
  //     {
  //       path: '/addReportReturn',
  //       name: 'addReportReturn',
  //       meta: {
  //         title: '重新填报',
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/ame-report/report-audit-return.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/new_ame_report',
  //   name: 'new_ame_report',
  //   component: Main,
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   children: [
  //     {
  //       path: '/new_ame_report',
  //       name: 'new_ame_report',
  //       meta: {
  //         title: '新填报页面',
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/new-write-page/write-page.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/ame_report',
  //   name: 'ame_report',
  //   component: Main,
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   children: [
  //     {
  //       path: '/addDispose',
  //       name: 'addDispose',
  //       meta: {
  //         title: '事件办理审批',
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/ame-report/report-dispose-add.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/ame_report',
  //   name: 'ame_report',
  //   component: Main,
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   children: [
  //     {
  //       path: '/addInform',
  //       name: 'addInform',
  //       meta: {
  //         title: '添加审核',
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/ame-report/report-inform-add.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/components',
  //   name: 'components',
  //   meta: {
  //     icon: 'logo-buffer',
  //     title: '组件'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'tree_select_page',
  //       name: 'tree_select_page',
  //       meta: {
  //         icon: 'md-arrow-dropdown-circle',
  //         title: '树状下拉选择器'
  //       },
  //       component: () => import('@/view/components/tree-select/index.vue')
  //     },
  //     {
  //       path: 'count_to_page',
  //       name: 'count_to_page',
  //       meta: {
  //         icon: 'md-trending-up',
  //         title: '数字渐变'
  //       },
  //       component: () => import('@/view/components/count-to/count-to.vue')
  //     },
  //     {
  //       path: 'drag_list_page',
  //       name: 'drag_list_page',
  //       meta: {
  //         icon: 'ios-infinite',
  //         title: '拖拽列表'
  //       },
  //       component: () => import('@/view/components/drag-list/drag-list.vue')
  //     },
  //     {
  //       path: 'drag_drawer_page',
  //       name: 'drag_drawer_page',
  //       meta: {
  //         icon: 'md-list',
  //         title: '可拖拽抽屉'
  //       },
  //       component: () => import('@/view/components/drag-drawer')
  //     },
  //     {
  //       path: 'org_tree_page',
  //       name: 'org_tree_page',
  //       meta: {
  //         icon: 'ios-people',
  //         title: '组织结构树'
  //       },
  //       component: () => import('@/view/components/org-tree')
  //     },
  //     {
  //       path: 'tree_table_page',
  //       name: 'tree_table_page',
  //       meta: {
  //         icon: 'md-git-branch',
  //         title: '树状表格'
  //       },
  //       component: () => import('@/view/components/tree-table/index.vue')
  //     },
  //     {
  //       path: 'cropper_page',
  //       name: 'cropper_page',
  //       meta: {
  //         icon: 'md-crop',
  //         title: '图片裁剪'
  //       },
  //       component: () => import('@/view/components/cropper/cropper.vue')
  //     },
  //     {
  //       path: 'tables_page',
  //       name: 'tables_page',
  //       meta: {
  //         icon: 'md-grid',
  //         title: '多功能表格'
  //       },
  //       component: () => import('@/view/components/tables/tables.vue')
  //     },
  //     {
  //       path: 'split_pane_page',
  //       name: 'split_pane_page',
  //       meta: {
  //         icon: 'md-pause',
  //         title: '分割窗口'
  //       },
  //       component: () => import('@/view/components/split-pane/split-pane.vue')
  //     },
  //     {
  //       path: 'markdown_page',
  //       name: 'markdown_page',
  //       meta: {
  //         icon: 'logo-markdown',
  //         title: 'Markdown编辑器'
  //       },
  //       component: () => import('@/view/components/markdown/markdown.vue')
  //     },
  //     {
  //       path: 'editor_page',
  //       name: 'editor_page',
  //       meta: {
  //         icon: 'ios-create',
  //         title: '富文本编辑器'
  //       },
  //       component: () => import('@/view/components/editor/editor.vue')
  //     },
  //     {
  //       path: 'icons_page',
  //       name: 'icons_page',
  //       meta: {
  //         icon: '_bear',
  //         title: '自定义图标'
  //       },
  //       component: () => import('@/view/components/icons/icons.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/update',
  //   name: 'update',
  //   meta: {
  //     icon: 'md-cloud-upload',
  //     title: '数据上传'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'update_table_page',
  //       name: 'update_table_page',
  //       meta: {
  //         icon: 'ios-document',
  //         title: '上传Csv'
  //       },
  //       component: () => import('@/view/update/update-table.vue')
  //     },
  //     {
  //       path: 'update_paste_page',
  //       name: 'update_paste_page',
  //       meta: {
  //         icon: 'md-clipboard',
  //         title: '粘贴表格数据'
  //       },
  //       component: () => import('@/view/update/update-paste.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/excel',
  //   name: 'excel',
  //   meta: {
  //     icon: 'ios-stats',
  //     title: 'EXCEL导入导出'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'upload-excel',
  //       name: 'upload-excel',
  //       meta: {
  //         icon: 'md-add',
  //         title: '导入EXCEL'
  //       },
  //       component: () => import('@/view/excel/upload-excel.vue')
  //     },
  //     {
  //       path: 'export-excel',
  //       name: 'export-excel',
  //       meta: {
  //         icon: 'md-download',
  //         title: '导出EXCEL'
  //       },
  //       component: () => import('@/view/excel/export-excel.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/tools_methods',
  //   name: 'tools_methods',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'tools_methods_page',
  //       name: 'tools_methods_page',
  //       meta: {
  //         icon: 'ios-hammer',
  //         title: '工具方法',
  //         beforeCloseName: 'before_close_normal'
  //       },
  //       component: () => import('@/view/tools-methods/tools-methods.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/i18n',
  //   name: 'i18n',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'i18n_page',
  //       name: 'i18n_page',
  //       meta: {
  //         icon: 'md-planet',
  //         title: 'i18n - {{ i18n_page }}'
  //       },
  //       component: () => import('@/view/i18n/i18n-page.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/error_store',
  //   name: 'error_store',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'error_store_page',
  //       name: 'error_store_page',
  //       meta: {
  //         icon: 'ios-bug',
  //         title: '错误收集'
  //       },
  //       component: () => import('@/view/error-store/error-store.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/error_logger',
  //   name: 'error_logger',
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'error_logger_page',
  //       name: 'error_logger_page',
  //       meta: {
  //         icon: 'ios-bug',
  //         title: '错误收集'
  //       },
  //       component: () => import('@/view/single-page/error-logger.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/directive',
  //   name: 'directive',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'directive_page',
  //       name: 'directive_page',
  //       meta: {
  //         icon: 'ios-navigate',
  //         title: '指令'
  //       },
  //       component: () => import('@/view/directive/directive.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/multilevel',
  //   name: 'multilevel',
  //   meta: {
  //     icon: 'md-menu',
  //     title: '多级菜单'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'level_2_1',
  //       name: 'level_2_1',
  //       meta: {
  //         icon: 'md-funnel',
  //         title: '二级-1'
  //       },
  //       component: () => import('@/view/multilevel/level-2-1.vue')
  //     },
  //     {
  //       path: 'level_2_2',
  //       name: 'level_2_2',
  //       meta: {
  //         access: ['super_admin'],
  //         icon: 'md-funnel',
  //         showAlways: true,
  //         title: '二级-2'
  //       },
  //       component: parentView,
  //       children: [
  //         {
  //           path: 'level_2_2_1',
  //           name: 'level_2_2_1',
  //           meta: {
  //             icon: 'md-funnel',
  //             title: '三级'
  //           },
  //           component: () => import('@/view/multilevel/level-2-2/level-2-2-1.vue')
  //         },
  //         {
  //           path: 'level_2_2_2',
  //           name: 'level_2_2_2',
  //           meta: {
  //             icon: 'md-funnel',
  //             title: '三级'
  //           },
  //           component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
  //         }
  //       ]
  //     },
  //     {
  //       path: 'level_2_3',
  //       name: 'level_2_3',
  //       meta: {
  //         icon: 'md-funnel',
  //         title: '二级-3'
  //       },
  //       component: () => import('@/view/multilevel/level-2-3.vue')
  //     }
  //   ]
  // },
  // 事件汇总--ycbx
  // {
  //   path: '/collect',
  //   name: 'collect',
  //   component: Main,
  //   meta: {
  //     hideInBread: true,
  //     icon: 'ios-create',
  //     title: '事件汇总',
  //     access: ''
  //   },
  //   children: [
  //     {
  //       path: 'affair_list',
  //       name: 'affair_list',
  //       meta: {
  //         title: '事件填报'
  //       },
  //       component: () => import('@/view/affairList/affair-list.vue')
  //     },
  //     {
  //       path: 'nurseForm',
  //       name: 'nurseForm',
  //       meta: {
  //         title: '护理填报'
  //       },
  //       component: () => import('@/view/affairList/affair-form/nurse-form.vue')
  //     },
  //     {
  //       path: 'applianceForm',
  //       name: 'applianceForm',
  //       meta: {
  //         title: '器械填报'
  //       },
  //       component: () => import('@/view/affairList/affair-form/appliance-form.vue')
  //     },
  //     {
  //       path: 'otherForm',
  //       name: 'otherForm',
  //       meta: {
  //         title: '其他不良事件填报'
  //       },
  //       component: () => import('@/view/affairList/affair-form/other-form.vue')
  //     },
  //     {
  //       path: 'bloodForm',
  //       name: 'bloodForm',
  //       meta: {
  //         title: '输血不良反应填报'
  //       },
  //       component: () => import('@/view/affairList/affair-form/blood-form.vue')
  //     },
  //     {
  //       path: 'drugForm',
  //       name: 'drugForm',
  //       meta: {
  //         title: '药品不良反应'
  //       },
  //       component: () => import('@/view/affairList/affair-form/drug-form.vue')
  //     },
  //     {
  //       path: 'mistakeForm',
  //       name: 'mistakeForm',
  //       meta: {
  //         title: '用药差错用药'
  //       },
  //       component: () => import('@/view/affairList/affair-form/mistake-form.vue')
  //     },
  //     {
  //       path: 'nurseDetails',
  //       name: 'nurseDetails',
  //       meta: {
  //         title: '护理详情'
  //       },
  //       component: () => import('@/view/affairList/affair-details/nurse-details.vue')
  //     },
  //     {
  //       path: 'applianceDetails',
  //       name: 'applianceDetails',
  //       meta: {
  //         title: '器械详情'
  //       },
  //       component: () => import('@/view/affairList/affair-details/appliance-details.vue')
  //     },
  //     {
  //       path: 'otherDetails',
  //       name: 'otherDetails',
  //       meta: {
  //         title: '其它详情'
  //       },
  //       component: () => import('@/view/affairList/affair-details/other-details.vue')
  //     },
  //     {
  //       path: 'bloodDetails',
  //       name: 'bloodDetails',
  //       meta: {
  //         title: '输血不良反应详情'
  //       },
  //       component: () => import('@/view/affairList/affair-details/blood-details.vue')
  //     },
  //     {
  //       path: 'drugDetails',
  //       name: 'drugDetails',
  //       meta: {
  //         title: '药品不良反应详情'
  //       },
  //       component: () => import('@/view/affairList/affair-details/drug-details.vue')
  //     },
  //     {
  //       path: 'mistakeDetails',
  //       name: 'mistakeDetails',
  //       meta: {
  //         title: '用药差错用药详情'
  //       },
  //       component: () => import('@/view/affairList/affair-details/mistake-details.vue')
  //     }
  //   ]
  // },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `{{ params }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: route => `{{ query }}-${route.query.id}`,
          notCache: true
        },
        component: () => import('@/view/argu-page/query.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
