import { useState, useEffect } from "react";
function useScroll() {
  const [scrollY, setScrollY] = useState(0);
  const [appBarFixed, setAppBarFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const upperContainerHeight = 60;
    const appBar = document.getElementById("appBar");
    const appBarHeight = appBar ? appBar.offsetHeight : 0;

    if (scrollY >= upperContainerHeight) {
      setAppBarFixed(true);
      document.body.style.paddingTop = `${appBarHeight}px`;
    } else {
      setAppBarFixed(false);
      document.body.style.paddingTop = "0";
    }
  }, [scrollY]);
  return appBarFixed;
}

export default useScroll;
