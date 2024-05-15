import React from "react";

const Message = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="2-10 rounded-full">
          <img src="" alt="" />
        </div>
      </div>
      <div className={"chat-bubble text-white bg-cyan-600"}>Hi there!</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        11:!1
      </div>
    </div>
  );
};

export default Message;
