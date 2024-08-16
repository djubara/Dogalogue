import { Link } from "react-router-dom";
import doggo from "../../public/assets/remi.jpg";

export default function FeedPosts({ posts }) {
  return (
    <div className="feed-posts">
      {posts.map((post) => (
        <div className="post individualpostborder" key={post.id}>
          {/* <pre>{JSON.stringify(post)}</pre> */}
          <Link to={`/post/${post.id}`} className="text-decoration-none">
            <div className="postbox align-items-center">
              <img className="postimage" src={post.author.photoUrl} />
              <div className="talk-bubble tri-right left-in round talk-bubble-border">
                <div className="talktext">
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
