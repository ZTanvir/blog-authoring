import useSWRMutation from "swr/mutation";
import postService from "../../services/post";
import { Link } from "react-router";

const StoryDetails = ({ post, mutatePosts, setIsModalOpen, setPost }) => {
  const { trigger } = useSWRMutation(
    `/api/posts/${post.id}`,
    postService.editPosts,
  );

  return (
    <div className="mb-8 flex flex-col gap-2 md:flex-row" key={post.id}>
      <span className="text-xl">{post.title}</span>
      <div className="flex flex-col gap-2 md:flex-row">
        <button
          onMouseEnter={(e) => {
            if (post.published) {
              e.target.textContent = "unpublish";
            } else {
              e.target.textContent = "publish";
            }
          }}
          onMouseLeave={(e) => {
            if (post.published) {
              e.target.textContent = "publish";
            } else {
              e.target.textContent = "unpublish";
            }
          }}
          onClick={async () => {
            const res = await trigger({ ...post, published: !post.published });
            if (res) {
              mutatePosts();
            }
          }}
          className={`rounded border ${post.published ? " bg-green-200 hover:bg-red-200" : "bg-red-200 hover:bg-green-200"} px-3 py-2 text-gray-800 shadow-lg transition duration-200 hover:cursor-pointer md:w-30`}
        >
          {post.published ? "publish" : "unpublish"}
        </button>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setPost(post);
          }}
          className="rounded border border-red-950 bg-red-500 px-3 py-2 text-neutral-200 shadow-lg transition duration-200 hover:cursor-pointer hover:bg-red-400 md:w-30"
        >
          Delete
        </button>
        <Link
          className="rounded border border-sky-950 bg-sky-600 px-3 py-2 text-center text-neutral-200 shadow-lg transition duration-200 hover:cursor-pointer hover:bg-sky-400 md:w-30"
          to={`/edit/${post?.id}`}
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default StoryDetails;
