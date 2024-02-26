import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { addCourseLectures } from "../../Redux/Slices/LectureSlice";

function AddLecture() {
  const courseDetails = useLocation().state;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userInput, setUserInput] = useState({
    id: courseDetails._id,
    lecture: undefined,
    title: "",
    description: "",
    videoSrc: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  function handleVideo(e) {
    const video = e.target.files[0];
    const source = window.URL.createObjectURL(video);
    setUserInput({
      ...userInput,
      lecture: video,
      videoSrc: source,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!userInput.lecture || !userInput.title || !userInput.description) {
      toast.error("All field are manadatory");
      return;
    }

    const response = await dispatch(addCourseLectures(userInput));
    if (response?.payload?.success) {
      navigate(-1);
      setUserInput({
        id: courseDetails._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: "",
      });
    }
  }

  useEffect(() => {
    if (!courseDetails) navigate("/course");
  });
  return (
    <HomeLayout>
      <div className="flex min-h-[90vh] text-white flex-col items-center justify-center gap-10 mx-16">
        <div className="flex flex-col gap-5 p-2  w-96 shadow-[0_0_10px_black] rounded-lg">
          <header className="flex items-center justify-center relative">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-2 text-xl text-green-500"
            >
              <AiOutlineArrowLeft></AiOutlineArrowLeft>
            </button>
            <h1 className="text-xl text-yellow-500 font-semibold">
              Add new lecture
            </h1>
          </header>
          <form onSubmit={onFormSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              name="title"
              placeholder="Enter title of the lecture"
              onChange={handleInputChange}
              value={userInput.title}
              className="bg-transparent px-3 py-1 border"
            />
            <textarea
              type="text"
              name="description"
              placeholder="Enter description of the lecture"
              onChange={handleInputChange}
              value={userInput.description}
              className="bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-24"
            />

            {userInput?.videoSrc ? (
              <video
                src={userInput.videoSrc}
                muted
                controls
                disablePictureInPicture
                controlsList="nodownload nofullscreen"
                className="object-fill rounded-tr-lg rounded-tl-lg w-full"
              ></video>
            ) : (
              <div className="h-44 border flex items-center justify-center">
                <label
                  className="font-semibold text-xl cursor-pointer"
                  htmlFor="lecture"
                >
                  Choose your video
                </label>
                <input
                  type="file"
                  name="lecture"
                  id="lecture"
                  onChange={handleVideo}
                  className="hidden"
                  accept="video/mp4 video/x-mp4 video/*"
                />
              </div>
            )}

            <button
              type="submit"
              className="btn-primary text-xl font-bold py-3 px-1"
            >
              Add Lecture
            </button>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AddLecture;
