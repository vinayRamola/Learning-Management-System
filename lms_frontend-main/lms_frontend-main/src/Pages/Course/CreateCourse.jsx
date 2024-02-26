import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";

function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: null,
    previewImage: "",
  });

  function handelImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setUserInput({
          previewImage: this.result,
          thumbnail: uploadedImage,
        });
      });
    }
  }

  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }
  
  async function onFormSubmit(e) {
    e.preventDefault();
    if (
      !userInput.title ||
      !userInput.description ||
      !userInput.createdBy ||
      !userInput.thumbnail ||
      !userInput.category
    ) {
      toast.error("All field are manadatory");
      return;
    }
        const formData = new FormData()
        formData.append("title", userInput.title)
        formData.append("description", userInput.description)
        formData.append("category", userInput.category)
        formData.append("createdBy", userInput.createdBy)
        formData.append("thumbnail", userInput.thumbnail)
    const response = await dispatch(createNewCourse(formData));
    if (response?.payload?.success) {
      setUserInput({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: "",
      });
      navigate("/courses");
    }
  }
  return (
    <HomeLayout>
      <div className="flex flex-col justify-center items-center h-[100vh]">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center text-white rounded-lg gap-5 p-4 w-[700px] my-10 shadow-[0_0_10px_black] relative"
        >
          <Link className="absolute top-8 text-2xl link text-accent cursor-pointer">
            <AiOutlineArrowLeft></AiOutlineArrowLeft>
          </Link>

          <h1 className="text-center text-2xl font-bold">Create New Course</h1>

          <main className="grid grid-cols-2 gap-x-10">
            <div className="gap-y-6">
              <label htmlFor="image_upload" className="cursor-pointer">
                {userInput.previewImage ? (
                  <img
                    src={userInput.previewImage}
                    alt="preview image"
                    className="w-full h-44 m-auto border"
                  />
                ) : (
                  <div>
                    <h1 className="font-bold text-lg w-full h-44 border flex justify-center items-center m-auto">
                      Upload your Course thumbnail
                    </h1>
                  </div>
                )}
              </label>
              <input
                type="file"
                name="image_upload"
                id="image_upload"
                className="hidden"
                accept=".jpg,.jpeg,.png"
                onChange={handelImageUpload}
              />

              <div className="flex flex-col gap-1">
                <label htmlFor="title" className="text-lg font-semibold">
                  Course title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  placeholder="Enter your course title"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.title}
                  onChange={handleUserInput}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <label htmlFor="createdBy" className="text-lg font-semibold">
                  Course instructor
                </label>
                <input
                  type="text"
                  name="createdBy"
                  id="createdBy"
                  required
                  placeholder="Enter your course instructor"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.createdBy}
                  onChange={handleUserInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="category" className="text-lg font-semibold">
                  Course category
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  required
                  placeholder="Enter your course category"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.category}
                  onChange={handleUserInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="description" className="text-lg font-semibold">
                  Course description
                </label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  required
                  placeholder="Enter your course description"
                  className="bg-transparent px-2 py-1 border h-24 resize-none"
                  value={userInput.description}
                  onChange={handleUserInput}
                />
              </div>
            </div>
          </main>

          <button type="submit" className="w-full rounded-sm py-2 font-semibold px-1 text-lg bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300">
            Create Course
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default CreateCourse;
