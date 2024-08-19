import Card from 'react-bootstrap/Card';
// import profile from '../../data/profile';
// import remi from "../../public/assets/remi.jpg";

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = () => {
    const { loading, data } = useQuery(QUERY_ME);

    const profile = data?.me.pets || {};
    console.log(profile);

    function renderEnergyLevel(energyLevel) {
        switch(energyLevel) {
            case 5:
                return "High";
            case 4:
                return "Medium-High";
            case 3:
                return "Medium";
            case 2:
                return "Medium-Low";
            case 1:
                return "Low";
            default:
                return "Unknown";
        }
    }

    function renderSize(size) {
        switch(size) {
            case 'xl':
                return "Giant";
            case 'lg':
                return "Big";
            case 'md':
                return "Medium";
            case 'sm':
                return "Small";
            case 'xs':
                return "Petite";
            default:
                return "Unknown";
        }
    }

    function renderAltered(altered) {
        if (altered === true) {
            return "Yes";
        } else {
            return "No";
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (

        <div className="profile">
            {Auth.loggedIn() ? (
                <>
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
                                    <p>I am a {profile.age} year old {profile.gender}!</p>
                                    <p>My breed is: {profile.breed}</p>
                                    <p>I have {renderEnergyLevel(profile.energyLevel)} energy!</p>
                                    <p>I was adopted on {profile.gotchaDate}!</p>
                                    <p>I am {renderSize(profile.size)} in size!</p>
                                    <p>Altered: {renderAltered(profile.altered)}</p>

                                </div>
                            </div>
                        </div>
                    
                </div>
            ))}
        </div>
        </>
            ) : (
                <h2>You need to be logged in to see the feed.</h2>
            )}
        </div>
    );
}

export default Profile;



