export default [{
        component: 'CNavItem',
        name: 'Dashboard',
        to: '/',
        icon: 'cil-speedometer',
        is_admin: 'false'
    },
    {
        component: 'CNavTitle', // --- MASTER MENU
        name: 'Register',
        is_admin: 'false'
    },
    {
        component: 'CNavItem',
        name: 'Daftar Group',
        to: '/qcc/group/add',
        icon: 'cil-pencil',
        is_admin: 'false'
    },
    {
        component: 'CNavItem',
        name: 'Group Sudah Registrasi',
        to: '/qcc/group',
        icon: 'cil-notes',
        is_admin: 'false'
    },
    {
        component: 'CNavTitle', // --- MASTER MENU
        name: 'Acitivity',
        is_admin: 'false'
    },
    {
        component: 'CNavItem',
        name: 'Upload Group Activity',
        to: '/qcc/group/activity',
        icon: 'cil-notes',
        is_admin: 'false'
    },
    {
        component: 'CNavTitle', // --- MASTER MENU
        name: 'Master Data',
        is_admin: 'true'
    },
    {
        component: 'CNavItem',
        name: 'Users',
        to: '/master/user',
        icon: 'cil-user',
        is_admin: 'true'
    },
    {
        component: 'CNavItem',
        name: 'Qcc Activity',
        to: '/qcc/activity',
        icon: 'cil-puzzle',
        is_admin: 'true'
    },
    // {
    //     component: 'CNavGroup',
    //     name: 'Locations',
    //     icon: 'cil-building',
    //     items: [{
    //             component: 'CNavItem',
    //             name: 'Company',
    //             to: '/master/company',
    //         },
    //         {
    //             component: 'CNavItem',
    //             name: 'Plant',
    //             to: '/master/plant',
    //             // icon: 'cil-factory',
    //         },
    //         {
    //             component: 'CNavItem',
    //             name: 'Shop',
    //             to: '/master/shop',
    //             // icon: 'cil-double-quote-sans-right',
    //         },
    //         {
    //             component: 'CNavItem',
    //             name: 'Line',
    //             to: '/master/line',
    //             // icon: 'cil-border-all',
    //         },
    //         {
    //             component: 'CNavItem',
    //             name: 'Machine',
    //             to: '/master/machine',
    //             // icon: 'cil-border-all',
    //         },
    //     ]
    // },
    // {
    //     component: 'CNavItem',
    //     name: 'Group',
    //     to: '/master/group',
    //     icon: 'cil-layers',
    // },
    // {
    //   component: 'CNavTitle',
    //   name: 'Theme',
    // },
    // {
    //   component: 'CNavItem',
    //   name: 'Typography',
    //   to: '/theme/typography',
    //   icon: 'cil-pencil',
    // },
    // {
    //   component: 'CNavTitle',
    //   name: 'Components',
    // },
    // {
    //   component: 'CNavGroup',
    //   name: 'Base',
    //   to: '/base',
    //   icon: 'cil-puzzle',
    //   items: [
    //     {
    //       component: 'CNavItem',
    //       name: 'Accordion',
    //       to: '/base/accordion',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Breadcrumbs',
    //       to: '/base/breadcrumbs',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Cards',
    //       to: '/base/cards',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Carousels',
    //       to: '/base/carousels',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Collapses',
    //       to: '/base/collapses',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'List Groups',
    //       to: '/base/list-groups',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Navs & Tabs',
    //       to: '/base/navs',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Paginations',
    //       to: '/base/paginations',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Placeholders',
    //       to: '/base/placeholders',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Popovers',
    //       to: '/base/popovers',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Progress',
    //       to: '/base/progress',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Spinners',
    //       to: '/base/spinners',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Tables',
    //       to: '/base/tables',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Tooltips',
    //       to: '/base/tooltips',
    //     },
    //   ],
    // },
    // {
    //   component: 'CNavGroup',
    //   name: 'Buttons',
    //   to: '/buttons',
    //   icon: 'cil-cursor',
    //   items: [
    //     {
    //       component: 'CNavItem',
    //       name: 'Buttons',
    //       to: '/buttons/standard-buttons',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Button Groups',
    //       to: '/buttons/button-groups',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Dropdowns',
    //       to: '/buttons/dropdowns',
    //     },
    //   ],
    // },
    // {
    //   component: 'CNavGroup',
    //   name: 'Forms',
    //   to: '/forms',
    //   icon: 'cil-notes',
    //   items: [
    //     {
    //       component: 'CNavItem',
    //       name: 'Form Control',
    //       to: '/forms/form-control',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Select',
    //       to: '/forms/select',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Checks & Radios',
    //       to: '/forms/checks-radios',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Range',
    //       to: '/forms/range',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Input Group',
    //       to: '/forms/input-group',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Floating Labels',
    //       to: '/forms/floating-labels',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Layout',
    //       to: '/forms/layout',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Validation',
    //       to: '/forms/validation',
    //     },
    //   ],
    // },
    // {
    //   component: 'CNavItem',
    //   name: 'Charts',
    //   to: '/charts',
    //   icon: 'cil-chart-pie',
    // },
    // {
    //   component: 'CNavGroup',
    //   name: 'Icons',
    //   to: '/icons',
    //   icon: 'cil-star',
    //   items: [
    //     {
    //       component: 'CNavItem',
    //       name: 'CoreUI Icons',
    //       to: '/icons/coreui-icons',
    //       badge: {
    //         color: 'info',
    //         text: 'NEW',
    //       },
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Brands',
    //       to: '/icons/brands',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Flags',
    //       to: '/icons/flags',
    //     },
    //   ],
    // },
    // {
    //   component: 'CNavGroup',
    //   name: 'Notifications',
    //   to: '/notifications',
    //   icon: 'cil-bell',
    //   items: [
    //     {
    //       component: 'CNavItem',
    //       name: 'Alerts',
    //       to: '/notifications/alerts',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Badges',
    //       to: '/notifications/badges',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Modals',
    //       to: '/notifications/modals',
    //     },
    //   ],
    // },
    // {
    //   component: 'CNavItem',
    //   name: 'Widgets',
    //   to: '/widgets',
    //   icon: 'cil-calculator',
    //   badge: {
    //     color: 'primary',
    //     text: 'NEW',
    //     shape: 'pill',
    //   },
    // },
    // {
    //   component: 'CNavTitle',
    //   name: 'Extras',
    // },
    // {
    //   component: 'CNavGroup',
    //   name: 'Pages',
    //   to: '/pages',
    //   icon: 'cil-star',
    //   items: [
    //     {
    //       component: 'CNavItem',
    //       name: 'Login',
    //       to: '/pages/login',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Register',
    //       to: '/pages/register',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Error 404',
    //       to: '/pages/404',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Error 500',
    //       to: '/pages/500',
    //     },
    //   ],
    // },

    // {
    //   component: 'CNavItem',
    //   name: 'Download CoreUI',
    //   href: 'http://coreui.io/vue/',
    //   icon: { name: 'cil-cloud-download', class: 'text-white' },
    //   _class: 'bg-success text-white',
    //   target: '_blank'
    // },
    // {
    //   component: 'CNavItem',
    //   name: 'Try CoreUI PRO',
    //   href: 'http://coreui.io/pro/vue/',
    //   icon: { name: 'cil-layers', class: 'text-white' },
    //   _class: 'bg-danger text-white',
    //   target: '_blank'
    // }
]