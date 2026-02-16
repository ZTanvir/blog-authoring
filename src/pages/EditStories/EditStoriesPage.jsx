import { useState, useRef, useLayoutEffect } from "react";
import { useParams } from "react-router";
import useSWR from "swr";
import WriteStoryForm from "../../components/WriteStoryForm";
import postService from "../../services/post";
import Loading from "../../components/Loading";

const EditStoriesPage = () => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [initialContent, setInitialContent] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const { postId } = useParams();
  const { data, isLoading } = useSWR(
    `/api/posts/${postId}`,
    postService.getPosts,
  );

  const handleSubmitForm = async (e) => {
    e.preventDefault();
  };
  useLayoutEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.content);
      setTag(data.tag);
      setInitialContent(data.content);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="m-2 rounded-xl border border-gray-200 px-4 py-4 shadow-sm">
      <h2 className="mb-2 text-2xl">Edit story</h2>
      <WriteStoryForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        initialValue={initialContent}
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
