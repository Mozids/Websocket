import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { fetchProfile } from "../redux/action/authAction";
import Header from "../components/header";
import Card from "../components/Card";
import { fetchPosting, storePosting } from "../redux/action/postAction";

const WEBSOCKET_URL = "ws://127.0.0.11:3001";

const Home = () => {
  const profile = useSelector((root) => root?.auth);
  const posting = useSelector((root) => root?.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile(profile?.token));
    dispatch(fetchPosting(profile?.token));
    const socket = new WebSocket(WEBSOCKET_URL);

    socket.onopen = () => console.log(`CONNECT TO SERVER`);
    socket.onmessage = (event) => {
      console.log(`ON MESSAGE: ${JSON.stringify(event)}`);
    };
    socket.onerror = (event) => console.log(`ON ERR: ${JSON.stringify(event)}`);
    socket.onclose = (event) =>
      console.log(`ON CLOSE: ${JSON.stringify(event)}`);
  }, [dispatch, profile?.token]);

  const [content, setContent] = useState("");

  const handleAdd = () => {
    if (content.trim() === "") return;
    dispatch(
      storePosting(profile?.token, {
        content_text: content,
      })
    );
    setContent("");
    // Optionally fetch posts again after posting
    setTimeout(() => {
      dispatch(fetchPosting(profile?.token));
    }, 300);
  };

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
                className="pl-5 outline-none bg-[#1A1A1A] text-white w-[550px]"
                type="text"
                placeholder="What new?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <button
                className="px-5 py-2 bg-white rounded-xl"
                onClick={handleAdd}
              >
                <span className="font-medium">Post</span>
              </button>
            </div>
          </div>
          <div className="overflow-hidden overflow-y-auto max-h-[800px] w-full">
            {Array.isArray(posting?.data) &&
              posting.data.map((item) => (
                <Card
                  key={item.id}
                  username={item.user?.username}
                  content={item.content_text}
                />
              ))}
          </div>
        </div>
        <div></div>
        {/* <div className="absolute bottom-4 right-4 w-[540px] h-[400px] bg-[#1a1a1a] text-white flex items-center shadow-lg rounded-3xl justify-center border border-white border-opacity-10">
          Chat
        </div> */}
      </div>
    </>
  );
};

export default Home;
