import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function useOnClickOutside(ref, handler) {
  let mainPostModalVisible = useSelector(state => state.mainPostModalVisible);

  useEffect(() => {
    if (mainPostModalVisible) {
      return
    } else {
      const listener = (e) => {
        // 모달 안을 클릭했는지
        if (!ref.current || ref.current.contains(e.target)) return;
        // 모달 밖을 클릭했는지
        handler();
      };
      document.addEventListener("mousedown", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
      };
    }
  }, [ref, handler]);
}
