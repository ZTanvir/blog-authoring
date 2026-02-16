import { useRef, useState } from "react";
import useSWRMutation from "swr/mutation";
import postService from "../../services/post";
import WriteStoryForm from "../../components/WriteStoryForm";

const WriteStories = () => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const { trigger, isMutating } = useSWRMutation(
    "/api/posts",
    postService.createPosts,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formatTag = tag.split(",");
    const formData = {};
    if (title) formData["title"] = title;
    if (description) formData["excerpt"] = description;
    if (editorRef.current) formData["content"] = editorRef.current.getContent();
    if (tag) formData["tag"] = formatTag;

    try {
      const result = await trigger(formData);
      if (result) {
        setTitle("");
        setDescription("");
        editorRef.current.resetContent("");
        editorRef.current.setDirty(false);
        setTag("");
        setErrorMsg(null);
      }
    } catch (err) {
      setErrorMsg(err.errors);
    }
  };
  return (
    <div className="m-2 rounded-xl border border-gray-200 px-4 py-4 shadow-sm">
      <h2 className="mb-2 text-2xl">Write story</h2>
      <WriteStoryForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        initialValue="<p>What's on your mind?</p>"
        editorRef={editorRef}
        tag={tag}
        setTag={setTag}
        isMutating={isMutating}
        handleSubmit={handleSubmit}
        errorMsg={errorMsg}
      />
    </div>
  );
};
export default WriteStories;
