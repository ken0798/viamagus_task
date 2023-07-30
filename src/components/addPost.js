import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { styled } from "@mui/system";
import { useState } from "react";
import { createPost } from "../services";
import toast from "react-hot-toast";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  p: 2,
};

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export default function AddPostModal({ open, closeHandler }) {
  const [state, setState] = useState({
    title: "",
    text: "",
    error: "",
  });

  function handleInputs(type, e) {
    setState((pre) => ({
      ...pre,
      [type]: e.target.value,
    }));
  }
  async function onSubmission(e) {
    const { text, title } = state;
    e.preventDefault();
    if (!Boolean(text) || !Boolean(title)) {
      toast.error("All Fields are required");
      return;
    }
    if (text.length > 1000) {
      toast.error("Sorry you can type more than 1000 characters");
      return;
    }
    const res = await createPost(state);
    if (res.id) {
      toast.success("Successfully created a post");
    }
    closeHandler();
    setState({
      title: "",
      text: "",
      error: "",
    });
  }
  return (
    <Modal open={open} onClose={closeHandler}>
      <Box sx={style}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          borderBottom={"1px solid #ccc"}
          justifyContent={"space-between"}
        >
          <Typography>Create a Post</Typography>
          <IconButton onClick={closeHandler}>
            <HighlightOffIcon />
          </IconButton>
        </Stack>
        <Form onSubmit={onSubmission} style={{ marginBlock: "16px" }}>
          <TextField
            onChange={handleInputs.bind(null, "title")}
            variant="outlined"
            required
            label="Title"
          />
          <TextField
            onChange={handleInputs.bind(null, "text")}
            multiline
            rows={5}
            variant="outlined"
            required
            label="Description"
            helperText="Max 1000 characters are allowed"
            error={state.text.length > 1000}
          />
          <ButtonGroup>
            <Button type="reset">Reset</Button>
            <Button type="submit">Submit</Button>
          </ButtonGroup>
        </Form>
      </Box>
    </Modal>
  );
}
