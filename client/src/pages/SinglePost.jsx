import { Link, useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import { Button } from 'react-bootstrap';
import doggo from "../../public/assets/remi.jpg";
import doggo2 from "../../public/assets/coolDog.jpg";
import doggo3 from "../../public/assets/coolBlackDog.jpg";
import doggo4 from "../../public/assets/blackDog.jpg";
import { useState } from 'react';
import { QUERY_POST } from '../utils/queries';
import { useQuery } from '@apollo/client';
import NewCommentModal from '../components/NewCommentModal'

const SinglePost = () => {
    const [showNewPostModal, setShowNewPostModal] = useState(false);
    const { postId } = useParams();
    const { loading, data } = useQuery(QUERY_POST, {
        variables: { postId: postId }
    });

    const doggos = [doggo, doggo2, doggo3, doggo4];

    const postData = data?.post || {};

    // const getRandomDoggo = () => {
    //     return doggos[Math.floor(Math.random() * doggos.length)];
    // }

    if (loading) {
        return <h2>Post not found!</h2>
    }
    console.log(postData);

    return (
        <>
            <div className="feed-posts">
                <div className="post individualpostborder" key={postData.id}>
                    <div className="postbox align-items-center">
                        <Link to={`/profile/${postData.author.id}`} className="text-decoration-none">
                            <img className="postimage" src={postData.postingAs.photoUrl} />
                        </Link>
                        <div className="talk-bubble tri-right left-in round talk-bubble-border">
                            <div className="talktext">
                                <h2>{postData.postingAs.petName}</h2>
                                <p>{postData.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* SHOW ALL COMMENTS ASSOCIATED WITH POST */}
                <div>
                    {postData?.comments?.map(comment => (
                        <div className="post individualpostborder" key={comment.id}>
                            <div className="postbox align-items-center">
                                <Link to={`/profile/${comment.author.id}`} className="text-decoration-none">
                                    <img className="postimage" src={comment.postingAs.photoUrl} />
                                </Link>
                                <div className="comment-bubble tri-comment-right left-in round talk-bubble-border">
                                    <div className="talktext">
                                        <h2>{comment.postingAs.petName}</h2>
                                        <p>{comment.content}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <Button className="commentSpacing" onClick={() => setShowNewPostModal(true)}>
                    New Comment
                </Button>
                {Auth.loggedIn() ? <NewCommentModal show={showNewPostModal} setShow={setShowNewPostModal} /> : <h2>You need to be logged in.</h2>}
            </div>
        </>
    );
}

export default SinglePost;