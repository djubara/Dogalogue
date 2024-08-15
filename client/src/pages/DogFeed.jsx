
import FeedPosts from '../components/FeedPosts';
import Auth from '../utils/auth';

const DogFeed = () => {
   

    return ( 
        <div className="feedPage full-withradius border">
            {Auth.loggedIn() ? (
                <>
            <h1 className="feed-title">The Feed</h1>
           
             <FeedPosts  />
             </>
            ) : (
                <h2>You need to be logged in to see the feed.</h2>
            )}
        </div>
     );
}
 
export default DogFeed;