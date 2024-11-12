import React, { useState } from "react";
import Screengroup from '../assets/Screengroup.png';
import LineChart from "../components/LineChar";
import HorizontalBarChart from "../components/HorizontalBarChart";
import BarChart from "../components/BarChart";
import DotMap from "../components/DotMap";
import PieChart from "../components/PieChart";
import GlobeChart from "../components/GlobeChart";

const Analytics = () => {

  const [selected, setSelected] = useState("Day");

  const options = ["Day", "Week", "Month", "Year"];

  const labels = ['instagram', 'Facebook', 'Google', 'Whatsapp', 'Youtube', 'Gmail', 'Pintrest'];
  const barlabels = ['Safari', 'Chrome', 'Firefox', 'Edge'];
  const xAxisData = ['1 0ct', '2 0ct', '3 0ct', '4 0ct', '5 0ct'];
  // Define datasets for two lines
  const datasets = [
    {
      label: 'Total Clicks',
      data: [65, 59, 80, 81, 56],
      borderColor: 'rgb(74, 58, 255)',
      backgroundColor: 'rgb(74, 58, 255)',
      borderWidth: 2,
      tension: 0.4,
      fill: true,
    },
    {
      label: 'Links Created',
      data: [28, 48, 40, 19, 86],
      borderColor: 'rgb(4, 206, 0)',
      backgroundColor: 'rgb(4, 206, 0)',
      borderWidth: 2,
      tension: 0.4,
      fill: true,
    },
  ];
  const totallinks = [
    {
      label: 'Line 1',
      data: [28, 48, 20, 40, 30],
      borderColor: 'rgb(255, 52, 52)',
      backgroundColor: 'rgb(255, 52, 52)',
      borderWidth: 2,
      fill: true,
    },
  ];
  const totalvisit = [
    {
      label: 'Line 1',
      data: [28, 48, 40, 29, 46],
      borderColor: 'rgb(4, 206, 0)',
      backgroundColor: 'rgb(4, 206, 0)',
      borderWidth: 2,
      fill: true,
    },
  ];

  const horizdatasets = [
    {
      label: 'Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: 'rgb(146, 145, 165)',
    },
  ];


  const bardatasets = [
    {
      label: 'Votes',
      data: [12, 19, 3, 5, 2, 3, 7],
      backgroundColor: 'rgb(229, 234, 252)',
    },
  ];

  const data = [300, 150, 100];
  const Pielabels = ['Desktop', 'Mobile', 'Tablet'];
  const backgroundColors = ['#4A3AFF', '#2D5BFF', '#93AAFD'];



  const dataPoints = [
    { latitude: 40.7128, longitude: -74.0060, title: 'New York' },
    { latitude: 34.0522, longitude: -118.2437, title: 'Los Angeles' },
    { latitude: 51.5074, longitude: -0.1278, title: 'London' },
    { latitude: 35.6895, longitude: 139.6917, title: 'Tokyo' },
    { latitude: -33.8688, longitude: 151.2093, title: 'Sydney' },
  ];
  const sampleData = [
    {
      time: "07/09/2024, 18:28:57",
      ip: "::ffff:66.249.84.97",
      city: "Mountain View",
      region: "California",
      country: "United States",
      browser: "GmailImageProxy",
      os: "Windows",
      device: "Other",
    },
    {
      time: "07/09/2024, 18:28:57",
      ip: "::ffff:66.249.84.97",
      city: "Mountain View",
      region: "California",
      country: "United States",
      browser: "GmailImageProxy",
      os: "Windows",
      device: "Other",
    },
    {
      time: "07/09/2024, 18:28:57",
      ip: "::ffff:66.249.84.97",
      city: "Mountain View",
      region: "California",
      country: "United States",
      browser: "GmailImageProxy",
      os: "Windows",
      device: "Other",
    },
    {
      time: "07/09/2024, 18:28:57",
      ip: "::ffff:66.249.84.97",
      city: "Mountain View",
      region: "California",
      country: "United States",
      browser: "GmailImageProxy",
      os: "Windows",
      device: "Other",
    },
    {
      time: "07/09/2024, 18:28:57",
      ip: "::ffff:66.249.84.97",
      city: "Mountain View",
      region: "California",
      country: "United States",
      browser: "GmailImageProxy",
      os: "Windows",
      device: "Other",
    },
    {
      time: "07/09/2024, 18:28:57",
      ip: "::ffff:66.249.84.97",
      city: "Mountain View",
      region: "California",
      country: "United States",
      browser: "GmailImageProxy",
      os: "Windows",
      device: "Other",
    },
    {
      time: "07/09/2024, 18:28:57",
      ip: "::ffff:66.249.84.97",
      city: "Mountain View",
      region: "California",
      country: "United States",
      browser: "GmailImageProxy",
      os: "Windows",
      device: "Other",
    },


  ];


  return (
    <div className='w-[95%] m-auto my-5 space-y-3'>
      <div className=" flex justify-between">
        <div>
          <h1 className=" text-[#434343] font-medium text-2xl">Track Performance</h1>
          <p className=" inline-flex items-center gap-1 font-medium text-xs text-[#8997A6]"> Welcome to analytics hub Manage your links</p>
        </div>
        <div>

        </div>
      </div>
      <div className=" flex justify-between">



      </div>
      <div className=' flex justify-end'>
        <div className="bg-[#F4F6FA] p-2 rounded-lg inline-flex space-x-2">
          {options.map((option) => (

            <button
              key={option}
              onClick={() => setSelected(option)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200 ${selected === option
                ? "bg-[#1E1B39] text-white"
                : "text-[#9291A5] bg-transparent"
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className=" flex justify-between">
        <div className="w-full md:w-min lg:w-min bg-[#F4F6FA] rounded-lg p-5">
          <p className=" text-[#9291A5]  text-sm ">Statistics</p>
          <h2 className="text-xl text-[#1E1B39] font-bold mb-4">Engagement Growth Rate</h2>
          <LineChart
            xAxisData={xAxisData}
            datasets={datasets}
            lineColor="rgb(74, 58, 255)"
            showXAxis={true}
            showYAxis={true}
            showLegend={true}
            PointStyle={true}
            PointerboxWidth='6'
            PointerboxHeight='6'
            FontSize='12'
            width="56.5rem"
            height="18.75rem"
          />
        </div>
        <div className=" space-y-3">
          <div className=" bg-[#F4F6FA] px-5 py-3 rounded-lg h-min">
            <p className=" text-[#9291A5]  text-sm">Statistics</p>
            <h2 className=" text-[#1E1B39] font-bold text-lg">Todays Click</h2>
            <div className=" flex">
              <div>
                <p className=" font-bold text-[2.75rem] text-[#1E1B39]">625</p>
                <p className=" text-[#ff3434] font-medium text-sm">-23.1%</p>
              </div>
              <div className="w-full md:w-2/3 lg:w-1/2 rounded-lg ">
                <LineChart
                  xAxisData={xAxisData}
                  datasets={totallinks}
                  lineColor="rgb(255, 52, 52)"
                  showXAxis={false}
                  showYAxis={false}
                  width="150px"
                  height="130px"
                />
              </div>
            </div>
          </div>
          <div className=" bg-[#F4F6FA] px-5 py-3 rounded-lg h-min">
            <p className=" text-[#9291A5]  text-sm">Statistics</p>
            <h2 className=" text-[#1E1B39] font-bold text-lg">Total visits</h2>
            <div className=" flex">
              <div>
                <p className=" font-bold text-[2.75rem] text-[#1E1B39]">315</p>
                <p className=" text-[#04CE00] font-medium text-sm">+18.1%</p>
              </div>
              <div className="w-full md:w-2/3 lg:w-1/2  rounded-lg">
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
      <div className=" flex justify-between">
        <div>
          <div className="analytics-page">
            <h2>Device Type Distribution</h2>
            <PieChart data={data} labels={Pielabels} backgroundColors={backgroundColors} />
          </div>
        </div>
        <div className="w-full md:w-min lg:w-min bg-[#F4F6FA] rounded-lg p-5">
          <p className=" text-[#9291A5]  text-sm ">Statistics</p>
          <h2 className="text-xl text-[#1E1B39] font-bold mb-4">Referral Sources</h2>
          <BarChart
            labels={labels}
            datasets={bardatasets}
            width="45rem"
            height="220px"
            showLegend={false}
            showXAxis={true}
            showYAxis={true}
            highlightColor='	rgb(74, 58, 255)'
            FontSize={12}
          />

        </div>
      </div>
      <div className="w-full bg-[#F4F6FA] rounded-lg p-5">

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
      </div>
      <div className="w-full bg-[#F4F6FA] rounded-lg p-5">
        <div className=" flex justify-between">
          <div>
            <p className=" text-[#9291A5]  text-sm ">Statistics</p>
            <h2 className="text-xl text-[#1E1B39] font-bold mb-4">User Activity Log</h2>
          </div>

          <div className=' flex items-center gap-6'>
            <div className="relative items-center ">
              <input
                type="text"
                placeholder="Search for something"
                className="placeholder:font-normal placeholder:text-[13px] bg-white_custom sm:placeholder:text-[16px] placeholder:text-[#ADB5BD] bg-[#e7e7e7b4] rounded-lg px-16 py-4 sm:py-2 outline-none w-full"
              />

              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 sm:w-4  text-gray-400">
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 14L11.1 11.1M7.33333 4C9.17427 4 10.6667 5.49239 10.6667 7.33333M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
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
              {sampleData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{item.time}</td>
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
            <h2 className="text-xl text-[#1E1B39] font-bold mb-4">Global User Distribution</h2>
          </div>
          <GlobeChart data={dataPoints} pointColor={'#00FF00'} />
        </div>
      </div>

    </div>
  )
}

export default Analytics
