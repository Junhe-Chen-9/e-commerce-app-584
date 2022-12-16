import { Container } from "react-bootstrap";
import HeroSection from "../components/HeroSection";
export default function Home(props) {
  return (
    <Container
      fluid
      className="p-0"
      style={{
        height: "100vh",
        backgroundColor: props.lightMode ? "white" : "#121212",
      }}
    >
      <HeroSection lightMode={props.lightMode} />
    </Container>
  );
}
