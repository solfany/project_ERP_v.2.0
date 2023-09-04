// UpdatePostCount.js
import axios from "axios";
import { useEffect, useState } from "react";

const UpdatePostCount = ({ postNum, postCountNum }) => {
  const [updatedPostCount, setUpdatedPostCount] = useState(postCountNum);

  useEffect(() => {
    const updatePostCount = async () => {
      try {
        const response = await axios.put(
          `/api/bulletinboard/update/${postNum}`,
          {
            postCountNum: postCountNum + 1,
          }
        );
        if (response.status === 200) {
          console.log("조회수 업데이트 성공");
          setUpdatedPostCount(postCountNum + 1);
        }
      } catch (error) {
        console.error("조회수 업데이트 실패", error);
      }
    };

    updatePostCount();
  }, [postNum, postCountNum]);

  return updatedPostCount;
};

export default UpdatePostCount;
