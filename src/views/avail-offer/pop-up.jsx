"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { Button, BlocksRender } from "@/components";
import { postToken } from "@/utils/axios_instance";
import { clientAxios, createFormDataConfig } from "@/utils/axios_clients";

const ImageUploader = ({ index, handleImageUpload, handleImageRemove }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        handleImageUpload(index, file);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreviewUrl(null);
    handleImageRemove(index);
  };

  return (
    <div className="my-4">
      <label className="w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer flex flex-col items-center justify-center relative">
        {!previewUrl ? (
          <>
            <Image
              src="/assets/upload.svg"
              alt="upload"
              width={20}
              height={20}
            />
            <span className="mt-2 text-secondary font-semibold text-sm">
              Click to upload
            </span>
            <span className="mt-1 text-current text-xs">
              SVG, PNG, JPG or GIF
            </span>
          </>
        ) : (
          <>
            <Image
              src={previewUrl || "/assets/placeholder.png"}
              alt={`Preview ${index + 1}`}
              className="rounded-md"
              width={110}
              height={110}
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 w-fit h-fit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

const Offers = ({ open, handleOpen, data, offer, isContact }) => {
  const [images, setImages] = useState([]);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientWhatsapp, setClientWhatsapp] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setImages([]);
    setClientName("");
    setClientEmail("");
    setClientWhatsapp("");
  };

  useEffect(() => {
    resetForm();
  }, [open]);

  const handleImageUpload = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const handleImageRemove = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("files", image);

    try {
      const config = createFormDataConfig(postToken);
      const response = await clientAxios.post("/api/upload", formData, config);
      return response.data[0];
    } catch (error) {
      console.error("Image upload failed:", error);
      throw new Error("Image upload failed");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      let check = true;
      // Upload images first
      // eslint-disable-next-line no-undef
      const uploadedImages = await Promise.all(
        images.map(async (image) => {
          if (image) {
            check = false;
            return await uploadImage(image);
          }
          return null;
        })
      );

      if (check) {
        toast.success(<BlocksRender data={data?.error} />, {
          style: {
            border: "2px solid red",
            borderRadius: "10px",
            padding: "12px 40px",
            color: "black",
            backgroundColor: "#ff7f7f",
          },
          iconTheme: {
            primary: "red",
            secondary: "#ff7f7f",
          },
        });
        setLoading(false);
        return;
      }

      // Prepare the main data payload
      const payload = {
        data: {
          name: clientName,
          email: clientEmail,
          trustpilot: uploadedImages[0] ? uploadedImages[0] : null,
          chrome_store: uploadedImages[1] ? uploadedImages[1] : null,
          capterra: uploadedImages[2] ? uploadedImages[2] : null,
          g2: uploadedImages[3] ? uploadedImages[3] : null,
          whatsapp: uploadedImages[4] ? uploadedImages[4] : null,
          instagram: uploadedImages[5] ? uploadedImages[5] : null,
          youtube: uploadedImages[6] ? uploadedImages[6] : null,
          linkedin: uploadedImages[7] ? uploadedImages[7] : null,
          video_testimonial: uploadedImages[8] ? uploadedImages[8] : null,
        },
      };

      const contactSaverPayload = {
        data: {
          name: clientName,
          email: clientEmail,
          whatsapp: clientWhatsapp,
          contact_saver: uploadedImages[0] ? uploadedImages[0] : null,
        },
      };

      const url = isContact
        ? "/api/contact-saver-applications"
        : "/api/avail-offer-applications";

      // Create the main entry
      try {
        const response = await clientAxios.post(
          url,
          isContact ? contactSaverPayload : payload
        );

        if (!response.status === 200) {
          setLoading(false);
          throw new Error("Data submission failed");
        }

        handleOpen();
        toast.success(<BlocksRender data={data?.success} />, {
          style: {
            border: "2px solid #22c55d",
            borderRadius: "10px",
            padding: "12px 40px",
            color: "#17552f",
            backgroundColor: "#dcfce7",
          },
          iconTheme: {
            primary: "#44a047",
            secondary: "#dcfce7",
          },
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error submitting form:", error);
        throw new Error("Data submission failed");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error uploading files:", error);
    }
  };

  return (
    <Dialog size="md" open={open} handler={handleOpen}>
      <form onSubmit={handleSubmit}>
        <Toaster position="bottom-center" />
        <DialogHeader className="flex flex-col sm:flex-row items-start">
          <div className="w-full">
            <div className="text-black text-2xl text-center font-semibold font-poppins">
              {data?.pop_up_title}
            </div>
            <p className="text-[#6F6C90] text-base font-normal text-center px-3 mt-2">
              {data?.pop_up_description}
            </p>
          </div>
          <div className="order-first sm:order-last align-top w-full sm:w-fit flex justify-end sm:block">
            <IconButton
              color="blue-gray"
              size="sm"
              variant="text"
              onClick={handleOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
                strokeWidth={2}
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
        </DialogHeader>
        <div className="overflow-y-scroll custom-scrollbar max-h-[75vh]">
          <DialogBody className="!px-5">
            <p className="text-[#6F6C90] text-[12px] font-poppins font-medium mb-1">
              {data?.name_title}
              <span className="text-red-500">*</span>
            </p>
            <input
              required
              type="text"
              id="client_name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#EFF0F6] focus:outline-none rounded-md placeholder-[#6F6C90]"
              placeholder={data?.name_placeholder}
            />
            <p className="text-[#6F6C90] text-[12px] font-poppins font-medium mt-4 mb-1">
              {data?.email_title}
              <span className="text-red-500">*</span>
            </p>
            <input
              required
              type="email"
              id="client_email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#EFF0F6] focus:outline-none rounded-md placeholder-[#6F6C90]"
              placeholder={data?.email_placeholder}
            />
            {isContact && (
              <p className="text-[#6F6C90] text-[12px] font-poppins font-medium mt-4 mb-1">
                {data?.whatsapp_title}
                <span className="text-red-500">*</span>
              </p>
            )}
            {isContact && (
              <input
                required
                type="text"
                id="client_whatsapp"
                value={clientWhatsapp}
                onChange={(e) => setClientWhatsapp(e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#EFF0F6] focus:outline-none rounded-md placeholder-[#6F6C90]"
                placeholder={data?.whatsapp_placeholder}
              />
            )}
            {offer.map((item, index) => (
              <div key={index}>
                <div className="w-full flex flex-col sm:flex-row gap-2 justify-between mt-5">
                  <p>
                    {item?.title}{" "}
                    {item?.discount && (
                      <span>{item?.discount}% off</span>
                    )}
                  </p>
                  <a
                    className="text-black underline"
                    target="_blank"
                    href={item?.link?.link}
                  >
                    {item?.link?.title}
                  </a>
                </div>
                <ImageUploader
                  key={index}
                  index={index}
                  handleImageUpload={handleImageUpload}
                  handleImageRemove={handleImageRemove}
                />
              </div>
            ))}
          </DialogBody>
          <DialogFooter className="justify-center">
            <div className="w-fit">
              <Button
                text={data?.btn_text}
                background={true}
                isDisable={loading}
              />
            </div>
          </DialogFooter>
        </div>
      </form>
    </Dialog>
  );
};

export default Offers;
