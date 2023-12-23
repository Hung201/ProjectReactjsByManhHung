export const adminMenu = [
    { //Quản lý người dùng
        name: 'menu.admin.manage-user', menus: [
            {
                name: 'menu.admin.manage-user', link: '/system/user-manage'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user-admin'
            // },
            {
                name: 'menu.admin.crud-redux', link: '/system/crud-redux'
            },

            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
            },
            {
                //Quản lý kế hoạch khám bệnh bác sỹ
                name: 'menu.admin.manage-schedule', link: '/doctor/manage-schedule'
            }
        ]
    },
    {//Quản lý phòng khám
        name: 'menu.admin.clinic', menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/clinic-manage'
            }
        ]
    },
    {//Quản lý chuyên khoa
        name: 'menu.admin.specialist', menus: [
            {
                name: 'menu.admin.manage-specialist', link: '/system/specialist-manage'
            }
        ]
    },
    {//Quản lý cẩm nang
        name: 'menu.admin.handbook', menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/handbook-manage'
            }
        ]
    }
];

export const doctorMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            { //Quản lý kế hoạch khám bệnh bác sỹ
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },
        ]
    }
]