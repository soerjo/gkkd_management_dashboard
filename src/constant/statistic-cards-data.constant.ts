import { UserGroupIcon, UsersIcon, ChartBarIcon, AcademicCapIcon } from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: UserGroupIcon,
    title: "Blesscomn",
    value: "200",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last month",
    },
  },
  {
    color: "gray",
    icon: UsersIcon,
    title: "Jemaat",
    value: "4,300",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    color: "gray",
    icon: AcademicCapIcon,
    title: "Pemuridan",
    value: "462",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than last month",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Ibadah",
    value: "5,430",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
  },
];

export default statisticsCardsData;
