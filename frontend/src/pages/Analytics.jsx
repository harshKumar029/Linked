import React, { useEffect, useState } from "react";
import Screengroup from "../assets/Screengroup.png";
import LineChart from "../components/LineChar";
import HorizontalBarChart from "../components/HorizontalBarChart";
import BarChart from "../components/BarChart";
import DotMap from "../components/DotMap";
import PieChart from "../components/PieChart";
import GlobeChart from "../components/GlobeChart";
import { useLocation } from "react-router-dom";
import { subDays, format, subWeeks, subMonths, subYears } from "date-fns";
import { startOfDay, startOfWeek, startOfMonth, startOfYear } from "date-fns";
import { endOfDay, endOfWeek, endOfMonth, endOfYear } from "date-fns";

const Analytics = () => {
  const { state } = useLocation();
  const { analytics = {} } = state || {}; // Destructure and set default to empty object

  const [filteredAnalytics, setFilteredAnalytics] = useState([]);
  const [selected, setSelected] = useState("Week");
  const pastAnalytics = analytics.pastAnalytics || [];
  const [searchQuery, setSearchQuery] = useState("");
  const [map, setmap] = useState([]);

  const options = [
    "Day",
    "Week",
    "Month",
    // , "Year"
  ];
  // Filter data based on search query
  const Searchfiltered = analytics.pastAnalytics.filter((item) => {
    const searchString = searchQuery.toLowerCase();
    return (
      item.ip.toLowerCase().includes(searchString) ||
      item.city.toLowerCase().includes(searchString) ||
      item.region.toLowerCase().includes(searchString) ||
      item.country.toLowerCase().includes(searchString) ||
      item.browser.toLowerCase().includes(searchString) ||
      item.os.toLowerCase().includes(searchString) ||
      item.timestamp.toLowerCase().includes(searchString) ||
      item.device.toLowerCase().includes(searchString)
    );
  });
  const formattedDate = (createdAt) =>
    new Date(createdAt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

  useEffect(() => {
    if (Array.isArray(pastAnalytics)) {
      const filtered = pastAnalytics.filter((entry) => {
        const now = new Date();
        const entryDate = new Date(entry.timestamp);

        switch (selected) {
          case "Day":
            return entryDate.toDateString() === now.toDateString(); // Same day
          case "Week":
            const oneWeekAgo = new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate() - 7
            );
            return entryDate >= oneWeekAgo; // Last 7 days
          case "Month":
            const oneMonthAgo = new Date(
              now.getFullYear(),
              now.getMonth() - 1,
              now.getDate()
            );
            return entryDate >= oneMonthAgo; // Last 30 days
          case "Year":
            return entryDate.getFullYear() === now.getFullYear(); // Current year
          default:
            return true;
        }
      });

      setFilteredAnalytics(filtered);
    } else {
      console.warn("pastAnalytics is not an array:", pastAnalytics);
      setFilteredAnalytics([]); // Clear the filtered data if pastAnalytics is invalid
    }
  }, [selected, pastAnalytics]);

  const generateDateRanges = (currentDate, option) => {
    const ranges = [];

    if (option === "Day") {
      for (let i = 0; i < 4; i++) {
        const date = subDays(currentDate, i);
        const start = startOfDay(date);
        const end = endOfDay(date);
        ranges.unshift({
          start: start.toISOString(), // Use UTC ISO string
          end: end.toISOString(), // Use UTC ISO string
        });
      }
    } else if (option === "Week") {
      for (let i = 0; i < 4; i++) {
        const start = startOfWeek(subWeeks(currentDate, i), {
          weekStartsOn: 1,
        });
        const end = endOfWeek(start, { weekStartsOn: 1 });
        ranges.unshift({
          start: start.toISOString(),
          end: end.toISOString(),
        });
      }
    } else if (option === "Month") {
      for (let i = 0; i < 4; i++) {
        const start = startOfMonth(subMonths(currentDate, i));
        const end = endOfMonth(start);
        ranges.unshift({
          start: start.toISOString(),
          end: end.toISOString(),
        });
      }
    } else if (option === "Year") {
      for (let i = 0; i < 4; i++) {
        const start = startOfYear(subYears(currentDate, i));
        const end = endOfYear(start);
        ranges.unshift({
          start: start.toISOString(),
          end: end.toISOString(),
        });
      }
    }

    return ranges;
  };

  const labels = [
    "instagram",
    "Facebook",
    "Google",
    "Whatsapp",
    "Youtube",
    "Gmail",
    "Pintrest",
  ];
  const barlabels = ["Safari", "Chrome", "Firefox", "Edge"];
  const xAxisData = ["1 0ct", "2 0ct", "3 0ct", "4 0ct", "5 0ct"];

  // const datasets = [
  //   {
  //     label: 'Total Clicks',
  //     data: [65, 59, 80, 81, 56],
  //     borderColor: 'rgb(74, 58, 255)',
  //     backgroundColor: 'rgb(74, 58, 255)',
  //     borderWidth: 2,
  //     tension: 0.4,
  //     fill: true,
  //   }
  // ];
  const groupByDay = filteredAnalytics.reduce((acc, entry) => {
    const entryDate = format(new Date(entry.timestamp), "MM/dd/yyyy"); // Consistent format
    if (!acc[entryDate]) {
      acc[entryDate] = 0;
    }
    acc[entryDate] += 1;
    return acc;
  }, {});

  // Generate date range for the selected filter option
  const generateDateRange = (option) => {
    const today = new Date();
    let days;

    switch (option) {
      case "Day":
        days = 1;
        break;
      case "Week":
        days = 7;
        break;
      case "Month":
        days = 30;
        break;
      case "Year":
        days = 365;
        break;
      default:
        days = 7;
    }

    return Array.from({ length: days }, (_, i) =>
      format(subDays(today, days - 1 - i), "MM/dd/yyyy")
    );
  };

  const dateRange = generateDateRange(selected);

  const datasetData = dateRange.map((date) => {
    // If a date exists in groupByDay, use its value; otherwise, use 0
    return groupByDay[date] || 0;
  });

  const datasets = [
    {
      label: "Total Clicks",
      data: datasetData,
      borderColor: "rgb(74, 58, 255)",
      backgroundColor: "rgb(74, 58, 255)",
      borderWidth: 2,
      tension: 0.4,
      fill: true,
    },
  ];
  console.log("thisni is datasetData", datasetData);
  console.log("thisni is filteredAnalytics", filteredAnalytics);

  // Function to get browser usage data from filteredLinks
  const getBrowserUsageData = () => {
    const browserCount = {};

    // Loop through all filteredAnalytics and count browser occurrences
    filteredAnalytics.forEach((entry) => {
      const browser = entry.browser; // Access the browser property directly
      if (browser) {
        browserCount[browser] = (browserCount[browser] || 0) + 1; // Increment browser count
      }
    });

    return browserCount;
  };

  // Get browser usage data and prepare chart labels and data
  const browserUsageData = getBrowserUsageData();
  const chartLabels = Object.keys(browserUsageData); // Browser names as labels
  const chartData = Object.values(browserUsageData);

  // Chart dataset
  const horizDatasets = [
    {
      label: "Browser Usage",
      data: chartData,
      backgroundColor: "rgb(146, 145, 165)", // Color for bars
    },
  ];

  const getDeviceUsageData = () => {
    const deviceCount = {};

    // Loop through all filteredAnalytics and count device occurrences
    filteredAnalytics.forEach((entry) => {
      const device = entry.device; // Access the device type directly from the provided structure
      if (device) {
        deviceCount[device] = (deviceCount[device] || 0) + 1; // Increment device count
      }
    });

    return deviceCount;
  };

  // Get device usage data and prepare chart labels and data
  const deviceUsageData = getDeviceUsageData();
  const chartLabelss = Object.keys(deviceUsageData); // Device names as labels
  const chartDataa = Object.values(deviceUsageData); // Device counts for datasets
  const device_bardatasets = [
    {
      label: "Device Sources",
      data: chartDataa,
      backgroundColor: "rgb(146, 145, 165)", // Color for bars
    },
  ];

  console.log(
    "jhuvuvv",
    // ,dateRange,datasetData
    filteredAnalytics
    //  chartDataa,chartLabelss
  );
  const totallinks = [
    {
      label: "Line 1",
      data: [28, 48, 20, 40, 30],
      borderColor: "rgb(255, 52, 52)",
      backgroundColor: "rgb(255, 52, 52)",
      borderWidth: 2,
      fill: true,
    },
  ];
  const totalvisit = [
    {
      label: "Line 1",
      data: [28, 48, 40, 29, 46],
      borderColor: "rgb(4, 206, 0)",
      backgroundColor: "rgb(4, 206, 0)",
      borderWidth: 2,
      fill: true,
    },
  ];

  const horizdatasets = [
    {
      label: "Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: "rgb(146, 145, 165)",
    },
  ];

  const bardatasets = [
    {
      label: "Votes",
      data: [12, 19, 3, 5, 2, 3, 7],
      backgroundColor: "rgb(229, 234, 252)",
    },
  ];

  const data = [100, 150, 100];
  const Pielabels = ["Desktop", "Mobile", "Tablet"];
  const backgroundColors = ["#4A3AFF", "#2D5BFF", "#93AAFD"];

  const getDevicelocation = () => {
    const locationCount = [];

    // Loop through filteredAnalytics and create location objects
    analytics.pastAnalytics.forEach((entry) => {
      const { latitude, longitude, city } = entry;

      // Ensure latitude and longitude are valid numbers
      const parsedLatitude = parseFloat(latitude);
      const parsedLongitude = parseFloat(longitude);

      if (!isNaN(parsedLatitude) && !isNaN(parsedLongitude)) {
        locationCount.push({
          latitude: parsedLatitude,
          longitude: parsedLongitude,
          title: city || "Unknown",
        });
      }
    });

    return locationCount;
  };
  useEffect(() => {
    const locations = getDevicelocation();
    setmap(locations);
  }, []);

  const getXAxisLabels = (ranges, option) => {
    return ranges.map(({ start, end }) => {
      const startDate = new Date(start);
      if (option === "Day") return format(startDate, "MMM d"); // Show individual day
      if (option === "Week")
        return `${format(startDate, "MMM d")} - ${format(end, "MMM d")}`;
      if (option === "Month") return format(startDate, "MMM yyyy");
      if (option === "Year") return format(startDate, "yyyy");
    });
  };
  // Total LInk Created Function"
  const currentDate = new Date();
  const ranges = generateDateRanges(currentDate, selected);
  const xAxisLabels = getXAxisLabels(ranges, selected);
  const dateranges = generateDateRanges(new Date(), selected);
  const datasetss = [
    {
      label: "Total Click",
      data: dateranges.map(
        ({ start, end }) =>
          analytics.pastAnalytics.filter((entry) => {
            // Extract timestamp from the entry
            const timestamp = new Date(entry.timestamp).toISOString(); // Convert to UTC ISO string
            return timestamp >= start && timestamp <= end; // Check if timestamp falls within the range
          }).length
      ),
      borderColor: (function () {
        const data = dateranges.map(
          ({ start, end }) =>
            analytics.pastAnalytics.filter((entry) => {
              const timestamp = new Date(entry.timestamp).toISOString();
              return timestamp >= start && timestamp <= end;
            }).length
        );
        // Compare the last two data points
        return data[data.length - 1] > data[data.length - 2]
          ? "rgb(4, 206, 0)"
          : "rgb(255, 0, 0)";
      })(),
      backgroundColor: "rgba(4, 206, 0, 0.2)",
      borderWidth: 2,
      tension: 0.4,
      fill: true,
    },
  ];

  console.log("datasetss", datasetss);

  return (
    <div className="w-[95%] m-auto my-5 space-y-3">
      <div className=" flex justify-between">
        <div>
          <h1 className=" text-[#434343] font-medium text-2xl">
            Track Performance
          </h1>
          <p className=" inline-flex items-center gap-1 font-medium text-xs text-[#8997A6]">
            {" "}
            Welcome to analytics hub Manage your links
          </p>
        </div>
        <div></div>
      </div>
      <div className=" flex justify-between"></div>
      <div className=" flex justify-end">
        <div className="bg-[#F4F6FA] p-2 rounded-lg inline-flex space-x-2">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => setSelected(option)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200 ${
                selected === option
                  ? "bg-[#1E1B39] text-white"
                  : "text-[#9291A5] bg-transparent"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {/* <div className=" flex justify-between">
        <div className="w-full md:w-min lg:w-min bg-[#F4F6FA] rounded-lg p-5"> */}
      <div className=" flex flex-col md:flex-row justify-between">
        <div className=" w-[100%] md:w-[80%] mr-2 bg-[#F4F6FA] rounded-lg p-5">
          <p className=" text-[#9291A5]  text-sm ">Statistics</p>
          <h2 className="text-xl text-[#1E1B39] font-bold mb-4">
            Engagement Growth Rate
          </h2>
          {console.log("datasets fxbdfhdf", datasets)}

          <LineChart
            xAxisData={dateRange.map((date) => format(new Date(date), "d MMM"))}
            datasets={datasets}
            lineColor="rgb(74, 58, 255)"
            showXAxis={true}
            showYAxis={true}
            showLegend={true}
            PointStyle={true}
            PointerboxWidth="6"
            PointerboxHeight="6"
            FontSize="12"
            // width="56.5rem"
            // height="18.75rem"
          />
        </div>
        <div className=" w-[100%] md:w-[20%] space-y-3">
          <div className=" bg-[#F4F6FA] px-5 py-3 rounded-lg h-min">
            <p className=" text-[#9291A5]  text-sm">Statistics</p>
            <h2 className=" text-[#1E1B39] font-bold text-lg">Todays Click</h2>
            <div className=" flex">
              <div>
                <p className=" font-bold text-[2.75rem] text-[#1E1B39]">
                  {filteredAnalytics.length}
                </p>

                <p
                  className="font-medium text-sm"
                  style={{
                    color:
                      datasetss[0].data[data.length] >
                      datasetss[0].data[data.length - 1]
                        ? "#04ce00" // Green for positive change
                        : "#ff3434", // Red for negative change
                  }}
                >
                  {(
                    ((datasetss[0].data[data.length] -
                      datasetss[0].data[data.length - 1]) /
                      (datasetss[0].data[data.length - 1] || 1)) * // Prevent division by zero
                    100
                  ).toFixed(2)}
                  %
                </p>
              </div>
              <div className="w-[90%] md:w-[70%] rounded-lg">
                <LineChart
                  xAxisData={xAxisLabels}
                  datasets={datasetss}
                  lineColor="rgb(255, 52, 52)"
                  showXAxis={false}
                  showYAxis={false}
                  width="150px"
                  height="100px"
                />
              </div>
            </div>
          </div>
          <div className=" bg-[#F4F6FA] px-5 py-3 rounded-lg h-min">
            <p className=" text-[#9291A5]  text-sm">Statistics</p>
            <h2 className=" text-[#1E1B39] font-bold text-lg">Total visits</h2>
            <div className=" flex">
              <div>
                <p className=" font-bold text-[2.75rem] text-[#1E1B39]">
                  {/* {Link.pastAnalytics.lengthreduce
                } */}
                </p>
                <p className=" text-[#04CE00] font-medium text-sm">+18.1%</p>
              </div>
              <div className="w-[90%] md:w-[70%] rounded-lg">
                <LineChart
                  xAxisData={xAxisData}
                  datasets={totalvisit}
                  lineColor="rgba(255, 99, 132, 1)"
                  showXAxis={false}
                  showYAxis={false}
                  width="150px"
                  height="130px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-col lg:flex-row justify-between">
        <div className=" w-[100%] lg:w-[25%] bg-[#F4F6FA] rounded-lg p-5">
          {/* <div className="analytics-page"> */}
          <h2>Device Type Distribution</h2>
          <PieChart
            data={chartDataa}
            labels={chartLabelss}
            backgroundColors={backgroundColors}
          />
          {/* </div> */}
        </div>
        {/* <div className="w-full md:w-min lg:w-min bg-[#F4F6FA] rounded-lg p-5"> */}

        <div className="w-[100%] lg:w-[73%] bg-[#F4F6FA] rounded-lg p-5">
          <p className=" text-[#9291A5]  text-sm ">Statistics</p>
          <h2 className="text-xl text-[#1E1B39] font-bold mb-4">
            Browser usage
          </h2>
          <HorizontalBarChart
            labels={chartLabels}
            datasets={horizdatasets}
            width="auto"
            height="200px"
            showLegend={false}
            showXAxis={true}
            showYAxis={true}
            highlightColor="rgb(74, 58, 255)"
            FontSize={12}
          />
        </div>
      </div>
      {/* <div className="w-full bg-[#F4F6FA] rounded-lg p-5">

        <p className=" text-[#9291A5]  text-sm ">Statistics</p>
        <h2 className="text-xl text-[#1E1B39] font-bold mb-4">Browser usage</h2>
        <HorizontalBarChart
          labels={barlabels}
          datasets={horizdatasets}
          width="auto"
          height="200px"
          showLegend={false}
          showXAxis={true}
          showYAxis={true}
          highlightColor='rgb(74, 58, 255)'
          FontSize={12}
        />
      </div> */}
      <div className="w-full bg-[#F4F6FA] rounded-lg p-5">
        <div className=" flex justify-between">
          <div>
            <p className=" text-[#9291A5]  text-sm ">Statistics</p>
            <h2 className="text-xl text-[#1E1B39] font-bold mb-4">
              User Activity Log
            </h2>
          </div>

          <div className=" flex items-center gap-6">
            <div className="relative items-center ">
              {/* <input
                type="text"
                placeholder="Search for something"
                className="placeholder:font-normal placeholder:text-[13px] bg-white_custom sm:placeholder:text-[16px] placeholder:text-[#ADB5BD] bg-[#e7e7e7b4] rounded-lg px-16 py-4 sm:py-2 outline-none w-full"
              /> */}

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
                placeholder="Search for something"
                className="placeholder:font-normal placeholder:text-[13px] bg-white_custom sm:placeholder:text-[16px] placeholder:text-[#ADB5BD] bg-[#e7e7e7b4] rounded-lg px-16 py-4 sm:py-2 outline-none w-full"
              />

              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 sm:w-4  text-gray-400">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 14L11.1 11.1M7.33333 4C9.17427 4 10.6667 5.49239 10.6667 7.33333M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b text-left">Time</th>
                <th className="py-2 px-4 border-b text-left">IP</th>
                <th className="py-2 px-4 border-b text-left">City</th>
                <th className="py-2 px-4 border-b text-left">Region</th>
                <th className="py-2 px-4 border-b text-left">Country</th>
                <th className="py-2 px-4 border-b text-left">Browser</th>
                <th className="py-2 px-4 border-b text-left">OS</th>
                <th className="py-2 px-4 border-b text-left">Device</th>
              </tr>
            </thead>
            <tbody>
              {Searchfiltered.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">
                    {formattedDate(item.timestamp)}
                  </td>
                  <td className="py-2 px-4 border-b">{item.ip}</td>
                  <td className="py-2 px-4 border-b">{item.city}</td>
                  <td className="py-2 px-4 border-b">{item.region}</td>
                  <td className="py-2 px-4 border-b">{item.country}</td>
                  <td className="py-2 px-4 border-b">{item.browser}</td>
                  <td className="py-2 px-4 border-b">{item.os}</td>
                  <td className="py-2 px-4 border-b">{item.device}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className=" bg-[#F4F6FA] rounded-lg">
        <div className=" bg-[#F4F6FA] p-5">
          <div>
            <p className=" text-[#9291A5]  text-sm ">Statistics</p>
            <h2 className="text-xl text-[#1E1B39] font-bold mb-4">
              Global User Distribution
            </h2>
          </div>
          <GlobeChart data={map} pointColor={"#00FF00"} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
