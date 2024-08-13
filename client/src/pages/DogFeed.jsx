
import FeedPosts from '../components/FeedPosts';

const DogFeed = () => {
   

    return ( 
        <div className="feedPage full-withradius border">
            <h1>The Feed</h1>
           
             <FeedPosts  />
        </div>
     );
}
 
export default DogFeed;