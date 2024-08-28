import BackGround from "./images/background.jpg";
import DiscoDog from "./images/discodog.png";

const backgroundImage = new Image();
backgroundImage.src = BackGround;

const discodogImage = new Image();
discodogImage.src = DiscoDog;

export default {
  backgroundImage: backgroundImage,
  spirites: [discodogImage]
}
