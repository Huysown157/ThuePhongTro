import React from "react";
import { CreatePost } from "../containers/System";

const UpdatePost = ({ handleCloseModel }) => {
  // console.log(dataEdit);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        handleCloseModel();
      }}
      className="absolute top-0 left-0 right-0 bottom-0 bg-overlay-30 "
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-white max-w-1100 w-full mx-auto max-h-screen overflow-y-auto"
      >
        <CreatePost isEdit handleCloseModel={handleCloseModel} />
      </div>
    </div>
  );
};

export default UpdatePost;
