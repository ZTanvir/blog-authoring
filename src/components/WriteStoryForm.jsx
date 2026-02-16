import helperFunction from "../utils/helperFunction";
import TinyMceTextEditor from "./TinyMceTextEditor";

const WriteStoryForm = ({
  title,
  setTitle,
  description,
  setDescription,
  initialValue,
  editorRef,
  tag,
  setTag,
  isMutating,
  handleSubmit,
  errorMsg,
}) => {
  return (
    <form className="flex flex-col gap-4 rounded-xl" onSubmit={handleSubmit}>
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
        {errorMsg && (
          <p className="text-sm text-red-500">
            {helperFunction.filterFormErrorMsg(errorMsg, "title")}
          </p>
        )}
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
        {errorMsg && (
          <p className="text-sm text-red-500">
            {helperFunction.filterFormErrorMsg(errorMsg, "excerpt")}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2 rounded-xl border border-gray-200 p-4 shadow-sm">
        <label htmlFor="content">Content</label>
        <TinyMceTextEditor initialValue={initialValue} editorRef={editorRef} />
        {errorMsg && (
          <p className="text-sm text-red-500">
            {helperFunction.filterFormErrorMsg(errorMsg, "content")}
          </p>
        )}
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
        {errorMsg && (
          <p className="text-sm text-red-500">
            {helperFunction.filterFormErrorMsg(errorMsg, "tag")}
          </p>
        )}
      </div>
      <button
        disabled={isMutating}
        type="submit"
        className="rounded border border-neutral-300 px-5 py-2 shadow-sm outline-gray-500 transition duration-300 hover:cursor-pointer hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-80 lg:self-start"
      >
        Publish
      </button>
    </form>
  );
};
export default WriteStoryForm;
