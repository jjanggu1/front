import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function useOnClickOutside(ref: any, handler: any, isVisible: any) {
  let mainPostMoreVisible = useSelector((state: RootState) => state.mainPostMoreVisible);
  let mainCommentMoreVisible = useSelector((state: RootState) => state.mainCommentMoreVisible);

  useEffect(() => {
    if (!isVisible || mainPostMoreVisible || mainCommentMoreVisible) {
      return
    } else {
      const listener = (e: any) => {
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
