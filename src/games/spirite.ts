import BackGround from "./images/background.jpg";
import DiscoDog from "./images/discodog.png";
import Horn from "./images/horn.png";

const backgroundImage = new Image();
backgroundImage.src = BackGround;

const discodogImage = new Image();
discodogImage.src = DiscoDog;

const hornImage = new Image();
hornImage.src = Horn;

export default {
  backgroundImage: backgroundImage,
  spirites: [discodogImage],
  horn: hornImage
}
