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
      </div>
    </div>
  )
}

export default Links
