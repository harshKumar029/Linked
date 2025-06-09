import React, { useState, Suspense, useEffect } from "react";
import Screengroup from "../assets/Screengroup.png";
import LineChart from "../components/LineChar";
import HorizontalBarChart from "../components/HorizontalBarChart";
import { useAppContext } from "../ContextApi";
import BarChart from "../components/BarChart";
import { links } from "../utility/ApiService";
import { useNavigate } from "react-router-dom";
import corrupted from "../assets/corrupted.png";
import { handle401Error } from '../utility/handle401Error';
import Cookies from "js-cookie";
import { subDays, format, subWeeks, subMonths, subYears } from "date-fns";
import { startOfDay, startOfWeek, startOfMonth, startOfYear } from "date-fns";
import { endOfDay, endOfWeek, endOfMonth, endOfYear } from "date-fns";

// import DotMap from "../components/DotMap";
const DotMap = React.lazy(() => import("../components/DotMap"));

const Dashboard = () => {
  const [selected, setSelected] = useState("Month");
  const { user,logout, setIsOpen } = useAppContext();
  const [linksData, setLinksData] = useState([]); // Store all fetched data
  const [filteredLinks, setFilteredLinks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      console.log("1");
      const authToken = Cookies.get("authToken");
      if (!authToken) {
        alert("Error: Token not found in cookies");
        return;
      }
      console.log("2");
      try {
        const response = await links(authToken); // Pass the token directly to the links function
        console.log("3",links);
        setLinksData(response.links);
        console.log("4");
      } catch (error) {
        console.log("5", error, links);
        // alert("An unexpected error occurred. Please try again.");
        console.log("6");
        handle401Error(error, { logout, navigate, setIsOpen });
        console.error("Error occurred while logging in:", error);
      }
    };

    fetchData();
  }, []);

  const options = [
    "Day",
    "Week",
    "Month",
    // , "Year"
  ];

  //Total visit line chart
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

  const dateranges = generateDateRanges(new Date(), selected);

  // Filter data whenever `selected` changes
  useEffect(() => {
    const filtered = linksData.filter((link) => {
      const now = new Date();
      const linkDate = new Date(link.createdAt);
      console.log("thsis is linkDate", linkDate);

      if (isNaN(linkDate)) {
        console.warn("Invalid date found:", link.createdAt);
        return false;
      }

      switch (selected) {
        case "Day":
          return linkDate.toDateString() === now.toDateString();
        case "Week":
          const oneWeekAgo = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - 7
          );
          return linkDate >= oneWeekAgo;
        case "Month":
          const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
          );
          return linkDate >= oneMonthAgo;
        case "Year":
          const linkYear = linkDate.getFullYear();
          const currentYear = now.getFullYear();
          console.log(
            "Link Year:",
            linkYear,
            "Current Year:",
            currentYear,
            "Match:",
            linkYear === currentYear
          );
          return linkYear === currentYear;
        default:
          return true;
      }
    });

    console.log("Filtered Links:", filtered); // Debugging log
    setFilteredLinks(filtered);
  }, [selected, linksData]);

  console.log("thsis is filter link", filteredLinks);

  const aggregateDataByRange = (linksData, ranges) => {
    return ranges.map(({ start, end }, rangeIndex) => {
      const clicksInRange = linksData
        .filter((link) => {
          const createdAtUTC = new Date(link.createdAt).toISOString(); // Convert createdAt to UTC
          const isInRange = createdAtUTC >= start && createdAtUTC <= end;

          return isInRange;
        })
        .reduce((sum, link) => sum + link.pastAnalytics.length, 0); // Sum all clicks
      return clicksInRange;
    });
  };

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
  const currentDate = new Date();
  const ranges = generateDateRanges(currentDate, selected);
  const aggregatedData = aggregateDataByRange(linksData, ranges);
  const xAxisLabels = getXAxisLabels(ranges, selected);

  // Prepare the dataset
  const datasetsss = [
    {
      label: "Clicks",
      data: aggregatedData,

      borderColor: (function () {
        // Handle case where aggregatedData has fewer than 2 elements
        if (aggregatedData.length < 2) {
          return "rgb(255, 255, 0)"; // Yellow for insufficient data
        }

        // Compare the last two data points
        return aggregatedData[aggregatedData.length - 1] >
          aggregatedData[aggregatedData.length - 2]
          ? "rgb(4, 206, 0)" // Green for increase
          : "rgb(255, 0, 0)"; // Red for decrease
      })(),
      // borderColor: "rgb(74, 58, 255)",
      backgroundColor: "rgba(74, 58, 255, 0.2)",
      borderWidth: 2,
      tension: 0.4,
      fill: true,
    },
  ];

  // Function to calculate bigger line chart

  const generateDateRange = (option) => {
    const today = new Date();
    let months;

    switch (option) {
      case "Day":
        months = 1;
        break;
      case "Week":
        months = 7;
        break;
      case "Month":
        months = 30;
        break;
      case "Year":
        months = 12; // 12 months for a year
        break;
      default:
        months = 7;
    }

    return Array.from({ length: months }, (_, i) => {
      if (option === "Year") {
        // For "Year", return the first day of each month, e.g., "01/01/2024"
        return format(subMonths(today, months - 1 - i), "MM/dd/yyyy");
      } else {
        // For other options, use the daily format
        return format(subDays(today, months - 1 - i), "MM/dd/yyyy");
      }
    });
  };

  const getClicksAndLinksCreated = (filteredLinks, dateRange) => {
    const totalClicks = Array(dateRange.length).fill(0); // Tracks clicks for each date in the range
    const linksCreated = Array(dateRange.length).fill(0); // Tracks links created for each date in the range

    filteredLinks.forEach((link) => {
      // Format the created date
      const createdDate = format(new Date(link.createdAt), "MM/dd/yyyy");

      // Count links created
      dateRange.forEach((date, index) => {
        if (createdDate === date) {
          linksCreated[index]++;
        }
      });

      // Count clicks on specific dates
      link.pastAnalytics.forEach((analytics) => {
        const clickDate = format(new Date(analytics.timestamp), "MM/dd/yyyy");
        dateRange.forEach((date, index) => {
          if (clickDate === date) {
            totalClicks[index]++;
          }
        });
      });
    });

    return { totalClicks, linksCreated };
  };

  // Example usage with selected option
  const dateRange = generateDateRange(selected);
  const xAxisData = dateRange.map((date) => {
    // Check if the selected option is "Year"
    if (selected === "Year") {
      return format(new Date(date), "d MMM yyyy"); // Format as "1 Jan", "2 Feb", etc. for a year
    } else {
      return format(new Date(date), "d"); // Format as "1", "2", ..., for a month or day
    }
  });

  const { totalClicks, linksCreated } = getClicksAndLinksCreated(
    // filteredLinks,
    linksData,
    dateRange
  );
  const datasets = [
    {
      label: "Total Clicks",
      data: totalClicks,
      borderColor: "rgb(74, 58, 255)",
      backgroundColor: "rgb(74, 58, 255)",
      borderWidth: 2,
      tension: 0.4,
      fill: true,
    },
    {
      label: "Links Created",
      data: linksCreated,
      borderColor: "rgb(4, 206, 0)",
      backgroundColor: "rgb(4, 206, 0)",
      borderWidth: 2,
      tension: 0.4,
      fill: true,
    },
  ];

  console.log("linksCreated totalClicks", totalClicks, linksCreated);

  // Total LInk Created Function
  const datasetss = [
    {
      label: "Links Created",
      data: dateranges.map(
        ({ start, end }) =>
          linksData.filter((link) => {
            const createdAt = new Date(link.createdAt).toISOString(); // Convert to UTC ISO string
            return createdAt >= start && createdAt <= end; // Check if within range
          }).length
      ),
      borderColor: (function () {
        const data = dateranges.map(
          ({ start, end }) =>
            linksData.filter((entry) => {
              const createdAt = new Date(entry.createdAt).toISOString();
              return createdAt >= start && createdAt <= end;
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

  const calculateGrowth = (current, previous) => {
    if (previous === 0) return "N/A"; // Handle edge case
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  const getGrowthPercentage = (filteredLinks, dateRange, previousDateRange) => {
    const currentTotal = filteredLinks.filter((link) =>
      dateRange.includes(format(new Date(link.createdAt), "MM/dd/yyyy"))
    ).length;

    const previousTotal = filteredLinks.filter((link) =>
      previousDateRange.includes(format(new Date(link.createdAt), "MM/dd/yyyy"))
    ).length;

    return calculateGrowth(currentTotal, previousTotal);
  };

  //
  const previousDateRange = generateDateRange(selected, true); // Generate the previous date range
  const growthPercentage = getGrowthPercentage(
    filteredLinks,
    dateRange,
    previousDateRange
  );
  console.log(previousDateRange);

  // Function to get browser usage data from filteredLinks
  const getBrowserUsageData = () => {
    const browserCount = {};

    // Loop through all filteredLinks and count browser occurrences in pastAnalytics
    filteredLinks.forEach((link) => {
      link.pastAnalytics.forEach((analytics) => {
        const browser = analytics.browser;
        if (browserCount[browser]) {
          browserCount[browser]++;
        } else {
          browserCount[browser] = 1;
        }
      });
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
  console.log(chartData);

  const getDeviceUsageData = () => {
    const deviceCount = {};

    // Loop through all filteredLinks and count device occurrences in pastAnalytics
    filteredLinks.forEach((link) => {
      link.pastAnalytics.forEach((analytics) => {
        const device = analytics.device; // Device type (mobile, desktop, tablet, etc.)
        if (deviceCount[device]) {
          deviceCount[device]++;
        } else {
          deviceCount[device] = 1;
        }
      });
    });

    return deviceCount;
  };

  // Get device usage data and prepare chart labels and data
  const deviceUsageData = getDeviceUsageData();
  const chartLabelss = Object.keys(deviceUsageData); // Device names as labels
  const chartDataa = Object.values(deviceUsageData); // Device counts for datasets
  const bardatasets = [
    {
      label: "Device Sources",
      data: chartDataa,
      backgroundColor: "rgb(146, 145, 165)", // Color for bars
    },
  ];

  const topPerformer = filteredLinks.reduce((maxLink, currentLink) => {
    return currentLink.pastAnalytics.length > maxLink.pastAnalytics.length ? currentLink : maxLink;
  }, filteredLinks[0]);
console.log("filteredLinks",filteredLinks);
  //dot map
  const pins = filteredLinks.flatMap((link) =>
    link.pastAnalytics
      .map((analytics) => ({
        lat: parseFloat(analytics.latitude),
        lng: parseFloat(analytics.longitude),
        svgOptions: { color: "#ff6361", radius: 0.5 }, // Default pin options
      }))
      // Only include valid pins (lat and lng must be numbers and not NaN)
      .filter((pin) => !isNaN(pin.lat) && !isNaN(pin.lng))
  );

  const mapOptions = {
    height: 60,
    grid: "diagonal",
    radius: 0.3,
    color: "#413aa1",
    shape: "circle",
    backgroundColor: "#F4F6FA",
  };
  console.log("pins", pins, filteredLinks);

  const formattedDate = (createdAt) =>
    new Date(createdAt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  console.log("Full datasetss:", datasetss);
  console.log("Data array:", datasetss[0].data);
  console.log("Last element:", datasetss[0].data[datasetss[0].data.length - 1]);
  console.log(
    "Second-to-last element:",
    datasetss[0].data[datasetss[0].data.length - 2]
  );

  return (
    <div className="w-[95%] m-auto mt-5 space-y-3">
      <div className=" flex justify-between">
        <div>
          <h1 className=" text-[#434343] font-medium text-2xl">
            Overview dashboard
          </h1>
          <p
            className=" flex flex-col sm:flex-row sm:items-center gap-1"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,99,99,1) 0%, rgba(189,166,70,1) 88%, rgba(180,176,66,1) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textFillColor: "transparent",
            }}
          >
            <div className=" flex items-center gap-1">
              <span className=" font-medium text-xl">
                Hi, {user ? user.username : "Guest"}
              </span>
              <span>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.05556 7.59641C4.83981 7.04827 6.02202 7.1534 6.72618 7.73491L5.91857 6.56104C5.26865 5.63412 5.50142 4.63129 6.42917 3.98053C7.35692 3.33227 9.98582 5.07514 9.98582 5.07514C9.33005 4.13905 9.45269 2.95266 10.3888 2.29606C11.3249 1.64197 12.6164 1.86806 13.2722 2.80582L21.9656 15.0868L20.8577 25.8285L11.611 22.4562L3.5458 10.4981C2.8842 9.5562 3.1128 8.25718 4.05556 7.59641Z"
                    fill="#EF9645"
                  />
                  <path
                    d="M2.24842 14.4285C2.24842 14.4285 1.30399 13.0519 2.68143 12.1083C4.0572 11.1647 5.0008 12.5405 5.0008 12.5405L9.38174 18.9296C9.53275 18.6777 9.69795 18.429 9.88233 18.1837L3.8019 9.31756C3.8019 9.31756 2.8583 7.94179 4.23491 6.99819C5.61068 6.05459 6.55428 7.43036 6.55428 7.43036L12.2735 15.7709C12.4862 15.5974 12.704 15.423 12.9284 15.252L6.29815 5.58154C6.29815 5.58154 5.35455 4.20577 6.73115 3.26217C8.10692 2.31857 9.05052 3.69434 9.05052 3.69434L15.6808 13.3631C15.9244 13.2138 16.1655 13.0845 16.4074 12.9476L10.2102 3.91042C10.2102 3.91042 9.26661 2.53465 10.6424 1.59105C12.0182 0.647449 12.9618 2.02322 12.9618 2.02322L19.5144 11.5794L20.5106 13.0327C16.3824 15.8644 15.9895 21.1914 18.348 24.6313C18.8194 25.3196 19.5077 24.8482 19.5077 24.8482C16.6769 20.7192 17.5413 16.0796 21.6702 13.2488L20.453 7.15671C20.453 7.15671 19.9983 5.5515 21.6027 5.09597C23.2079 4.64128 23.6634 6.24648 23.6634 6.24648L25.0692 10.4214C25.6265 12.0766 26.2197 13.726 27.0048 15.2862C29.2216 19.6913 27.8975 25.1661 23.7176 28.0336C19.1581 31.1597 12.925 29.9975 9.79806 25.4389L2.24842 14.4285Z"
                    fill="#FFDC5D"
                  />
                  <path
                    d="M10.0117 26.6979C6.67446 26.6979 3.30219 23.3256 3.30219 19.9884C3.30219 19.527 2.96429 19.1541 2.50292 19.1541C2.04155 19.1541 1.63358 19.527 1.63358 19.9884C1.63358 24.9942 5.00584 28.3665 10.0117 28.3665C10.4731 28.3665 10.846 27.9585 10.846 27.4971C10.846 27.0357 10.4731 26.6979 10.0117 26.6979Z"
                    fill="#5DADEC"
                  />
                  <path
                    d="M5.84015 28.3314C3.33723 28.3314 1.66861 26.6627 1.66861 24.1598C1.66861 23.6985 1.29568 23.3255 0.834307 23.3255C0.372935 23.3255 0 23.6985 0 24.1598C0 27.4971 2.50292 30 5.84015 30C6.30152 30 6.67445 29.627 6.67445 29.1657C6.67445 28.7043 6.30152 28.3314 5.84015 28.3314ZM20.0234 1.63354C19.5628 1.63354 19.1891 2.00731 19.1891 2.46785C19.1891 2.92839 19.5628 3.30216 20.0234 3.30216C23.3606 3.30216 26.6978 6.29649 26.6978 9.97661C26.6978 10.4371 27.0716 10.8109 27.5321 10.8109C27.9927 10.8109 28.3664 10.4371 28.3664 9.97661C28.3664 5.37625 25.0292 1.63354 20.0234 1.63354Z"
                    fill="#5DADEC"
                  />
                  <path
                    d="M24.1949 0C23.7344 0 23.3606 0.338729 23.3606 0.799266C23.3606 1.2598 23.7344 1.66861 24.1949 1.66861C26.6978 1.66861 28.3314 3.52495 28.3314 5.80511C28.3314 6.26564 28.7394 6.63941 29.2007 6.63941C29.6621 6.63941 30 6.26564 30 5.80511C30 2.60387 27.5321 0 24.1949 0Z"
                    fill="#5DADEC"
                  />
                </svg>
              </span>
            </div>
            <span className=" font-medium text-xs">
              Take a look of your top performer.
            </span>
          </p>
        </div>
        <div>
          <button className=" inline-flex px-4 py-2 items-center gap-2 rounded-lg text-white bg-[#003C51] font-medium text-sm">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_68_29)">
                <path
                  d="M10.6666 8.00004L7.99998 5.33337M7.99998 5.33337L5.33331 8.00004M7.99998 5.33337V11.4667C7.99998 12.3938 7.99998 12.8574 8.36698 13.3764C8.61085 13.7213 9.31291 14.1469 9.73145 14.2036C10.3614 14.289 10.6006 14.1642 11.079 13.9146C13.2111 12.8024 14.6666 10.5712 14.6666 8.00004C14.6666 4.31814 11.6818 1.33337 7.99998 1.33337C4.31808 1.33337 1.33331 4.31814 1.33331 8.00004C1.33331 10.4676 2.67397 12.6221 4.66665 13.7748"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_68_29">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Export
          </button>
        </div>
      </div>
      <div className=" flex flex-col lg:flex-row gap-2 justify-between">
        <div className=" relative flex bg-[#FFEFDA] w-[100%] lg:w-[67%] p-5">
          <div className=" space-y-8">
            <div className=" space-y-1">
              <h2 className=" font-medium text-xl text-[#323232]">
                Create Your Link, Boost Engagement with a Single Click
              </h2>
              <p className=" text-[#9291A5] font-medium text-xs">
                Your link, your brand, your insights—all in one place.
              </p>
            </div>
            <button
              onClick={() => navigate("/Create_Link")}
              className=" bg-[#003C51] inline-flex text-[#fff] items-center gap-2 px-3 py-1 rounded-lg"
            >
              <svg
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.41665 6.04162C5.64925 6.35259 5.94603 6.60989 6.28685 6.79611C6.62766 6.98234 7.00455 7.09305 7.3919 7.12079C7.7793 7.14852 8.16811 7.09262 8.53195 6.95688C8.89584 6.82119 9.22625 6.60875 9.50083 6.33412L11.1258 4.70912C11.6192 4.1983 11.8921 3.51417 11.886 2.80406C11.8798 2.09395 11.595 1.41466 11.0928 0.912511C10.5907 0.410365 9.91141 0.125535 9.20128 0.119365C8.49116 0.11319 7.80703 0.386179 7.29624 0.879524L6.36458 1.80577M7.58333 4.95829C7.35068 4.64727 7.0539 4.38996 6.71308 4.20376C6.37227 4.01756 5.99543 3.90683 5.60803 3.87909C5.22068 3.85135 4.83188 3.90724 4.46801 4.04297C4.10414 4.17871 3.77371 4.39111 3.49915 4.66579L1.87415 6.29079C1.38081 6.80158 1.10782 7.48571 1.11399 8.19583C1.12016 8.90596 1.40499 9.58521 1.90714 10.0874C2.40929 10.5895 3.08857 10.8743 3.79869 10.8805C4.5088 10.8867 5.19293 10.6137 5.70374 10.1204L6.62999 9.19412"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Create Link
            </button>
          </div>
          <div className=" w-[15rem] hidden xl:flex absolute right-6 bottom-[-45px]">
            <img src={Screengroup} alt="Screengroup" />
          </div>
        </div>
        <div className=" md:w-[33%]">
          {!topPerformer ? (
            <div className="px-5 py-2 bg-[#F4F6FA] rounded-lg shadow-md">
              <h2 className="text-[#1e1b39] font-medium text-xl mb-3">
                No Top-Performing Link
              </h2>
              <span className=" flex justify-center">
                <img
                  className="w-14 "
                  src={corrupted}
                  alt="No data available"
                />
              </span>
              <p className="text-[#6b7280] text-sm ">
                There are currently no links to display. Once data becomes
                available, it will appear here.
              </p>
            </div>
          ) : (
            // </div>
            <div className=" px-5 py-2 bg-[#F4F6FA] rounded-lg">
              {/* <div className=" flex justify-between"> */}
              <h2 className=" text-[#1e1b39] font-medium text-xl">
                Top-performing Link
              </h2>
              <h5 className=" text-[#2c4867] font-medium text-sm">
              https://lk-sigma.vercel.app/
                {topPerformer ? topPerformer.shortURL : "http://localhost:8000"}
              </h5>
              <p className=" text-[#3e6b9b] text-sm font-semibold mt-2">
                {topPerformer ? topPerformer.URLname : "hsthYg_"}
              </p>
              <p className=" text-[#8997A6] text-sm font-medium">
                {topPerformer
                  ? topPerformer.originalURL
                  : "https://account.mongodb.com/"}
              </p>
              <div className=" inline-flex gap-5 mt-2">
                <p
                  onClick={() =>
                    navigate("/Analytics", {
                      state: { analytics: topPerformer },
                    })
                  }
                  className=" cursor-pointer inline-flex gap-1 items-center font-medium  text-[10px] text-[#2C2C2C]"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.5 3.5L6.27575 5.80305C6.17775 5.873 6.1288 5.908 6.07635 5.91855C6.0301 5.92785 5.98215 5.9239 5.9381 5.9071C5.8881 5.8881 5.8455 5.8455 5.7604 5.7604L4.2396 4.2396C4.1545 4.1545 4.1119 4.1119 4.0619 4.0929C4.01785 4.0761 3.9699 4.07215 3.92366 4.08145C3.8712 4.092 3.82223 4.127 3.72427 4.19695L0.5 6.5M2.9 9.5H7.1C7.9401 9.5 8.3601 9.5 8.681 9.3365C8.96325 9.1927 9.1927 8.96325 9.3365 8.681C9.5 8.3601 9.5 7.9401 9.5 7.1V2.9C9.5 2.05992 9.5 1.63988 9.3365 1.31902C9.1927 1.03677 8.96325 0.8073 8.681 0.66349C8.3601 0.5 7.9401 0.5 7.1 0.5H2.9C2.05992 0.5 1.63988 0.5 1.31902 0.66349C1.03677 0.8073 0.8073 1.03677 0.66349 1.31902C0.5 1.63988 0.5 2.05992 0.5 2.9V7.1C0.5 7.9401 0.5 8.3601 0.66349 8.681C0.8073 8.96325 1.03677 9.1927 1.31902 9.3365C1.63988 9.5 2.05992 9.5 2.9 9.5Z"
                      stroke="#2C2C2C"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Analytics
                </p>
                <p className=" inline-flex gap-1 items-center font-medium text-[10px] text-[#2C2C2C]">
                  <svg
                    width="10"
                    height="12"
                    viewBox="0 0 10 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.5 5H0.5M7 1V3M3 1V3M2.9 11H7.1C7.9401 11 8.3601 11 8.681 10.8365C8.96325 10.6927 9.1927 10.4632 9.3365 10.181C9.5 9.8601 9.5 9.4401 9.5 8.6V4.4C9.5 3.55992 9.5 3.13988 9.3365 2.81902C9.1927 2.53677 8.96325 2.3073 8.681 2.16349C8.3601 2 7.9401 2 7.1 2H2.9C2.05992 2 1.63988 2 1.31902 2.16349C1.03677 2.3073 0.8073 2.53677 0.66349 2.81902C0.5 3.13988 0.5 3.55992 0.5 4.4V8.6C0.5 9.4401 0.5 9.8601 0.66349 10.181C0.8073 10.4632 1.03677 10.6927 1.31902 10.8365C1.63988 11 2.05992 11 2.9 11Z"
                      stroke="#2C2C2C"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  {topPerformer
                    ? formattedDate(topPerformer.createdAt)
                    : "19/06/2024"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
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

      <div className=" flex flex-col md:flex-row justify-between">
        <div className=" w-[100%] md:w-[80%] mr-2 bg-[#F4F6FA] rounded-lg p-5">
          <p className=" text-[#9291A5]  text-sm ">Statistics</p>
          <h2 className="text-xl text-[#1E1B39] font-bold mb-4">
            Engagement Growth Rate
          </h2>
          {/* {console.log("xAxisData",xAxisData,datasets)} */}
          <LineChart
            xAxisData={xAxisData}
            datasets={datasets}
            lineColor="rgb(74, 58, 255)"
            showXAxis={true}
            showYAxis={true}
            showLegend={true}
            PointStyle={true}
            PointerboxWidth="6"
            PointerboxHeight="6"
            FontSize="12"
          />
        </div>
        <div className=" w-[100%] md:w-[20%] space-y-3 mt-3 md:mt-0">
          <div className="bg-[#F4F6FA] px-5 py-3 rounded-lg h-min">
            <p className="text-[#9291A5] text-sm">Statistics</p>
            <h2 className="text-[#1E1B39] font-bold text-lg">
              Total Links Created
            </h2>
            <div className="flex">
              <div>
                <p className="font-bold text-[2.75rem] text-[#1E1B39]">
                  {filteredLinks.length}
                </p>
                <p
                  className="font-medium text-sm"
                  style={{
                    color:
                      datasetss[0].data[datasetss[0].data.length - 1] >
                      datasetss[0].data[datasetss[0].data.length - 2]
                        ? "#04ce00" // Green for positive change
                        : "#ff3434", // Red for negative change
                  }}
                >
                  {(
                    ((datasetss[0].data[datasetss[0].data.length - 1] -
                      datasetss[0].data[datasetss[0].data.length - 2]) /
                      (datasetss[0].data[datasetss[0].data.length - 2] || 1)) * // Prevent division by zero
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
                  // width="150px"
                  // height="100px"
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
                  {" "}
                  {filteredLinks.reduce(
                    (total, link) =>
                      total +
                      (link.pastAnalytics ? link.pastAnalytics.length : 0),
                    0
                  )}
                </p>
                {/* <p className=" text-[#04CE00] font-medium text-sm">+18.1%</p> */}
                <p
                  className="font-medium text-sm"
                  style={{
                    color:
                      datasetsss[0].data[datasetsss[0].data.length - 1] >
                      datasetsss[0].data[datasetsss[0].data.length - 2]
                        ? "#04ce00" // Green for positive change
                        : "#ff3434", // Red for negative change
                  }}
                >
                  {(
                    ((datasetsss[0].data[datasetsss[0].data.length - 1] -
                      datasetsss[0].data[datasetsss[0].data.length - 2]) /
                      (datasetsss[0].data[datasetsss[0].data.length - 2] ||
                        1)) * // Prevent division by zero
                    100
                  ).toFixed(2)}
                  %
                </p>
              </div>
              <div className="w-[90%] md:w-[70%]  rounded-lg">
                <LineChart
                  xAxisData={xAxisLabels}
                  datasets={datasetsss}
                  lineColor="rgba(255, 99, 132, 1)"
                  showXAxis={false}
                  showYAxis={false}
                  // width="150px"
                  // height="100px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-col md:flex-row  justify-between">
        <div className="w-[100%] md:w-[36%] mr-2 bg-[#F4F6FA] rounded-lg p-5">
          <p className=" text-[#9291A5]  text-sm ">Statistics</p>
          <h2 className="text-xl text-[#1E1B39] font-bold mb-4">
            Browser usage
          </h2>
          <HorizontalBarChart
            labels={chartLabels}
            datasets={horizDatasets}
            // width="25.5rem"
            // height="200px"
            showLegend={false}
            showXAxis={true}
            showYAxis={true}
            highlightColor="rgb(74, 58, 255)"
            FontSize={12}
          />
        </div>
        <div className="w-[100%] md:w-[60%] bg-[#F4F6FA] rounded-lg p-5">
          <p className=" text-[#9291A5]  text-sm ">Statistics</p>
          <h2 className="text-xl text-[#1E1B39] font-bold mb-4">
            Device Sources
          </h2>
          <BarChart
            labels={chartLabelss}
            datasets={bardatasets}
            // width="45rem"
            // height="220px"
            showLegend={false}
            showXAxis={true}
            showYAxis={true}
            highlightColor="rgb(74, 58, 255)"
            FontSize={12}
          />
        </div>
      </div>
      <div className="w-[100%] bg-[#F4F6FA] rounded-lg p-5">
        <p className=" text-[#9291A5]  text-sm ">Statistics</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 ">
          Link Activity Across the Globe
        </h2>
        {/* <DotMap /> */}
        <Suspense fallback={<div>Loading map...</div>}>
          <DotMap pins={pins} mapOptions={mapOptions} />
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
