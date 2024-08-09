import useFetch from '../useFetch';
import FeedPosts from '../components/FeedPosts';

const DogFeed = () => {
    const { data: posts, isPending, error } = useFetch('http://localhost:8000/posts');

    return ( 
        <div className="feedPage">
            <h1>The Feed</h1>
            {error && <div>{ error }</div>}
            {isPending && <div>Loading...</div>}
            {posts && <FeedPosts posts={posts} />}
        </div>
     );
}
 
export default DogFeed;