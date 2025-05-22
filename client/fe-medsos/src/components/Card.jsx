import React from "react";
import { FiMessageCircle, FiRepeat } from "react-icons/fi";
import { FaPaperPlane, FaRegHeart } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const Card = () => {
  return (
    <div className="w-auto h-[120px] border-b-2 border-opacity-10 border-white">
      <div className="py-4 px-6 w-full h-full">
        <div className="flex">
          <div className="bg-white w-10 h-10 rounded-full">
            <span></span>
            <img src="" alt="" />
          </div>
          <div className="flex w-full justify-between">
            <div>
              <p className="pl-5">
                <span className="text-white font-medium">Genise</span>
              </p>
              <p className="pl-5">
                <span className="text-white ">"Bingung..."</span>
              </p>
              <div className="flex gap-5 text-xl pl-5 pt-5 text-white">
                <FaRegHeart />
                <FiMessageCircle />
                <FiRepeat />
                <FaPaperPlane />
              </div>
            </div>
            <div className="text-white">
              <HiOutlineDotsHorizontal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
