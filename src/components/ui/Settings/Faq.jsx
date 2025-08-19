import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { GoQuestion } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import FaqModal from "../../ui/FAQ/FaqModal";

const Faq = () => {
  const [openAddModel, setOpenAddModel] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleDelete = async (id) => {
    // Handle delete logic here
  };

  const faqInfo = [
    {
      _id: "1",
      question: "What is your return policy?",
      answer:
        "Our return policy allows returns within 30 days of purchase with a valid receipt. Items must be in their original condition.",
    },
    {
      _id: "2",
      question: "How can I track my order?",
      answer:
        "You can track your order by using the tracking link sent to your email upon shipment. Alternatively, log in to your account to view the order status.",
    },
    {
      _id: "3",
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping to selected countries. Please check our shipping information page for more details.",
    },
    {
      _id: "4",
      question: "How do I reset my password?",
      answer:
        "To reset your password, click on 'Forgot Password' on the login page. A password reset link will be sent to your registered email address.",
    },
    {
      _id: "5",
      question: "How do I reset my password?",
      answer:
        "To reset your password, click on 'Forgot Password' on the login page. A password reset link will be sent to your registered email address.",
    },
  ];

  return (
    <div className="">
      <div className=" mb-4 flex justify-between items-center w-full">
        <button
          onClick={() => setOpenAddModel(true)}
          className="flex items-center gap-1 px-4 py-2 text-white bg-primary rounded hover:bg-secondary hover:text-black transition-colors"
        >
          <FaPlus />
          Add FAQ
        </button>
      </div>

      <div className=" pb-6 px-4 rounded-md">
        {faqInfo?.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-start gap-4 py-4 px-4 rounded-lg bg-white mb-3"
          >
            <GoQuestion color="#8b0000" size={25} className="mt-3" />
            <div className="flex-1">
              <p className="text-base font-medium rounded-xl py-2 px-4 flex items-center gap-8">
                <span className="flex-1">{item?.question}</span>
              </p>
              <div className=" rounded-xl py-2 px-4 mt-4">
                <p className="text-[#919191] leading-6">{item?.answer}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-4">
              <CiEdit
                onClick={() => {
                  setOpenAddModel(true);
                  setModalData(item);
                }}
                className="text-2xl cursor-pointer text-[#00809E]"
              />
              <RxCross2
                onClick={() => handleDelete(item?._id)}
                className="text-2xl cursor-pointer text-red-600"
              />
            </div>
          </div>
        ))}
      </div>

      <FaqModal
        setOpenAddModel={setOpenAddModel}
        openAddModel={openAddModel}
        modalData={modalData}
        setModalData={setModalData}
      />
    </div>
  );
};

export default Faq;
