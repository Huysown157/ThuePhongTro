import React from "react";
import { textContact } from "../utils/dataContact";
import { Button } from "../components";
const Contact = () => {
  return (
    <div className="border bg-white rounded-md shadow-md p-4 gap-6 flex flex-col justify-center items-center">
      <div className="h-48 object-contain ">
        <img className="h-full" src={textContact.imageUrl} alt="thumbnail" />
      </div>
      <p className="text-center">{textContact.content}</p>

      <div className="flex justify-around w-full ">
        {textContact.contact.map((item, index) => {
          return (
            <div className="text-center font-semibold" key={index}>
              <p className="text-orange-600">{item.text}</p>
              <p className="text-blue-900 text-[24px] ">{item.phone}</p>
              <p className="text-blue-900 text-[24px] ">{item.zalo}</p>
            </div>
          );
        })}
      </div>
      <div className="">
        <Button
          text="Gửi liên hệ"
          bgColor="bg-secondary1"
          textColor="text-white"
          px="px-6"
        />
      </div>
    </div>
  );
};

export default Contact;
