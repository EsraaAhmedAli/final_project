import{
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilSetting,
    UilChart,
    UilFileEditAlt,
    UilUserPlus,
    UilUniversity,
    UilUserCheck

} from "@iconscout/react-unicons";
export const SidebarData = [
    {
        path:"/dashboard",
        icon:UilEstate,
        heading:"Dashboard",
    },
    
    {
        path:"/news",
        icon:UilFileEditAlt,
        heading:"News",
    },
    {
        path:"/events",
        icon:UilClipboardAlt,
        heading:"Events",
    },
    {
        path:"/website",
        icon:UilChart,
        heading:"Website View",
    },
    {
        path:"/admins",
        icon:UilUsersAlt,
        heading:"Admins Table ",
    },
    {
        path:"/permissionsTable",
        icon:UilUserCheck,
        heading:"Permissions Table",
    },
    {
        path:"/facultiesTable",
        icon:UilUniversity,
        heading:"Faculties Table",
    },
    {
        path:"/createNewAdmin",
        icon:UilUserPlus,
        heading:"Create New Admin",
    },
    {
        path:"/setting",
        icon:UilSetting,
        heading:"Setting",
    },
];