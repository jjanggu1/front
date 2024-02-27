import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function useOnClickOutside(ref, handler, isVisible) {
  let mainPostMoreVisible = useSelector(state => state.mainPostMoreVisible);
  let mainCommentMoreVisible = useSelector(state => state.mainCommentMoreVisible);

  useEffect(() => {
    if (!isVisible || mainPostMoreVisible || mainCommentMoreVisible) {
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
  }, [ref, handler, isVisible, mainPostMoreVisible, mainCommentMoreVisible]);
}
