import React, { useState, useEffect, useRef } from "react";
import dashboardImg from "../assets/DasboardMacSS.png";
import cantFindImg from "../assets/findIcon.png";
import HowLinkedWork from "../components/HowLinkedWork";

// FAQ Data
const faqData = [
  {
    question: "What is a URL shortener?",
    answer:
      "A URL shortener converts a long web address into a shorter, more manageable link. It makes sharing easier and provides analytics.",
  },
  {
    question: "Is there a limit to the number of links I can shorten?",
    answer:
      "No, you can shorten as many links as you like. Some limits may apply depending on your account type.",
  },
  {
    question: "How do I track link clicks?",
    answer:
      "Use the analytics dashboard to view metrics such as total clicks, unique clicks, and device statistics.",
  },
  {
    question: "Can I edit a short link after creating it?",
    answer:
      "Yes, you can update the destination URL from the Links Management page.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach out to our support team via the “Contact Us” section at the bottom of this page.",
  },
];

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFAQs, setFilteredFAQs] = useState(faqData);
  const [expandedIndex, setExpandedIndex] = useState(null); // Track which FAQ is expanded
  const faqSectionRef = useRef(null); // Ref for the FAQ section

  // Filter FAQs based on search input
  useEffect(() => {
    const results = faqData.filter((faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFAQs(results);
  }, [searchQuery]);

  // Handle search input key press (Scroll to FAQ section on Enter)
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && faqSectionRef.current) {
      faqSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Toggle FAQ expansion
  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div>
      {/* Header Section */}
      <div className="bg-[#faebd7] py-12">
        <div className=" pl-0 m-auto sm:ml-auto flex flex-col lg:pl-12 w-[95%] lg:w-[100%] lg:flex-row justify-between items-center gap-8">
          <div className="space-y-6 flex flex-col justify-center">
            <h1 className="text-2xl lg:text-4xl font-bold">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-600">
              Find answers to your questions or contact our support team if you
              need help.
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress} // Detect Enter key press
                className="w-full max-w-md px-4 py-2 border border-gray-300 pl-10 rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 sm:w-4 text-gray-400">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_414_3398)">
                    <path
                      d="M19.3359 18.2109L14.7344 13.6094C15.875 12.2188 16.5625 10.4375 16.5625 8.49609C16.5625 4.04297 12.9492 0.429688 8.49609 0.429688C4.03906 0.429688 0.429688 4.04297 0.429688 8.49609C0.429688 12.9492 4.03906 16.5625 8.49609 16.5625C10.4375 16.5625 12.2148 15.8789 13.6055 14.7383L18.207 19.3359C18.5195 19.6484 19.0234 19.6484 19.3359 19.3359C19.6484 19.0273 19.6484 18.5195 19.3359 18.2109ZM8.49609 14.957C4.92969 14.957 2.03125 12.0586 2.03125 8.49609C2.03125 4.93359 4.92969 2.03125 8.49609 2.03125C12.0586 2.03125 14.9609 4.93359 14.9609 8.49609C14.9609 12.0586 12.0586 14.957 8.49609 14.957Z"
                      fill="#063E50"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_414_3398">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
          <div className=" relative right-0 lg:block hidden -translate-x-">
          <img
            className="hidden lg:block w-[30rem]"
            src={dashboardImg}
            alt="Dashboard"
          />
          </div>
        </div>
      </div>

      <div>
        <HowLinkedWork />
      </div>

      {/* FAQ Section */}
      <div ref={faqSectionRef} className="py-8 px-8 max-w-3xl mx-auto">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-300 py-4 cursor-pointer hover:bg-gray-50 transition"
              onClick={() => toggleExpand(index)}
            >
              <h2 className="text-xl font-semibold flex justify-between items-center">
                {faq.question}
                <span className="text-gray-500">
                  {expandedIndex === index ? "-" : "+"}
                </span>
              </h2>
              {expandedIndex === index && (
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No FAQs match your search query.
          </p>
        )}
      </div>

      {/* Contact Us Section */}
      <div className="flex w-[95%] mx-auto justify-center py-10">
        <div className="w-full lg:w-[60rem] flex flex-col lg:flex-row items-center p-6 gap-6 lg:gap-0 rounded-lg bg-[#e5e5e5] shadow-lg">
          <section className="flex flex-col lg:flex-row items-center gap-4 text-center lg:text-left">
            <img
              className="w-16 sm:w-20 lg:w-auto"
              src={cantFindImg}
              alt="Can't Find"
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Need more help?</h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-500">
                Our team is ready to assist you. Feel free to contact us!
              </p>
            </div>
          </section>
          <a
            href="mailto:harshanand029@gmail.com?subject=Support%20Query&body=Hi%2C%20I%20need%20help%20with..."
            className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Support;
