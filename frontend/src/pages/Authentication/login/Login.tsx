import React, { useEffect, useState } from "react";
import { useLoginUserMutation } from "./apiSlice";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardImg,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import TokenExpiredModal from "./TokenExpiredModal";
import { IWithRouterProps } from "../../../types/routerTypes";
import WithRouter from "../../../wrapper/WithRouter";

const Login: React.FC<IWithRouterProps> = ({ router }) => {
  //State
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [username, setUsername] = useState("furkannsenol");
  const [password, setPassword] = useState("123456");

  //login Service
  const [loginUser, { isLoading }] = useLoginUserMutation();

  useEffect(() => {
    const refreshTokenInfo = JSON.parse(
      localStorage.getItem("timeoutRefreshToken") || "{}"
    );
    if (refreshTokenInfo.visible === "true") {
      setIsTokenExpired(true);
    }

    if (localStorage.getItem("authUser")) {
      router.navigate("/home");
    }
  }, [router]);

  const handleLogin = async () => {
    try {
      await loginUser({ username, password })
        .unwrap()
        .then((res) => {
          localStorage.setItem("authUser", JSON.stringify(res));
          router.navigate("/home");
        })
        .catch((error) => toast.error(error.message, { autoClose: 2000 }));
    } catch (err) {
      console.error("Login Failed:", err);
    }
  };

  const handleCloseModal = () => {
    setIsTokenExpired(false);
    localStorage.setItem(
      "timeoutRefreshToken",
      JSON.stringify({ visible: "false" })
    );
  };

  return (
    <React.Fragment>
      <Container
        className="d-flex align-items-center justify-content-center min-vh-100"
        style={{ overflow: "hidden" }}
      >
        <Card style={{ maxWidth: "900px", width: "100%" }}>
          <Row className="g-0">
            <Col md="6">
              <CardImg
                src="https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg"
                alt="login form"
                className="w-100 h-100"
                style={{
                  objectFit: "cover",
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              />
            </Col>
            <Col
              md="6"
              className="d-flex align-items-center justify-content-center p-4"
            >
              <CardBody className="d-flex flex-column align-items-center w-100">
                <div className="d-flex flex-row mb-3">
                  <span className="h4 fw-bold"> Sign into your account</span>
                </div>

                <Form className="w-100">
                  <FormGroup className="mb-4">
                    <Label for="username">Username</Label>
                    <Input
                      type="text"
                      id="username"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-100"
                    />
                  </FormGroup>
                  <FormGroup className="mb-4">
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-100"
                    />
                  </FormGroup>
                  <Button
                    color="dark"
                    className="mb-4 w-100"
                    onClick={handleLogin}
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </Form>
                <a className="small text-muted text-decoration-none" href="#!">
                  Forgot password?
                </a>
                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                  Don't have an account?{" "}
                  <a href="#!" style={{ color: "#393f81" }}>
                    Register here
                  </a>
                </p>
                <div className="d-flex flex-row justify-content-start">
                  <a
                    href="#!"
                    className="small text-muted me-1 text-decoration-none"
                  >
                    Terms of use.
                  </a>
                  <a
                    href="#!"
                    className="small text-muted text-decoration-none"
                  >
                    Privacy policy
                  </a>
                </div>
              </CardBody>
            </Col>
          </Row>
        </Card>
        <ToastContainer />
      </Container>
      <TokenExpiredModal
        isVisible={isTokenExpired}
        onClose={handleCloseModal}
      />
    </React.Fragment>
  );
};

export default WithRouter(Login);
