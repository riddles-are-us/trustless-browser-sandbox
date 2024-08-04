import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { GuideType } from "./models";
import { getGuidePages, guidePageMap } from "../../games/automata/components/Guides/Guide";

interface GuidesState {
  guideType: GuideType;
  pages: string[];
  currentPage: number;
}

const initialState: GuidesState = {
  guideType: GuideType.First,
  pages: getGuidePages(GuideType.First),
  currentPage: 0,
};

export const guidesSlice = createSlice({
  name: "guides",
  initialState,
  reducers: {
    startGuide: (state, action) => {
      const guideType = action.payload.guideType;
      state.guideType = guideType;
      state.pages = getGuidePages(guideType);
      state.currentPage = 0;
    },
    nextPage: (state, action) => {
        state.currentPage = Math.min(state.pages.length - 1, state.currentPage + 1);
    },
    prevPage: (state, action) => {
        state.currentPage = Math.max(0, state.currentPage - 1);
    },
  },
});

export const selectGuideOnCurrentPage = (state: RootState) => {
  const guidePage = state.automata.guides.pages[state.automata.guides.currentPage];
  return guidePageMap[guidePage];
}
export const selectCurrentPage = (state: RootState) => state.automata.guides.currentPage;
export const selectTotalPage = (state: RootState) => state.automata.guides.pages.length;


export const { startGuide, nextPage, prevPage } = guidesSlice.actions;
export default guidesSlice.reducer;
