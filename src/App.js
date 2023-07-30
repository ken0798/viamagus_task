import { styled } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { getPosts } from "./services";
import { MainContainer } from "./components/styles";
import {
  Button,
  IconButton,
  ButtonGroup,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import AddPostModal from "./components/addPost";
import toast from "react-hot-toast";

const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  "& h1": {
    fontSize: "20px",
    color: "#0D062D",
  },
});

const Container = styled("section")({
  marginBlock: "16px",
  "& .author": {
    color: "#7B61FF",
  },
  "& .link": {
    textDecoration: "none",
    color: "#081753",
  },
});

const PostItem = styled("div")((props) => ({
  padding: "8px",
  backgroundColor: `${props.serial % 2 ? "#F0F0F0" : "transparent"}`,
  borderRadius: "8px",
  "&:not(:last-child)": {
    marginBottom: "8px",
  },
  "& >p:first-of-type": {
    color: "#081753",
  },
  "&::before": {
    content: `"${props.serial})"`,
  },
}));

function App() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(false);
  const [view, setView] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const initPage = searchParams.get("page");
  const navTo = useNavigate();
  const getList = useCallback(
    async (page) => {
      setLoad(true);
      try {
        const data = await getPosts(page);
        setLoad(false);
        setPosts(data);
      } catch (e) {
        setLoad(false);
        console.error(e);
        toast.error(`Oops Something went wrong! ${e.message}`, {
          id: "fetch",
        });
        navTo("/*");
      }
    },
    [navTo]
  );
  useEffect(() => {
    getList(page);
    setSearchParams({ page });
  }, [getList, page, setSearchParams]);

  useEffect(() => {
    setPage(+initPage);
    getList(+initPage);
    setSearchParams({ page: +initPage });
  }, [initPage, getList, setSearchParams]);

  function handlePages(type) {
    if (type === "INC") {
      setPage((pre) => pre + 1);
      return;
    }
    setPage((pre) => pre - 1);
  }

  function closeModal() {
    setView(false);
  }

  const isPageEnd = !Boolean(posts?.length);
  return (
    <MainContainer>
      <div>
        <Header>
          <h1>My list</h1>
          <Button
            onClick={() => setView(true)}
            variant="outlined"
            startIcon={<AddIcon />}
          >
            Create a Post
          </Button>
        </Header>
        <ButtonGroup disableElevation variant="outlined">
          <IconButton
            sx={{
              pointerEvents: !Boolean(page) ? "none" : "auto",
              opacity: !Boolean(page) ? 0.3 : 1,
            }}
            onClick={handlePages.bind(null, "DEC")}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton
            sx={{
              pointerEvents: !Boolean(posts?.length) ? "none" : "auto",
              opacity: !Boolean(posts?.length) ? 0.3 : 1,
            }}
            onClick={handlePages.bind(null, "INC")}
          >
            <NavigateNextIcon />
          </IconButton>
        </ButtonGroup>
        <Container>
          {!load ? (
            isPageEnd ? (
              <p>No Data Found</p>
            ) : (
              posts?.map((item) => (
                <Link className="link" to={`/post/${item?.id}`} key={item?.id}>
                  <PostItem serial={item?.id}>
                    <h3>{item?.title}</h3>
                    <p>{item?.body}</p>
                    <p>
                      Created by <span className="author">{item?.userId}</span>
                    </p>
                  </PostItem>
                </Link>
              ))
            )
          ) : (
            <CircularProgress sx={{ marginInline: "45%" }} />
          )}
        </Container>
      </div>
      {view ? <AddPostModal open={view} closeHandler={closeModal} /> : null}
    </MainContainer>
  );
}

export default App;
