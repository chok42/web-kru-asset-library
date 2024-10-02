import { useState } from 'react';
import { Link } from 'react-router-dom';
import ClickOutside from '../ClickOutside';
import { BsMenuDown } from 'react-icons/bs';

const DropdownPage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <li>
        <Link
          onClick={() => {
            setDropdownOpen(!dropdownOpen);
          }}
          to="#"
          className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
        >
          <BsMenuDown />
        </Link>

        {dropdownOpen && (
          <div
            className={`absolute -right-27 mt-2.5 flex  w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80`}
          >
            <ul className="flex h-auto flex-col overflow-y-auto">
              <li>
                <a
                  className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                  href="https://arit.kru.ac.th/"
                  target='_blank'
                >
                  <p className="text-md">
                    <span className="text-black dark:text-white">
                      เกี่ยวกับห้องสมุด
                    </span>
                  </p>
                </a>
              </li>
              <li>
                <Link
                  className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                  to="/asset"
                >
                  <p className="text-md">
                    <span className="text-black dark:text-white">
                      เกี่ยวกับวัสดุครุภัณฑ์
                    </span>
                  </p>
                </Link>
              </li>
              <li>
                <a
                  className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                  href="https://www.kru.ac.th/kru/intro/"
                  target='_blank'
                >
                  <p className="text-md">
                    <span className="text-black dark:text-white">
                      เกี่ยวกับมหาวิทยาลัย
                    </span>
                  </p>
                </a>
              </li>
            </ul>
          </div>
        )}
      </li>
    </ClickOutside>
  );
};

export default DropdownPage;
