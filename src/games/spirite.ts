import BackGround from "./images/background.jpg";
import DiscoDog from "./images/discodog.png";
import Horn from "./images/horn.png";
import AudNoLight from "./images/audnolight.png";
import AudLight from "./images/audlight.png";
import Progress from "./images/progress.png";
import GiftBox from "./images/giftbox.png";

const backgroundImage = new Image();
backgroundImage.src = BackGround;

const discodogImage = new Image();
discodogImage.src = DiscoDog;

const hornImage = new Image();
hornImage.src = Horn;

const audNoLight = new Image();
audNoLight.src = AudNoLight;

const audLight = new Image();
audLight.src = AudLight;

const progress = new Image();
progress.src = Progress;

const giftbox = new Image();
giftbox.src = GiftBox;

export default {
  backgroundImage: backgroundImage,
  spirites: [discodogImage],
  audience: [audNoLight, audLight],
  horn: hornImage,
  progressBar: progress,
  giftbox: giftbox,
}
