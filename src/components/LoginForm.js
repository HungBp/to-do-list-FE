import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function LoginForm() {
  return (
    <Form>
      <Form.Group className="mx-3">
        <Form.Label htmlFor="username"> Username </Form.Label>
        <Form.Control type="text" name="username" id="username"/>
      </Form.Group>

      <Form.Group className="m-3">
        <Form.Label htmlFor="password"> Password </Form.Label>
        <Form.Control type="password" name="password" id="password"/>
      </Form.Group>

      <Form.Group className="m-3 text-center">
        <Button variant="primary" type="submit"> Submit </Button>
      </Form.Group>

      <Form.Group className="m-3 text-center">
        <Form.Text>
          <p>Haven't has account yet? Signup</p>
          <p>Forgot password?</p>
        </Form.Text>
      </Form.Group>
    </Form>
  );
}

export default LoginForm;