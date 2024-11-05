import React from 'react'

const Links = () => {
  return (
    <div className='w-[95%] m-auto my-5'>
      <div className=' space-y-4'>
        <div>
          <h1 className="text-2xl font-bold  text-[#434343] ">Manage Links & Track Performance</h1>
          <p className=" text-sm font-medium text-[#8997A6] ">Harsh, you've reached a milestone with 100 links so far.</p>
        </div>
        <div className=' flex justify-between'>
          <p> filter by date</p>


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
            <button className=' px-5 py-2 bg-[#003C51] text-white rounded-lg flex items-center gap-3'>
              <svg className='w-4' viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_98_36)">
                  <path d="M5.41665 7.04175C5.64925 7.35272 5.94603 7.61001 6.28685 7.79623C6.62766 7.98246 7.00455 8.09317 7.3919 8.12091C7.7793 8.14864 8.16811 8.09274 8.53195 7.957C8.89584 7.82131 9.22625 7.60887 9.50083 7.33425L11.1258 5.70925C11.6192 5.19843 11.8921 4.5143 11.886 3.80418C11.8798 3.09407 11.595 2.41478 11.0928 1.91263C10.5907 1.41049 9.91141 1.12566 9.20128 1.11949C8.49116 1.11331 7.80703 1.3863 7.29624 1.87965L6.36458 2.8059M7.58333 5.95841C7.35068 5.64739 7.0539 5.39008 6.71308 5.20389C6.37227 5.01768 5.99543 4.90696 5.60803 4.87921C5.22068 4.85147 4.83188 4.90736 4.46801 5.04309C4.10414 5.17883 3.77371 5.39123 3.49915 5.66591L1.87415 7.29091C1.38081 7.8017 1.10782 8.48583 1.11399 9.19595C1.12016 9.90608 1.40499 10.5853 1.90714 11.0875C2.40929 11.5896 3.08857 11.8744 3.79869 11.8806C4.5088 11.8868 5.19293 11.6138 5.70374 11.1205L6.62999 10.1942" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_98_36">
                    <rect width="13" height="13" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              Create Link</button>
          </div>
        </div>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className='bg-[#F4F6FA] flex justify-between p-4'>
          {/* </div> */}
        {/* <div className='bg-[#F4F6FA] flex justify-between p-4'> */}
          <div className='flex gap-5' >
            <div>
              <p className=' h-12 w-12 bg-[#656565] rounded-full '></p>
            </div>
            <div >
              <h3 className=' font-medium text-xl text-[#2C4867]'>Linked</h3>
              <p className=' mt-3 font-semibold text-sm text-[#3E6B9B]'>https://linked/Ecx6O81aZ</p>
              <p className=' text-sm font-medium text-[#8997A6]'>https://dribbble.com//shots/20461142-Shortie-URL-Shortener-Landing-Page</p>
              <div className=' inline-flex gap-5 mt-5'>
                <p className=' inline-flex gap-1 items-center font-medium text-xs text-[#2C2C2C]'>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 3.5L6.27575 5.80305C6.17775 5.873 6.1288 5.908 6.07635 5.91855C6.0301 5.92785 5.98215 5.9239 5.9381 5.9071C5.8881 5.8881 5.8455 5.8455 5.7604 5.7604L4.2396 4.2396C4.1545 4.1545 4.1119 4.1119 4.0619 4.0929C4.01785 4.0761 3.9699 4.07215 3.92366 4.08145C3.8712 4.092 3.82223 4.127 3.72427 4.19695L0.5 6.5M2.9 9.5H7.1C7.9401 9.5 8.3601 9.5 8.681 9.3365C8.96325 9.1927 9.1927 8.96325 9.3365 8.681C9.5 8.3601 9.5 7.9401 9.5 7.1V2.9C9.5 2.05992 9.5 1.63988 9.3365 1.31902C9.1927 1.03677 8.96325 0.8073 8.681 0.66349C8.3601 0.5 7.9401 0.5 7.1 0.5H2.9C2.05992 0.5 1.63988 0.5 1.31902 0.66349C1.03677 0.8073 0.8073 1.03677 0.66349 1.31902C0.5 1.63988 0.5 2.05992 0.5 2.9V7.1C0.5 7.9401 0.5 8.3601 0.66349 8.681C0.8073 8.96325 1.03677 9.1927 1.31902 9.3365C1.63988 9.5 2.05992 9.5 2.9 9.5Z" stroke="#2C2C2C" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>

                  Analytics</p>
                <p className=' inline-flex gap-1 items-center font-medium text-xs text-[#2C2C2C]'>
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 5H0.5M7 1V3M3 1V3M2.9 11H7.1C7.9401 11 8.3601 11 8.681 10.8365C8.96325 10.6927 9.1927 10.4632 9.3365 10.181C9.5 9.8601 9.5 9.4401 9.5 8.6V4.4C9.5 3.55992 9.5 3.13988 9.3365 2.81902C9.1927 2.53677 8.96325 2.3073 8.681 2.16349C8.3601 2 7.9401 2 7.1 2H2.9C2.05992 2 1.63988 2 1.31902 2.16349C1.03677 2.3073 0.8073 2.53677 0.66349 2.81902C0.5 3.13988 0.5 3.55992 0.5 4.4V8.6C0.5 9.4401 0.5 9.8601 0.66349 10.181C0.8073 10.4632 1.03677 10.6927 1.31902 10.8365C1.63988 11 2.05992 11 2.9 11Z" stroke="#2C2C2C" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  23/04/2024</p>
              </div>
            </div>
          </div>
          <div className=' inline-flex items-center space-x-2'>
            <button className=' inline-flex items-center gap-1 border border-[#acacac] hover:bg-[#E8EBF2] px-2 py-1 rounded-md'>
              <svg className=' w-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H5.2C4.0799 2 3.51984 2 3.09202 2.21799C2.71569 2.40973 2.40973 2.71569 2.21799 3.09202C2 3.51984 2 4.0799 2 5.2V12.8C2 13.9201 2 14.4802 2.21799 14.908C2.40973 15.2843 2.71569 15.5903 3.09202 15.782C3.51984 16 4.0799 16 5.2 16H8M11.2 22H18.8C19.9201 22 20.4802 22 20.908 21.782C21.2843 21.5903 21.5903 21.2843 21.782 20.908C22 20.4802 22 19.9201 22 18.8V11.2C22 10.0799 22 9.51984 21.782 9.09202C21.5903 8.71569 21.2843 8.40973 20.908 8.21799C20.4802 8 19.9201 8 18.8 8H11.2C10.0799 8 9.51984 8 9.09202 8.21799C8.71569 8.40973 8.40973 8.71569 8.21799 9.09202C8 9.51984 8 10.0799 8 11.2V18.8C8 19.9201 8 20.4802 8.21799 20.908C8.40973 21.2843 8.71569 21.5903 9.09202 21.782C9.51984 22 10.0799 22 11.2 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              Copy
            </button>
            <button className=' inline-flex items-center gap-1  border border-[#acacac] hover:bg-[#E8EBF2] px-2 py-1 rounded-md'>
              <svg className=' w-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49M21 5C21 6.65685 19.6569 8 18 8C16.3431 8 15 6.65685 15 5C15 3.34315 16.3431 2 18 2C19.6569 2 21 3.34315 21 5ZM9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12ZM21 19C21 20.6569 19.6569 22 18 22C16.3431 22 15 20.6569 15 19C15 17.3431 16.3431 16 18 16C19.6569 16 21 17.3431 21 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              Share
            </button>
            <button className=' border border-[#acacac] hover:bg-[#E8EBF2] px-2 py-2 rounded-md'>
              <svg className=' w-4 ' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 10L14 6M2.49997 21.5L5.88434 21.124C6.29783 21.078 6.50457 21.055 6.69782 20.9925C6.86926 20.937 7.03242 20.8586 7.18286 20.7594C7.35242 20.6475 7.49951 20.5005 7.7937 20.2063L21 7C22.1046 5.89543 22.1046 4.10457 21 3C19.8954 1.89543 18.1046 1.89543 17 3L3.7937 16.2063C3.49952 16.5005 3.35242 16.6475 3.24061 16.8171C3.1414 16.9676 3.06298 17.1307 3.00748 17.3022C2.94493 17.4954 2.92195 17.7021 2.87601 18.1156L2.49997 21.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </div>
                ))}
      </div>
    </div>
  )
}

export default Links
