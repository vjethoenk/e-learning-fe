import { useState } from "react";

const LayoutAdmin = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <body className="bg-gray-900 text-gray-200">
        <div className="flex h-screen">
          <div className="w-64 bg-gray-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-center px-6 py-4">
                <h1 className="text-2xl">Admin</h1>
              </div>

              <nav className="mt-4">
                <a
                  href="#"
                  className="flex items-center px-6 py-2 text-gray-100 bg-gray-700 rounded-md"
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                  Dashboard
                </a>

                <div className="mt-2">
                  {/* Button toggle */}
                  <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center px-6 py-2 w-full hover:bg-gray-700 rounded-md"
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 
            1.34-3 3 1.34 3 3 3zm-8 
            0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 
            5 5 6.34 5 8s1.34 3 3 
            3zm0 2c-2.33 0-7 1.17-7 
            3.5V20h14v-3.5C15 14.17 10.33 13 
            8 13zm8 0c-.29 0-.62.02-.97.05 
            1.16.84 1.97 1.97 1.97 
            3.45V20h6v-3.5c0-2.33-4.67-3.5-7-3.5z"
                      />
                    </svg>
                    Teams
                    <svg
                      className={`ml-auto w-4 h-4 transform transition-transform duration-200 ${
                        open ? "rotate-180" : "rotate-0"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Submenu */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="ml-9 rounded-md p-2 space-y-1 text-sm">
                      <a
                        href="#"
                        className="block px-3 py-1 rounded-md hover:bg-gray-600/50 hover:text-white transition"
                      >
                        Engineering
                      </a>
                      <a
                        href="#"
                        className="block px-3 py-1 rounded-md hover:bg-gray-600/50 hover:text-white transition"
                      >
                        Human Resources
                      </a>
                      <a
                        href="#"
                        className="block px-3 py-1 rounded-md hover:bg-gray-600/50 hover:text-white transition"
                      >
                        Customer Success
                      </a>
                    </div>
                  </div>
                </div>
                <a
                  href="#"
                  className="flex items-center px-6 py-2 hover:bg-gray-700 rounded-md"
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 11h10v2H7zm0 4h7v2H7z" />
                    <path
                      d="M5 4h2V2h2v2h6V2h2v2h2c1.1 
              0 2 .9 2 2v14c0 1.1-.9 2-2 
              2H5c-1.1 0-2-.9-2-2V6c0-1.1.9-2 
              2-2zm0 4v12h14V8H5z"
                    />
                  </svg>
                  Calendar
                </a>
                <a
                  href="#"
                  className="flex items-center px-6 py-2 hover:bg-gray-700 rounded-md"
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M6 2h9l5 5v15a2 2 0 0 1-2 
              2H6a2 2 0 0 1-2-2V4c0-1.1.9-2 
              2-2z"
                    />
                  </svg>
                  Documents
                </a>
                <a
                  href="#"
                  className="flex items-center px-6 py-2 hover:bg-gray-700 rounded-md"
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 
              8h14v-2H7v2zm0-4h14v-2H7v2zm0-6v2h14V7H7z"
                    />
                  </svg>
                  Reports
                </a>
              </nav>
            </div>

            <div className="flex items-center p-4 border-t border-gray-700">
              {/* <img className="w-10 h-10 rounded-full" src="https://i.pravatar.cc/40" alt="User"> */}
              <span className="ml-3 font-medium">Tom Cook</span>
            </div>
          </div>

          <div className="flex-1 p-6">
            <h1 className="text-xl text-white">Main Content Area</h1>
          </div>
        </div>
      </body>
    </>
  );
};
export default LayoutAdmin;
