import React from "react";
import { useSelector } from "react-redux";
import SubItem from "./SubItem";

const RelatedPost = () => {
  //Lay data tu redux
  const { newPosts } = useSelector((state) => state.post);
  // console.log(newPosts);

  return (
    <div className="border bg-white rounded-md p-4">
      <h3 className="font-semibold text-lg mb-4">Tin mới đăng</h3>

      <div className="">
        {newPosts?.map((item) => {
          // console.log(JSON.parse(item.images.image)[0]);
          return (
            <SubItem
              key={item.id}
              title={item.title}
              image={item?.images[0]}
              price={item?.price}
              createdAt={item.createdAt}
              id={item?.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedPost;
