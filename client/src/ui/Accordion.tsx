import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';

interface AccordionProps {
  children: any;
  isOpen: boolean;
}

interface AccordionHeaderProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  variant: 'gray' | 'indigo';
  isOpen: boolean;
}

const style = {
  accordion: `overflow-hidden md:overflow-x-hidden transition-height ease duration-300 text-gray-600`,
  accordionHeader: {
    // gray: `block focus:outline-none bg-gray-800 text-white border-b my-2 p-3`,
    indigo: `block focus:outline-none bg-gray-700 text-white font-bold border-b my-2 p-3 rounded`,
  },
};

export const AngleUpIcon = (props) => (
  <svg
    fill="white"
    strokeWidth="0"
    viewBox="0 0 320 512"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z" />
  </svg>
);
export const AngleDownIcon = (props) => (
  <svg
    stroke="currentColor"
    fill="white"
    strokeWidth="0"
    viewBox="0 0 320 512"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
  </svg>
);

export const Accordion = ({ children, isOpen }: AccordionProps) => {
  const childRef = useRef<HTMLDivElement>(null);
  const initHeight = childRef?.current?.children[0].clientHeight;
  const [height, setHeight] = useState(initHeight);

  const RowLength = children?.props.children[2].props.data.length;

  useEffect(() => {
    setHeight(childRef?.current?.children[0].clientHeight);
  }, [RowLength]);

  const inlineStyle = isOpen ? { height } : { height: 0 };

  return (
    <div className={style.accordion} ref={childRef} style={inlineStyle}>
      {children}
    </div>
  );
};

export const AccordionHeader = ({
  children,
  variant,
  onClick,
  isOpen = false,
}: AccordionHeaderProps) => (
  <div
    role="button"
    onClick={onClick}
    className={style.accordionHeader[variant]}
  >
    {children}
    <span className="float-right">
      {isOpen ? (
        <AngleUpIcon className="h-4 mt-1" />
      ) : (
        <AngleDownIcon className="h-4 mt-1" />
      )}
    </span>
  </div>
);
