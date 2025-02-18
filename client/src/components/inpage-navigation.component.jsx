import React, { useEffect, useRef, useState } from "react";

export default function InPageNavigation({
  routes,
  defaultActiveIdx = 0,
  defaultHidden = [],
  children
}) {
  const activeTabLineRef = useRef();
  const activeTabRef = useRef();
  const [inPageNavIdx, setInPageNavIdx] = useState(defaultActiveIdx);

  const changePageState = (btn, i) => {
    let { offsetWidth, offsetLeft } = btn;

    activeTabLineRef.current.style.width = offsetWidth + "px";
    activeTabLineRef.current.style.left = offsetLeft + "px";

    setInPageNavIdx(i);
  };

  useEffect(() => {
    changePageState(activeTabRef.current, defaultActiveIdx);
  }, [defaultActiveIdx]);
  return (
    <>
      <div className="border-grey relative mb-8 flex flex-nowrap overflow-x-auto border-b bg-white">
        {routes.map((route, i) => {
          return (
            <button
              ref={i == defaultActiveIdx ? activeTabRef : null}
              key={i}
              className={
                `p-4 px-5 capitalize ` +
                (inPageNavIdx == i ? "text-black" : "text-dark-grey ") +
                (defaultHidden.includes(route) ? "md:hidden" : "")
              }
              onClick={(e) => {
                changePageState(e.target, i);
              }}>
              {/* //* e.target gives html element so we are passing the btn html and index */}
              {route}
            </button>
          );
        })}

        <hr ref={activeTabLineRef} className="absolute bottom-0 duration-300" />
      </div>

      {Array.isArray(children) ? children[inPageNavIdx] : children}
      {/* //todo: childern prop is given to accept childern from homepage navigation */}
    </>
  );
}
