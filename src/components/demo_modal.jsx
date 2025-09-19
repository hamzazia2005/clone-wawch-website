"use client";
import React from "react";
import {
  Dialog,
  DialogBody,
} from "@material-tailwind/react";

const DemoModal = ({ open, handleOpen, videoId }) => {
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
