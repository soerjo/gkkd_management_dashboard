import { HomeIcon, AcademicCapIcon, GlobeAsiaAustraliaIcon, UserGroupIcon, UsersIcon, UserCircleIcon, ServerStackIcon, RectangleStackIcon } from "@heroicons/react/24/solid";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export interface IPage {
  icon: React.ReactNode;
  name: string;
  path: string;
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
        name: "blesscomn",
        path: "/blesscomn",
      },
      {
        icon: <UsersIcon {...icon} />,
        name: "jemaat",
        path: "/jemaat",
      },
      {
        icon: <AcademicCapIcon {...icon} />,
        name: "pemuridan",
        path: "/pemuridan",
      },
      {
        icon: <GlobeAsiaAustraliaIcon {...icon} />,
        name: "wilayah",
        path: "/wilayah",
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "user",
        path: "/user",
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
      },
    ],
  },
];