import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

const TinyMceTextEditor = ({ onEditorContent }) => {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      let content = editorRef.current.getContent();
      onEditorContent(content);
      // clear the editor after submit:
      // editorRef.current.resetContent("");
      // editorRef.current.setDirty(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-5">
      <Editor
        apiKey={import.meta.env.VITE_TINY_MCE_TEXT_EDITOR}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue=""
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button
        className="rounded border border-neutral-300 px-5 py-2 shadow-sm transition duration-300 hover:cursor-pointer hover:bg-gray-100 lg:self-start"
        onClick={log}
      >
        Publish
      </button>
    </div>
  );
};
export default TinyMceTextEditor;
