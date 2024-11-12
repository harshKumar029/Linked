import React, { useState } from 'react';

const CreateLink = () => {
  const [loading, setLoading] = useState(false); // Added loading state
  const [error, setError] = useState(''); // Added error state
  const [longUrl, setLongUrl] = useState('');
  const [name, setName] = useState('');
  const [targetOption, setTargetOption] = useState('None');
  const [countryTargets, setCountryTargets] = useState([{ country: '', destination: '' }]);
  const [deviceTargets, setDeviceTargets] = useState([{ device: '', destination: '' }]);

  const countries = ['United States', 'India', 'Canada', 'Germany', 'France'];
  const devices = ['Android', 'iOS', 'Windows', 'MacOS'];

  const addCountryTarget = () => {
    setCountryTargets([...countryTargets, { country: '', destination: '' }]);
  };

  const addDeviceTarget = () => {
    setDeviceTargets([...deviceTargets, { device: '', destination: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { longUrl, name, targetOption, countryTargets, deviceTargets });
  };

  return (
    <div className=" mx-auto my-5 px-8 bg-white rounded-xl">
      <h2 className="text-2xl font-bold  text-[#434343] mb-6">Generate Your Quick Link</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Long URL Input */}
        <div>
          <label htmlFor="longUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Long URL
          </label>
          <input
            type="url"
            id="longUrl"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Enter the long URL"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Custom Alias / Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name or alias (optional)"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Targeting Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Targeting Option</label>
          <div className="flex space-x-4">
            {['None', 'Country', 'Device'].map((option) => (
              <button
                key={option}
                type="button"
                className={`px-4 py-2 rounded-lg ${
                  targetOption === option
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setTargetOption(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Conditional Inputs: Country */}
        {targetOption === 'Country' && (
          <div className="space-y-4 mt-4">
            {countryTargets.map((target, index) => (
              <div key={index} className="flex space-x-4">
                <select
                  className="w-1/2 px-4 py-2 border rounded-lg"
                  value={target.country}
                  onChange={(e) =>
                    setCountryTargets((prev) =>
                      prev.map((t, i) => (i === index ? { ...t, country: e.target.value } : t))
                    )
                  }
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <input
                  type="url"
                  className="w-1/2 px-4 py-2 border rounded-lg"
                  placeholder="Destination URL"
                  value={target.destination}
                  onChange={(e) =>
                    setCountryTargets((prev) =>
                      prev.map((t, i) => (i === index ? { ...t, destination: e.target.value } : t))
                    )
                  }
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addCountryTarget}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              + Add Another Country
            </button>
          </div>
        )}

        {/* Conditional Inputs: Device */}
        {targetOption === 'Device' && (
          <div className="space-y-4 mt-4">
            {deviceTargets.map((target, index) => (
              <div key={index} className="flex space-x-4">
                <select
                  className="w-1/2 px-4 py-2 border rounded-lg"
                  value={target.device}
                  onChange={(e) =>
                    setDeviceTargets((prev) =>
                      prev.map((t, i) => (i === index ? { ...t, device: e.target.value } : t))
                    )
                  }
                >
                  <option value="">Select Device</option>
                  {devices.map((device) => (
                    <option key={device} value={device}>
                      {device}
                    </option>
                  ))}
                </select>
                <input
                  type="url"
                  className="w-1/2 px-4 py-2 border rounded-lg"
                  placeholder="Destination URL"
                  value={target.destination}
                  onChange={(e) =>
                    setDeviceTargets((prev) =>
                      prev.map((t, i) => (i === index ? { ...t, destination: e.target.value } : t))
                    )
                  }
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addDeviceTarget}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              + Add Another Device
            </button>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className={` float-end p-3 mt-6 text-white rounded-lg font-semibold ${
            loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-500'
          }`}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Short Link'}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default CreateLink;
