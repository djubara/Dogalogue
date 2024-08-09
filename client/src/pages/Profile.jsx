import Card from 'react-bootstrap/Card';
const Profile = () => {
    return (
        <div className="profile">
            <h2>Profile</h2>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://placehold.co/600x400" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    
                </Card.Body>
            </Card>

        </div>
    );
}

export default Profile;



