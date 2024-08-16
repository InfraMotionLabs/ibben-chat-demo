import React from 'react';

const CloseIcon = ({
  handleChatbotClick,
}: {
  handleChatbotClick: () => void;
}) => {
  return (
    <div
      onClick={handleChatbotClick}
      className="bg-neutral-100 hover:bg-neutral-200 absolute cursor-pointer z-10 transition-transform duration-100 right-0 w-6 h-6 justify-center flex rounded-full m-2  border border-neutral-300 "
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 256 256"
        xmlns="http://www.w3.org/2000/svg"
        className="self-center fill-neutral-500"
      >
        <path d="M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128L47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z" />
      </svg>
    </div>
  );
};

export default CloseIcon;
