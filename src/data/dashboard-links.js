import { ACCOUNT_TYPE } from "../utils/constant";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  // {
  //   id: 2,
  //   name: "Dashboard",
  //   path: "/dashboard/owner",
  //   type: ACCOUNT_TYPE.OWNER,
  //   icon: "VscDashboard",
  // },
  {
    id: 3,
    name: "My Rooms",
    path: "/dashboard/my-rooms",
    type: ACCOUNT_TYPE.OWNER,
    icon: "VscHome",
  },
  {
    id: 4,
    name: "Add Rooms",
    path: "/dashboard/add-Rooms",
    type: ACCOUNT_TYPE.OWNER,
    icon: "VscAdd",
  },
  // {
  //   id: 5,
  //   name: "Enrolled Courses",
  //   path: "/dashboard/enrolled-courses",
  //   type: ACCOUNT_TYPE.STUDENT,
  //   icon: "VscMortarBoard",
  // },
  // {
  //   id: 6,
  //   name: "Purchase History",
  //   path: "/dashboard/purchase-history",
  //   type: ACCOUNT_TYPE.STUDENT,
  //   icon: "VscHistory",
  // },
  // {
  //   id: 7,
  //   name: "Cart",
  //   path: "/dashboard/cart",
  //   type: ACCOUNT_TYPE.STUDENT,
  //   icon: "VscBookmark",
  // },
];
