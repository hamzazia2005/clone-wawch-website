"use client";
import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
} from "@material-tailwind/react";

const DemoModal = ({ open, handleOpen, videoId, title }) => {
  return (
    <Dialog 
      size="lg" 
      open={open} 
      handler={handleOpen}
      className="bg-transparent shadow-none"
      style={{
        margin: '1rem',
        maxWidth: '90vw',
        maxHeight: '90vh'
      }}
    >
      <div className="bg-white rounded-lg overflow-hidden">
        <DialogHeader className="flex justify-between items-center p-3 sm:p-4 border-b">
          <h3 className="text-lg sm:text-xl font-semibold text-primary-400 font-poppins pr-2">
            {title}
          </h3>
          <IconButton
            color="text-primary-400"
            size="sm"
            variant="text"
            onClick={handleOpen}
            className="hover:bg-gray-100 flex-shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody className="p-0">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </DialogBody>
      </div>
    </Dialog>
  );
};

export default DemoModal;
