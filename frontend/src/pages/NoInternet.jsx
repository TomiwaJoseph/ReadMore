import { useEffect } from "react";

const NoInternet = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <h1>No Internet</h1>
    </div>
  );
};

export default NoInternet;
