import { useRef } from "react";
import TinyMceTextEditor from "../../components/TinyMceTextEditor";
const WriteStories = () => {
  const editorRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editorRef.current) {
      let content = editorRef.current.getContent();
      console.log(content);
      // clear the editor after submit:
      // editorRef.current.resetContent("");
      // editorRef.current.setDirty(false);
    }
  };
  return (
    <div>
      <form className="flex flex-col gap-4 rounded-xl" onSubmit={handleSubmit}>
        <legend className="text-2xl">New Post</legend>
        <div className="flex flex-col gap-2 rounded-xl border border-gray-200 p-4 shadow-sm">
          <label htmlFor="title">TITLE</label>
          <input
            className="rounded-xl border border-gray-300 bg-gray-100 p-2 outline-gray-500"
            type="text"
            name="title"
            id="title"
          />
        </div>
        <div className="flex flex-col gap-2 rounded-xl border border-gray-200 p-4 shadow-sm">
          <label htmlFor="excerpt">Short description</label>
          <input
            className="rounded-xl border border-gray-300 bg-gray-100 p-2 outline-gray-500"
            type="text"
            name="excerpt"
            id="excerpt"
          />
        </div>
        <div className="flex flex-col gap-2 rounded-xl border border-gray-200 p-4 shadow-sm">
          <label htmlFor="content">CONTENT</label>
          <TinyMceTextEditor editorRef={editorRef} />
        </div>
        <div className="flex flex-col gap-2 rounded-xl border border-gray-200 p-4 shadow-sm">
          <label htmlFor="tag">TAGS</label>
          <input
            className="rounded-xl border border-gray-300 bg-gray-100 p-2 outline-gray-500"
            type="text"
            name="tag"
            id="tag"
          />
        </div>
        <button
          type="submit"
          className="rounded border border-neutral-300 px-5 py-2 shadow-sm outline-gray-500 transition duration-300 hover:cursor-pointer hover:bg-gray-100 lg:self-start"
        >
          Publish
        </button>
      </form>
    </div>
  );
};
export default WriteStories;
