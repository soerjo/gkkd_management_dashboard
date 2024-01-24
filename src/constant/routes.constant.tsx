import { HomeIcon, UserGroupIcon, UserCircleIcon, TableCellsIcon, BookOpenIcon } from "@heroicons/react/24/solid";

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
  position?: "up" | "botom";
}

export const routes: IRoutes[] = [
  {
    title: "dasboard",
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "home",
        path: "/home",
      },
      {
        icon: <BookOpenIcon {...icon} />,
        name: "article",
        path: "/article",
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

    ],
  },
  {
    title: "auth",
    layout: "auth",
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
      },
      //     // {
      //     //   icon: <RectangleStackIcon {...icon} />,
      //     //   name: "sign up",
      //     //   path: "/sign-up",
      //     // },
    ],
  },
];