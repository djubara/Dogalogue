import { Link } from 'react-router-dom';
import posts from "../../data/posts";
import doggo from "../../public/assets/remi.jpg";

const FeedPosts = () => {
    return ( 
        <div className="feed-posts">
            {posts.map((post) => (
                <div className="post individualpostborder" key={post.id}>
                    <Link to={`/post/${post.id}`} className="text-decoration-none"> 
                        <div className="postbox align-items-center">
                            <img className="postimage" src={doggo} />
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
 
export default FeedPosts;