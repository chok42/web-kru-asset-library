import { Link } from 'react-router-dom';
import DropdownMessage from './DropdownMessage';
import DropdownPage from './DropdownPage';
import LogoIcon from '../../images/logo/logo-kru_50.png';
import DarkModeSwitcher from './DarkModeSwitcher';

const HeaderPublic = () => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">

        <div className="flex justify-center items-center">
          <Link className="block flex-shrink-0 w-55 xl:w-55 lg:w-50 md:w-45 sm:w-40 xsm:w-40" to="/">
            <img src={LogoIcon} alt="Logo" />
          </Link>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Page Menu Area --> */}
            <DropdownPage />
            {/* <!-- Page Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            <DropdownMessage />
            {/* <!-- Chat Notification Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          {/* <DropdownUser /> */}
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default HeaderPublic;
