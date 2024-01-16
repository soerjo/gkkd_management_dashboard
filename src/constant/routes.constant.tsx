import { HomeIcon, AcademicCapIcon, GlobeAsiaAustraliaIcon, UserGroupIcon, UsersIcon, UserCircleIcon, ServerStackIcon, RectangleStackIcon, TableCellsIcon } from "@heroicons/react/24/solid";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export interface IPage {
  icon?: React.ReactNode;
  name: string;
  path: string;
  child?: IPage[];
}

export interface IRoutes {
  title?: string;
  layout: string;
  pages: Array<IPage>
}

export const routes: IRoutes[] = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "home",
        path: "/home",
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "data",
        path: "/data",
        child: [
          {
            name: "blesscomn",
            path: "/blesscomn",
          },
          {
            name: "jemaat",
            path: "/jemaat",
          },
          {
            name: "pemuridan",
            path: "/pemuridan",
          },
          {
            name: "wilayah",
            path: "/wilayah",
          }
        ]
      },
      // {
      //   name: "blesscomn",
      //   path: "/blesscomn",
      // },
      // {
      //   icon: <UsersIcon {...icon} />,
      //   name: "jemaat",
      //   path: "/jemaat",
      // },
      // {
      //   icon: <AcademicCapIcon {...icon} />,
      //   name: "pemuridan",
      //   path: "/pemuridan",
      // },
      // {
      //   icon: <GlobeAsiaAustraliaIcon {...icon} />,
      //   name: "wilayah",
      //   path: "/wilayah",
      // },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "user",
        path: "/user",
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
      },
    ],
  },
  // {
  //   title: "auth pages",
  //   layout: "auth",
  //   pages: [
  //     {
  //       icon: <ServerStackIcon {...icon} />,
  //       name: "login",
  //       path: "/auth/login",
  //     },
  //     // {
  //     //   icon: <RectangleStackIcon {...icon} />,
  //     //   name: "sign up",
  //     //   path: "/sign-up",
  //     // },
  //   ],
  // },
];