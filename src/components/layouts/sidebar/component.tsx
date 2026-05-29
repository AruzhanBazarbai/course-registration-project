// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import classNames from "classnames";

import { useDispatch, useSelector } from "react-redux";
import { Chats } from "../../../assets/mock/chats";
import { AppDispatch, RootState } from "../../../store";
import classNames from "classnames";
import { setSelectedChatState } from "../../../store/slices/sidebar";

export const SideBar: React.FC = () => {
  const selectedChatId = useSelector((state: RootState) => state.selectedChat.id)
  const dispatch = useDispatch<AppDispatch>();
    
  return (
    <nav className="sidebar-container">
      {Chats.map((el) => (
        <button  onClick={() => dispatch(setSelectedChatState(el.id))} className="bg-transparent">
          <div className={classNames(["flex items-center px-[25px] py-[10px] gap-x-5 cursor-pointer", selectedChatId === el.id  ? "active" : ""])}>
            <img src={el.profileUrl} alt="profile" width={40} height={40} className="rounded-full" />
            <p className="text-[15px] leading-[25px] font-medium">{ el.title }</p>
          </div>
        </button>
      ))}
    </nav>
  );
};