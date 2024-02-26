import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourseLectures, getCourseLectures } from "../../Redux/Slices/LectureSlice";

function DisplayLecture() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);
  const [currentVideo, setCurrentVideo] = useState(0);

  async function onLectureDelete(courseId,lectureId){
    console.log(courseId,lectureId);
    await dispatch(deleteCourseLectures({courseId: courseId, lectureId: lectureId}))
    await dispatch(getCourseLectures(courseId))
  }
  useEffect(() => {
    if (!state) navigate("/course");
    const id = state._id;
    dispatch(getCourseLectures(id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HomeLayout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] text-white py-10 px-5%">
        <div className="text-center text-2xl font-semibold text-yellow-500">
          Course Name: {state?.title}
        </div>
        {(lectures && lectures.length > 0) ?  (<div className="flex justify-center gap-10 w-full">
          {/* {left section for playing videos and displaying course details to admin} */}
          <div className="space-y-5 w-[25rem] P-2 rounded-lg shadow-[0_0_10px_black]">
            <video
              src={lectures && lectures[currentVideo]?.lecture?.secure_url}
              className="object-fill rounded-tl-lg rounded-tr-lg w-full"
              controls
              disablePictureInPicture
              muted
              controlsList="nodownload"
            ></video>
            <div>
                <h1>
                <span className="text-yellow-500"> Title : { " "}
                </span>
                {lectures && lectures[currentVideo]?.title}
                </h1>
                <p>
                    <span>Description: {" "}</span>
                    {lectures && lectures[currentVideo]?.description}
                </p>
            </div>
          
          </div>

          {/* {right section for displaying list of lectures} */}
          <ul className="w-[28rem] rounded-lg shadow-[0_0_10px_black] p-2 space-y-4">
            <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
            <p>Lecture list</p>
            {role === 'ADMIN' && (<button onClick={()=> navigate('/course/addlecture', {state: {...state}})} className="btn-primary rounded-md px-2 py-1 text-sm">Add new lecture</button>)}
           </li>
            {lectures && lectures.map((lecture,idx)=>{
                return(
                    <li className="space-y-2" key={lecture._id}>
                        <p className="cursor-pointer" onClick={()=> setCurrentVideo(idx)}>
                            <span>
                                {' '} Lecture {idx + 1} : {' '}
                            </span>
                            {lecture?.title}
                        </p>
                        {role === 'ADMIN' && (<button onClick={()=> onLectureDelete(state?._id, lecture?._id)}   className="btn-accent rounded-md px-2 py-1 text-sm">Delete lecture</button>)}
                    </li>
                )
            })}
          </ul>
        </div>):( role === 'ADMIN' && (<button onClick={()=> navigate('/course/addlecture', {state: {...state}})} className="btn-primary rounded-md px-2 py-1 text-sm">Add new lecture</button>))}
      </div>
    </HomeLayout>
  );
}

export default DisplayLecture;
