import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Item } from "../../components";
import { getFavoriteByUserId } from "../../store/actions";

const FavoritePost = () => {
  const dispatch = useDispatch();

  const { favorites } = useSelector((state) => state.post);
  const { currentUser } = useSelector((state) => state.user);

  // console.log(favorites);

  useEffect(() => {
    if (Object.keys(currentUser).length === 0) return;

    dispatch(getFavoriteByUserId({ userId: currentUser.id }));
  }, [dispatch, currentUser]);

  return (
    <div className="px-8">
      <h1 className="text-3xl py-4 ">Danh sách tin yêu thích</h1>
      {favorites?.map((item) => (
        <Item
          isFavorite={true}
          key={item?.post?.id}
          address={item?.post?.address}
          price={item?.post?.price}
          area={item?.post?.area}
          description={item?.post?.description}
          images={item?.post?.images}
          star={5}
          title={item?.post?.title}
          user={item?.post?.user}
          id={item?.post?.id}
          filters={{ status: "SHOW" }}
        />
      ))}
    </div>
  );
};

export default FavoritePost;
