import React from 'react'

const Links = () => {
  return (
    <div>
      <div>
        <h1>Manage Links & Track Performance</h1>
        <p>Harsh, you've reached a milestone with 100 links so far.</p>
      </div>
      <div>
        <p> filter by date</p>

        <div className="relative ">
          <input
            type="text"
            placeholder="Search for something"
            className="placeholder:font-normal placeholder:text-[13px] bg-white_custom sm:placeholder:text-[16px] placeholder:text-[#ADB5BD] bg-[#F8FAFA] rounded-3xl px-16 py-4 sm:py-1.5 outline-none w-full"
          />
          <img
            // src={Search}
            alt="Search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 sm:w-4  text-gray-400"
          />
        </div>
        <button>Create Link</button>
      </div>
    </div>
  )
}

export default Links
