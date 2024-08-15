import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const FeedPostInput = () => {
    return (
        <div className="feed-post-input">
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Make a Post!</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlFile1" className="mb-3">
                    <Form.Label>Include a Photo!</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default FeedPostInput;