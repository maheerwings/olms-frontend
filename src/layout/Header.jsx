import React, { useEffect, useState } from "react";
import settingIcon from "../assets/setting.png";
import userIcon from "../assets/user.png";
import { toggleSettingPopup } from "../store/slices/popUpSlice";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // State variables for time and date
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Function to update time and date
    const updateDateTime = () => {
      const now = new Date();

      // Format time to 12-hour format with AM/PM
      const hours = now.getHours() % 12 || 12; // Handle 12 AM/PM edge cases
      const minutes = now.getMinutes().toString().padStart(2, "0"); // Add leading zero
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      setCurrentTime(`${hours}:${minutes} ${ampm}`);

      // Format date to "Month Day, Year"
      const options = { month: "short", day: "numeric", year: "numeric" };
      setCurrentDate(now.toLocaleDateString("en-US", options));
    };

    // Initial update
    updateDateTime();

    // Update every minute
    const intervalId = setInterval(updateDateTime, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <header className="absolute top-0 bg-white w-full py-4 px-6 left-0 shadow-md flex justify-between items-center">
        {/* LEFT SIDE OF HEADER*/}
        <div className="flex items-center gap-2">
          <img src={userIcon} alt="userIcon" className="w-8 h-8" />
          <div className="flex flex-col">
            <span className="text-sm font-medium sm:text-lg lg:text-xl sm:font-semibold">
              {user && user.name}
            </span>
            <span className="text-sm font-medium sm:text-lg sm:font-semibold">
              {user && user.role}
            </span>
          </div>
        </div>
        {/* RIGHT SIDE OF HEADER*/}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex flex-col text-sm lg:text-base items-end font-semibold">
            <span>{currentTime}</span>
            <span>{currentDate}</span>
          </div>
          <span className="bg-[#689F38] h-14 w-[2px]"></span>
          <img
            src={settingIcon}
            alt="setting"
            className="w-8 h-8"
            onClick={() => dispatch(toggleSettingPopup())}
          />
        </div>
      </header>
    </>
  );
};

export default Header;
