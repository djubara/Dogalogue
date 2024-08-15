import Card from 'react-bootstrap/Card';
// import profile from '../../data/profile';
import remi from "../../public/assets/remi.jpg";

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const Profile = () => {
    const { loading, data } = useQuery(QUERY_ME);

    const profile = data?.me.pets || {};
    console.log(profile);
    if(loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="profile">
            <h2>Profile</h2>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={profile.photoUrl} />
            </Card>
            <div className="profileContent">
            {profile.map((profile) => (
                <div className="post individualpostborder" key={profile._id}>
                        <div className="postbox align-items-center">
                            <div className="talk-bubble tri-right left-in round talk-bubble-border">
                                <div className="talktext">
                                    <h3>My name is: {profile.petName}</h3>
                                    <p>I am {profile.age} years old {profile.gender}!</p>
                                    <p>My breed is: {profile.breed}</p>
                                    <p>I have {profile.energyLevel} energy!</p>
                                    <p>I was adopted on {profile.gotchaDate}!</p>
                                    <p>I am {profile.size} in size!</p>
                                    <p>Altered: {profile.altered}</p>


                                </div>
                            </div>
                        </div>
                    
                </div>
            ))}
        </div>

        </div>
    );
}

export default Profile;



