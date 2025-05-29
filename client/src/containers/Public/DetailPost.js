import moment from "moment";
import "moment/locale/vi"; //Chuyển ngôn ngữ thời gian: 2 day ago -> 2 ngày trước
import React, { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { GrStar } from "react-icons/gr";
import { MdOutlineLocationOn } from "react-icons/md";
import { RiCrop2Line } from "react-icons/ri";
import { TbReportMoney } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import Map from "../../components/Map";
import Slider from "../../components/Slider";
import { apiGetPostById } from "../../services/post";
import convertToMillion from "../../utils/Common/convertToMillion";
import { convertToSlug } from "../../utils/Common/convertToSlug";
import { getDistrictProvince } from "../../utils/Common/getDistrictProvince";
import anonAvatar from "../../assets/anon-avatar.png";
import { BsFillTelephoneFill } from "react-icons/bs";
import RelatedPost from "../../components/RelatedPost";
const DetailPost = () => {
  const params = useParams();
  const postId = params?.postId;
  // console.log(postId);

  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await apiGetPostById(postId);
      setPost(response?.data?.post); // Lưu trữ thông tin bài viết vào state
      // console.log(response);
    };
    fetchPost();
  }, [postId]);
  // console.log(post);
  const [star, setStar] = useState(5);
  const handleStar = (star) => {
    let stars = [];
    for (let i = 1; i <= +star; i++) {
      stars.push(<GrStar className="inline-block" size={25} color="orange" />);
    }
    return stars;
  };

  const [toaDo, setToaDo] = useState({
    kinhDo: "",
    viDo: "",
  });

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-8 w-full bg-white rounded-md shadow-md overflow-hidden">
        <div className="h-96">
          <Slider images={post?.images} />
        </div>
        <div className="p-5 space-y-5">
          <div className="flex items-center gap-1">
            {/* <span>
              {handleStar(+star).length > 0 &&
                handleStar(+star).map((star, number) => {
                  return <span key={number}>{star}</span>;
                })}
            </span> */}
            <h2 className="text-2xl text-red-600 font-bold">{post?.title}</h2>
          </div>
          <div className="space-y-1">
            <div className="flex gap-1">
              <span>Chuyên mục:</span>
              <Link
                className="text-blue-600 underline font-medium hover:text-orange-600"
                to={`/${convertToSlug(post?.category?.title)}`}
              >
                {post?.category?.title}
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <MdOutlineLocationOn />
              <span>Địa chỉ:</span>
              <span>{post?.address}</span>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center justify-center gap-1">
                <TbReportMoney />
                <span className="font-bold text-xl text-green-500">
                  {convertToMillion(post?.price)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <RiCrop2Line />
                <span>{post?.area}m2</span>
              </div>
              <div className="flex items-center gap-1">
                <AiOutlineClockCircle />
                <span>{moment(post?.createdAt).fromNow()}</span>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-medium">Thông tin mô tả</h1>
            <p className="whitespace-pre-wrap">{post?.description}</p>
          </div>
          <div className="space-y-4">
            <h1 className="text-2xl font-medium">Đặc điểm tin đăng</h1>
            <table className="w-full">
              <tbody className=" [&>*:nth-child(odd)]:bg-gray-200">
                <tr>
                  <td className="p-2 w-1/4">Mã tin</td>
                  <td className="p-2">{post?.id}</td>
                </tr>
                <tr>
                  <td className="p-2 w-1/4">Khu vực</td>
                  <td className="p-2">{getDistrictProvince(post?.address)}</td>
                </tr>
                <tr>
                  <td className="p-2 w-1/4">Đối tượng</td>
                  <td className="p-2">
                    {post?.target === "FEMALE"
                      ? "Nữ"
                      : post?.target === "MALE"
                      ? "Nam"
                      : "Tất cả"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="space-y-4">
            <h1 className="text-2xl font-medium">Thông tin liên hệ</h1>
            <table className="w-full">
              <tbody className=" [&>*:nth-child(odd)]:bg-gray-200">
                <tr>
                  <td className="p-2 text-left w-1/4">Liên hệ</td>
                  <td className="p-2 text-left">{post?.user?.fullName}</td>
                </tr>
                <tr>
                  <td className="p-2 text-left w-1/4">Điện thoại</td>
                  <td className="p-2 text-left">{post?.user?.phone}</td>
                </tr>
                <tr>
                  <td className="p-2 text-left w-1/4">Zalo</td>
                  <td className="p-2 text-left">{post?.user?.phone}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="space-y-4">
            <h1 className="text-2xl font-medium">Bản đồ</h1>
            <Map address={post?.address} />
          </div>
        </div>
      </div>
      <div className="col-span-4 w-full space-y-4">
        <div className="w-full p-3 bg-[#febb02] rounded-md flex flex-col gap-4 items-center justify-center">
          <div className="w-full flex flex-col justify-center items-center">
            <img
              src={anonAvatar}
              alt="avatar"
              className="w-20 h-20 rounded-full object-cover"
            />
            <h3>{post?.user?.fullName}</h3>
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-3">
            <Link
              className="flex items-center justify-center gap-1 w-full rounded-md py-2 bg-[#16c784] text-white font-bold text-lg transition-all hover:bg-[#13bb7b]"
              to={`tel:${post?.user?.phone}`}
            >
              <span>
                <BsFillTelephoneFill />
              </span>
              <span>{post?.user?.phone}</span>
            </Link>
            <Link
              className="flex items-center gap-1 bg-white w-full justify-center rounded-md py-2 "
              to={`https://zalo.me/${post?.user?.phone}`}
            >
              <img
                className="w-6 h-6 rounded-full object-cover"
                src="https://phongtro123.com/images/icon-zalo.png"
                alt="zalo"
              />
              <span>Nhắn Zalo</span>
            </Link>
            <Link
              className="flex items-center gap-1 bg-white w-full justify-center rounded-md py-2"
              to="/"
            >
              <img
                className="w-6 h-6 rounded-full object-cover"
                src="https://phongtro123.com/images/love.svg"
                alt="tym"
              />
              <span>Yêu thích</span>
            </Link>
          </div>
        </div>

        <RelatedPost></RelatedPost>
      </div>
    </div>
  );
};

export default DetailPost;
