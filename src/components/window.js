import React from "react";
import { ImCross } from "react-icons/im";

function Window({ show, onClose, item }) {
  return (
    <>
      {show && (
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
          className="w-11/12 p-10 bg-black sm:w-7/12 md:w-1/2 lg:w-4/12 m-auto border-2 border-purple rounded-md"
        >
          <ImCross
            className="block ml-auto cursor-pointer text-gray"
            onClick={onClose}
          />
          <div>
            <h1 className="text-purple">{item.title}</h1>
            <hr className="m-4" />
            <h2>Description</h2>
            <p>{item.content}</p>
            <h2>Status</h2>
            <p>
              {item.icon}
              {`${item.status.charAt(0).toUpperCase()}${item.status.slice(1)}`}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Window;
