// Import objects
import { API } from "src/objects/api";

export class AIDocterAPI {
  private _api!: API;

  constructor() {
    this._api = new API({ baseURL: "/" });
  }

  /**
   * Send a question to AI
   * @returns
   */
  async postQuestionAsync() {
    return this._api.post("/question", {});
  }

  /**
   * Send a executable block of code to AI and get result
   * @returns
   */
  async postCodeToExecuteAsync() {
    return this._api.post("/execute", {});
  }
}
