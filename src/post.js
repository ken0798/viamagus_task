import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "./services";
import { MainContainer } from "./components/styles";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [load, setLoad] = useState(false);
  const navTo = useNavigate();
  const getUserPost = useCallback(async () => {
    setLoad(true);
    try {
      const res = await getPostById(id);
      setLoad(false);
      setPost(res);
    } catch (e) {
      console.error(e);
      setLoad(false);
      toast.error(`Oops Something went wrong! ${e.message}`, { id: "post" });
      navTo("/*");
    }
  }, [navTo, id]);
  useEffect(() => {
    getUserPost();
  }, [getUserPost]);
  console.log(post);
  return (
    <MainContainer>
      <div>
        {!load ? (
          <>
            <h1>{post?.title}</h1>
            <p>{post?.body}</p>
            <p>user@{post?.userId}</p>
          </>
        ) : (
          <CircularProgress sx={{ marginInline: "45%" }} />
        )}
      </div>
    </MainContainer>
  );
}
