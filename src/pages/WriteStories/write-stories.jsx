import TinyMceTextEditor from "../../components/TinyMceTextEditor";
const WriteStories = () => {
  const handleEditorContent = (content) => {
    console.log(content);
  };
  return (
    <div>
      <TinyMceTextEditor onEditorContent={handleEditorContent} />
    </div>
  );
};
export default WriteStories;
