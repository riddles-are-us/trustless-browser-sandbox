export interface ObjectProperty {
  entity: Array<number>,
  object_id: Array<string>,
  modifiers: Array<number>,
  modifier_info: string,
}

export interface Modifier {
  delay: number,
  entity: Array<number>,
  local: Array<number>,
  name: string,
}

export class ExternalState {
  selectedCreatureIndex: number | null;
  userActivity: "browsing" | "creating" | "rebooting";
  // idle -> queryingUpdate, queryingUpdate -> moniteringResut, moniteringResut-> queryingUpdate
  viewerActivity: "monitoringResult" | "queryingUpdate" | "idle" | "queryConfig";
  errorMessage: string;

  constructor() {
    this.selectedCreatureIndex = null;
    this.userActivity = "browsing",
    this.viewerActivity = "idle",
    this.errorMessage = ""
  }

  isMonitorResult() {
    return (this.viewerActivity == "monitoringResult");
  }

  hasError() {
    return (this.errorMessage != "");
  }

  getSelectedIndex(): number | null{
    return this.selectedCreatureIndex;
  }
}