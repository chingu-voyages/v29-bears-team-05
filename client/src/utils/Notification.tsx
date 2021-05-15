import React, { useState, useEffect } from 'react';
import useBreakpoints from './useBreakpoints';

const DismissButton = ({ handleDismiss }) => (
  <button
    className="w-4 flex-none"
    type="button"
    data-dismiss="alert"
    aria-label="Close"
    onClick={handleDismiss}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
);

const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const SecurityIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
    />
  </svg>
);

const statusReference = {
  info: { color: 'purple', icon: <InfoIcon /> },
  warning: { color: 'red', icon: <SecurityIcon /> },
};

const Notification = ({ isOpen, ...props }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex justify-center items-center">
      <NotificationContent {...props} />
    </div>
  );
};

const NotificationContent = ({
  message,
  type = 'info',
  autoHideDuration = 5000,
}) => {
  const [show, setShow] = useState(true);
  const slideAnimation = show
    ? 'animate-slide-in-bottom'
    : 'animate-slide-out-bottom';
  const { isXs, isSm } = useBreakpoints();
  const mobileStyle = isXs || isSm ? 'right-12  w-3/4' : '';

  useEffect(() => {
    const interval = setInterval(() => {
      if (show) {
        setShow(false);
      }
    }, autoHideDuration);

    return () => {
      clearInterval(interval);
    };
  }, [autoHideDuration, show]);

  return (
    <div
      className={`${slideAnimation} fixed w-1/3 ${mobileStyle} bottom-0 right-5 py-3 px-5 mb-4 bg-${statusReference[type].color}-100 text-${statusReference[type].color}-900 text-sm rounded-md border border-${statusReference[type].color}-200 flex items-center z-50`}
      role="alert"
    >
      <div className="w-4 mr-2 flex-none">
        {React.cloneElement(statusReference[type].icon)}
      </div>
      <span className="flex-grow pr-2">{message}</span>
      <DismissButton handleDismiss={() => setShow(false)} />
    </div>
  );
};

export default Notification;
