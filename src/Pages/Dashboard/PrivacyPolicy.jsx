import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import Title from "../../components/common/Title";
import rentMeLogo from "../../assets/navLogo.png";
import toast from "react-hot-toast";
import {
  usePrivacyPolicyQuery,
  useUpdatePricyPolicyMutation,
} from "../../redux/apiSlices/privacyPolicySlice";

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const isLoading = false;

  // const {
  //   data: privacyPolicy,
  //   isLoading,
  //   refetch,
  // } = usePrivacyPolicyQuery(selectedTab);

  // const [updatePricyPolicy] = useUpdatePricyPolicyMutation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={rentMeLogo} alt="" />
      </div>
    );
  }

  const privacyPolicy = [];

  const privacyPolicyData = privacyPolicy?.content;

  const termsDataSave = async () => {
    const data = {
      content: content,
      userType: selectedTab,
    };

    try {
      const res = await updatePricyPolicy(data).unwrap();
      if (res.success) {
        toast.success("Privacy Policy updated successfully");
        setContent(res.data.content);
        refetch();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white">
      <Title className="mb-4">Privacy Policy</Title>

      <JoditEditor
        ref={editor}
        value={privacyPolicyData}
        onChange={(newContent) => {
          setContent(newContent);
        }}
      />

      <div className="flex items-center justify-center mt-5">
        <button
          onClick={termsDataSave}
          type="submit"
          className="bg-[#3b3e3f] text-white w-[160px] h-[42px] rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
