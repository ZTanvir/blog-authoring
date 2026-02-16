import { useState, useRef } from "react";
import { useParams } from "react-router";
import WriteStoryForm from "../../components/WriteStoryForm";
import postService from "../../services/post";
import useSWR from "swr";

const EditStoriesPage = () => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const { postId } = useParams();
  const { data, isLoading } = useSWR(
    `/api/posts/${postId}`,
    postService.getPosts,
  );
  console.log(data);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="m-2 rounded-xl border border-gray-200 px-4 py-4 shadow-sm">
      <h2 className="mb-2 text-2xl">Edit story</h2>
      <WriteStoryForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        initialValue="<p>What's on your mind?</p>"
        editorRef={editorRef}
        tag={tag}
        setTag={setTag}
        isMutating={false}
        handleSubmit={handleSubmitForm}
        errorMsg={errorMsg}
      />
    </div>
  );
};
export default EditStoriesPage;
