import React from "react";

import "./growl.css";

export const Growl = ({ active, message, onDismissed }) => (
  <div className={`growl${active ? " active" : ""}`}>
    {message}
    <div onClick={onDismissed} className="growl-close" />
  </div>
);

export function useGrowl(timeout = 3000) {
  // state of the growl
  const [growlActive, setGrowlActive] = React.useState(false);

  React.useEffect(() => {
    if (growlActive && timeout) {
      let hideGrowl = setTimeout(() => setGrowlActive(false), timeout);

      return () => {
        clearTimeout(hideGrowl);
      };
    } else return;
  }, [growlActive]);

  return [
    // the first arg is the state
    growlActive,

    // the second arg is a fn that allows you to safely set its state
    (active) => {
      setGrowlActive(active);
    },
  ];
}
