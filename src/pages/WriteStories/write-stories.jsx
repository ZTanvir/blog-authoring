import { useRef, useState } from "react";
import TinyMceTextEditor from "../../components/TinyMceTextEditor";
import useSWRMutation from "swr/mutation";
import postService from "../../services/post";

const WriteStories = () => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
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
    console.log("formdata", formData);
    try {
      const result = await trigger(formData);
      if (result) {
        setTitle("");
        setDescription("");
        editorRef.current.resetContent("");
        editorRef.current.setDirty(false);
        setTag("");
      }
    } catch (error) {
      console.log("form error", error);
    }

    if (editorRef.current) {
      // clear the editor after submit:
      // editorRef.current.resetContent("");
      // editorRef.current.setDirty(false);
    }
  };
  return (
    <div className="m-2 rounded-xl border border-gray-200 px-4 py-4 shadow-sm">
      <form className="flex flex-col gap-4 rounded-xl" onSubmit={handleSubmit}>
        <legend className="text-2xl">New Post</legend>
        <div className="flex flex-col gap-2 rounded-xl border border-gray-200 p-4 shadow-sm">
          <label htmlFor="title">Title</label>
          <input
            className="rounded-xl border border-gray-300 bg-gray-100 px-4 py-1 outline-gray-500"
            type="text"
            name="title"
            id="title"
            value={title}
            placeholder="Enter a descriptive blog title..."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 rounded-xl border border-gray-200 p-4 shadow-sm">
          <label htmlFor="excerpt">Short description</label>
          <input
            className="rounded-xl border border-gray-300 bg-gray-100 px-4 py-1 outline-gray-500"
            type="text"
            name="excerpt"
            id="excerpt"
            placeholder="Provide a short summary of this post ..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 rounded-xl border border-gray-200 p-4 shadow-sm">
          <label htmlFor="content">Content</label>
          <TinyMceTextEditor editorRef={editorRef} />
        </div>
        <div className="flex flex-col gap-2 rounded-xl border border-gray-200 p-4 shadow-sm">
          <label htmlFor="tag">Tags</label>
          <input
            className="rounded-xl border border-gray-300 bg-gray-100 px-4 py-1 outline-gray-500"
            type="text"
            name="tag"
            id="tag"
            placeholder="e.g technology, business, innovation (separated by commas)"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </div>
        <button
          disabled={isMutating}
          type="submit"
          className="rounded border border-neutral-300 px-5 py-2 shadow-sm outline-gray-500 transition duration-300 hover:cursor-pointer hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-80 lg:self-start"
        >
          Publish
        </button>
      </form>
    </div>
  );
};
export default WriteStories;
