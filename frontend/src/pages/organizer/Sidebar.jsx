import React, { useState, useEffect } from "react";

const Sidebar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDark);
  }, []);

  return (
    <div className={`flex min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <aside className="bg-white dark:bg-gray-800 w-64 min-h-screen flex flex-col">
        <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-indigo-800 dark:text-white">
            Dashboard
          </h1>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="p-4 space-y-2">
            {[
              {
                label: "Home",
                icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
              },
              {
                label: "Events Management",
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
              },
              {
                label: "Participants Management",
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
              },
             
              
            ].map((item) => (
              <li key={item.label}>
                <a
                  href="/organizer/Home"
                  className="flex items-center p-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={item.icon}
                    />
                  </svg>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
     
      </aside>
    </div>
  );
};

export default Sidebar;
