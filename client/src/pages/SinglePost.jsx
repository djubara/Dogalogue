import { Link, useParams } from 'react-router-dom';
import posts from "../../data/posts";
import doggo from "../../public/assets/remi.jpg";
import { useEffect, useState } from 'react';

const SinglePost = () => {
    const [post, setPost] = useState({});

    const { postId } = useParams();
    const foundPost = posts.find((post) => post.id === parseInt(postId));

    useEffect(() => {
        setPost(foundPost);
    }, [post]);

    if (!post.id) {
        return <h2>Post not found!</h2>
    }

    return (
        <>
        <div className="feed-posts">
                <div className="post individualpostborder" key={post?.id}>
                    <div className="postbox align-items-center">
                        <Link to={`/profile/${post?.user.id}`} className="text-decoration-none">
                            <img className="postimage" src={doggo} />
                        </Link>
                        <div className="talk-bubble tri-right left-in round talk-bubble-border">
                            <div className="talktext">
                                <h2>{post?.title}</h2>
                                <p>{post?.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        <div>
            <form>
                {/* Run another query using the user's context to pull their pet data so we can create a option dropdown that allows them to select the pet author */}
                <textarea
                    placeholder="Leave a comment..."
                    rows="3"
                    cols="50"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
        </>
    );
}

export default SinglePost;