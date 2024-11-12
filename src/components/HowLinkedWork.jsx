import React from 'react';

const HowLinkedWork = () => {
    const demoData = [
        {
            title: 'Create a Short URL',
            duration: '1:10',
            videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
            description: 'Learn how to create a short link in just a few steps.',
        },
        {
            title: 'Share via WhatsApp',
            duration: '2:05',
            videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
            description: 'See how to share your shortened URL via WhatsApp easily.',
        },
        {
            title: 'Track Analytics',
            duration: '2:50',
            videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
            description: 'Discover how to monitor clicks and analytics.',
        },
        {
            title: 'Customize Links',
            duration: '2:30',
            videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
            description: 'Learn how to customize your shortened URLs.',
        },
        {
            title: 'Set Expiration',
            duration: '2:10',
            videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
            description: 'Control when your links expire with this feature.',
        },
        {
            title: 'Access History',
            duration: '2:10',
            videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
            description: 'Check the history of your created links at any time.',
        },
    ];

    return (
        <div className="p-8 ">
            <div className=' flex justify-center'>
                <h1 className="text-3xl font-bold mb-6">How Linked Work?</h1>
            </div>

            <div className="flex overflow-x-auto gap-6 p-4 no-scrollbar">
                {demoData.map((item, index) => (
                    <div
                        key={index}
                        className="min-w-[25rem] border border-gray-300 bg-white shadow-lg rounded-lg  hover:scale-105 transition-transform"
                    >
                        <video
                            src={item.videoSrc}
                            controls
                            className="w-full rounded-md mb-2"
                        ></video>
                        <div className='p-4  flex justify-between'>
                            <h2 className="text-xl font-bold text-[#464646] mb-2">{item.title}</h2>
                            <p className=" font-medium">Time : <span className="text-gray-600">{item.duration}</span></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HowLinkedWork;
