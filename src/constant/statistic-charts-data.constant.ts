import chartsConfig from "@/configs/charts-config";

const websiteViewsChart = {
  type: "bar",
  width: "100%",
  height: "220",
  series: [
    {
      name: "pertmuan pemuridan",
      data: [300, 300, 200, 330, 110, 80, 99, 320, 240],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#FB8500",
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
  },
};

const dailySalesChart = {
  type: "line",
  width: "100%",
  height: "220",
  series: [
    {
      name: "kehadiran",
      data: [50, 66, 55, 66, 73, 57, 88, 70, 73],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#0288d1"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
  },
};

const completedTaskChart = {
  type: "line",
  width: "100%",
  height: "220",
  series: [
    {
      name: "kehadiran",
      data: [1000, 1040, 1300, 1320, 1500, 1350, 1200, 1230, 1500],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#388e3c"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
  },
};
const completedTasksChart = {
  ...completedTaskChart,
  series: [
    {
      name: "Tasks",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
    },
  ],
};

export const statisticsChartsData = [
  {
    color: "white",
    title: "Aktifitas Pemuridan",
    description: "Total rata-rata aktifitas pemuridan per-bulan",
    footer: "update satu jam lalu",
    chart: websiteViewsChart,
  },
  {
    color: "white",
    title: "Kehadiran Blesscomn",
    description: "Total rata-rata kehadiran blesscomn per-bulan",
    footer: "update seminggu yang lalu",
    chart: dailySalesChart,
  },
  {
    color: "white",
    title: "Kehadiran Ibadah",
    description: "Total rata-rata kehadiran ibadah per-minggu",
    footer: "just updated",
    chart: completedTaskChart,
  },
];

export default statisticsChartsData;
