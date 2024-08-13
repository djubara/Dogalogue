import { Link } from 'react-router-dom';
import posts from "../../data/posts";

const FeedPosts = () => {
    return ( 
        <div className="feed-posts">
            {posts.map((post) => (
                <div className="post" key={post.id}>
                    <Link to={`/post/${post.id}`}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </Link>
                </div>
            ))}
        </div>
     );
}
 
export default FeedPosts;