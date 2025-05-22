// import { useDispatch, useSelector } from "react-redux"
// import { useEffect } from "react"
// import { fetchProfile } from "../redux/action/authAction"
import Header from "../components/header";
import { FiMessageCircle, FiRepeat } from "react-icons/fi";
import { FaPaperPlane, FaRegHeart } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Card from "../components/Card"

const Home = () => {
  // const profile = useSelector(root => root?.auth)
  // const dispatch = useDispatch()

  // useEffect(() => dispatch(fetchProfile(profile?.token)) ,)

  return (
    <>
      <div className="absolute top-0 left-0 w-full z-50">
        <Header />
      </div>
      <div className="h-screen bg-black pt-14 flex justify-center ">
        <div className="bg-[#1A1A1A] w-[750px] h-full rounded-t-3xl border border-white border-opacity-10 ">
          <div className="rounded-t-3xl h-20 px-6 pt-2 flex justify-between border-b-2 border-opacity-10 border-white">
            <div className="flex justify-center items-center">
              <div className="bg-white w-10 h-10 rounded-full">
                <span></span>
                <img src="" alt="" />
              </div>
              <input
                className="pl-5 outline-none bg-[#1A1A1A] text-white"
                type="text"
                placeholder="What new?"
              />
            </div>
            <div className="flex items-center">
              <button className="px-5 py-2 bg-white rounded-xl">
                <span className="font-medium">Post</span>
              </button>
            </div>
          </div>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/> 
          <Card/> 
          
        </div>
      </div>
    </>
  );
};

export default Home;
