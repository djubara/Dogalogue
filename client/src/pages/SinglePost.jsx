import { Link, useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import { Button } from 'react-bootstrap';
import doggo from "../../public/assets/remi.jpg";
import { useState } from 'react';
import { QUERY_POST } from '../utils/queries';
import { useQuery } from '@apollo/client';
import NewCommentModal from '../components/NewCommentModal';

const SinglePost = () => {
    const [showNewPostModal, setShowNewPostModal] = useState(false);
    const { postId } = useParams();
    const { loading, data } = useQuery(QUERY_POST, {
        variables: { postId: postId }
    });

    if (loading) {
        return <h2>Post not found!</h2>
    }
    console.log(data);

    return (
        <>
        <div className="feed-posts">
                <div className="post individualpostborder" key={data.post.id}>
                    <div className="postbox align-items-center">
                        <Link to={`/profile/${data.post.author.id}`} className="text-decoration-none">
                            <img className="postimage" src={doggo} />
                        </Link>
                        <div className="talk-bubble tri-right left-in round talk-bubble-border">
                            <div className="talktext">
                                <h2>{data.post.postingAs.petName}</h2>
                                <p>{data.post.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        <div>
        <Button onClick={() => setShowNewPostModal(true)}>
                New Post
              </Button>
        {Auth.loggedIn() ? <NewCommentModal show={showNewPostModal} setShow={setShowNewPostModal} /> : <h2>You need to be logged in.</h2>}
        </div>
        </>
    );
}

export default SinglePost;