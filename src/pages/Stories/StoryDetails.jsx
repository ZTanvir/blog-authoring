import useSWRMutation from "swr/mutation";
import postService from "../../services/post";
const StoryDetails = ({ post, mutatePosts }) => {
  const { trigger } = useSWRMutation(
    `/api/posts/${post.id}`,
    postService.editPosts,
  );

  return (
    <div className="mb-2 flex flex-col gap-4 sm:flex-row" key={post.id}>
      <span className="">{post.title}</span>
      <div className="flex gap-2">
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
          className={`rounded border ${post.published ? " bg-green-200 hover:bg-red-200" : "bg-red-200 hover:bg-green-200"} w-30 px-3 py-2 text-gray-800 shadow-lg transition duration-200 hover:cursor-pointer`}
        >
          {post.published ? "publish" : "unpublish"}
        </button>
        <button className="w-30 rounded border border-red-950 bg-red-500 px-3 py-2 text-neutral-200 shadow-lg transition duration-200 hover:cursor-pointer hover:bg-red-400">
          Delete
        </button>
      </div>
    </div>
  );
};

export default StoryDetails;
