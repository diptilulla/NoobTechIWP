import * as React from "react";
import { useSelector } from "react-redux";

import Navbar from "../components/navbar";
import Tilt from "../components/tilt/tilt";
import Auth from "../components/auth";
import { selectPopup } from "../redux/features/popup/popupSlice";
import "./index.scss";
import stairs from "../images/stairs.png";
import chatrooms from "../images/Chatroomss.png";
import chatroom from "../images/chatroom.png";
import timeline from "../images/Timeliness.png";
import todo from "../images/to-do.png";
import profiles from "../images/Profiless.png";
import profile from "../images/profile.png";
import goal from "../images/goal.png";
import "@fontsource/inter";
import "@fontsource/poppins";
import { selectProfile } from "../redux/features/profile/profileSlice";
import { subscribetonotifications } from "../services/notifications/notifications";

function IndexPage() {
  const userprofile = useSelector(selectProfile);
  const enableNotifications = async () => {
    if (userprofile?.id) {
      if (userprofile.interests.length === 0) {
        alert("Select interests");
        return;
      }
      const sw = await navigator.serviceWorker.register("/sw.js", {
        scope: "/"
      });
      console.log(sw);
      let subscription = await sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey:
          "BC-8gZs5eRSZLBRjaocBL0p0gtktAGB1-Qau3qY_EHfI2frHZXSqQEZz58lEwXv0fQvvuFekuqqi5A_cT6LfFiE"
      });
      const res = await subscribetonotifications({
        subscription,
        user_id: userprofile.user_id,
        interests: userprofile.interests
      });
    }
  };
  const popup = useSelector(selectPopup);

  return (
    <>
      <div className={`${popup ? "opacity-50" : ""}`}>
        <Navbar />
        <div className="container">
          <div className="box-1">
            <span className="text-7xl">Learn Adapt Overcome.</span>
            <button id="getStarted">Get started</button>
            <button
              className="px-3 lg:text-md ml-2 bg-gray-dark text-white p-2 hover:shadow-md px-8 rounded-3xl m-8"
              onClick={enableNotifications}
            >
              Enable Notifications
            </button>
          </div>
          <div className="box-2">
            <img src={stairs} />
          </div>
          <div className="box-3">
            Want to master a skill, but need a companion? Want to experience
            learning is Fun? Connect with people across the globe and share the
            passion of learning.
          </div>
          <div className="box-4">
            <Tilt>
              <img src={chatrooms} />
            </Tilt>
          </div>
          <div className="box-5">
            <img src={chatroom} />
          </div>
          <div className="box-6">
            Join chatrooms and connect with your fellow learners.
          </div>
          <div className="box-8">
            <Tilt>
              <img src={timeline} />
            </Tilt>
          </div>

          <div className="box-7">
            Keep track of your tasks, follow the deadlines & earn your badge.
          </div>
          <div className="box-9">
            <img src={todo} />
          </div>

          <div className="box-13">
            <Tilt>
              <img src={profiles} />
            </Tilt>
          </div>

          <div className="box-14">
            <img src={profile} />
          </div>
          <div className="box-15">
            Customize your profile and let us recommend you rooms on basis of
            your interests.
          </div>

          <div className="box-11">
            <img src={goal} />
          </div>
          <div className="box-10"></div>

          <div className="box-12">Reach your goals together!</div>
          <div className="footer">Credits</div>
        </div>
      </div>
      {popup ? <Auth /> : null}
    </>
  );
}

export default IndexPage;
