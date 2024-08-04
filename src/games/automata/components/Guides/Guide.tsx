import Guide_1 from "./Guide_1";
import Guide_2 from "./Guide_2";
import Guide_3 from "./Guide_3";
import { GuideType } from "../../../../data/automata/models";

const guide_1 = "guide_1";
const guide_2 = "guide_2";
const guide_3 = "guide_3";
export const guidePageMap: {
  [key: string]: JSX.Element;
} = {
  guide_1: <Guide_1 />,
  guide_2: <Guide_2 />,
  guide_3: <Guide_3 />,
};

export function getGuidePages(type: GuideType) {
  switch (type) {
    case GuideType.First:
      return [guide_1, guide_2, guide_3];
    default:
      return [];
  }
}
