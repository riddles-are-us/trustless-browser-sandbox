import "./style.scss";
import {
  Row,
  Container,
} from "react-bootstrap";
import {LandingImage} from "../games/roguelike/controller";
export default function Default() {
    return (
      <Container className="landing-page">
        <Row>
          <div className="game-card-tiny">
            <img src={LandingImage}>
            </img>
            <h4>Card Game Demo</h4>
            <div className="game-card-details">
            Tutorial App, Spin Card Game Template.
            </div>
            <div>
              <a href="/roguelike" className="btn btn-game-card-play">play</a>
            </div>
          </div>
        </Row>
        <Row>
          <div className="game-card-tiny">
            <img src={LandingImage}>
            </img>
            <h4>Hello World</h4>
            <div className="game-card-details">
            Tutorial App, A Hello World Template
            </div>
            <div>
              <a href="/template" className="btn btn-game-card-play">play</a>
            </div>
          </div>
        </Row>
        <Row>
          <div className="game-card-tiny">
            <img src={LandingImage}>
            </img>
            <h4>Card Game Demo</h4>
            <div className="game-card-details">
            Tutorial App, A Towerdefence simulation template
            </div>
            <div>
              <a href="/towerdefence" className="btn btn-game-card-play">play</a>
            </div>
          </div>
        </Row>
        <Row>
          <div className="game-card-tiny">
            <img src={LandingImage}>
            </img>
            <h4>Damo Game</h4>
            <div className="game-card-details">
              Tutorial App, A game to guess the secret number.
            </div>
            <div>
              <a href="/demogame" className="btn btn-game-card-play">play</a>
            </div>
          </div>
        </Row>

      </Container>
    )
}
