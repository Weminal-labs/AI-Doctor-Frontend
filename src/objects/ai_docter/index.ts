import { AIDocterAPI } from "./api";
import { AIDocterValidator } from "./validator";

/**
 * Static Class
 */
export class AIDocter {
  static API = new AIDocterAPI();
  static Validator = new AIDocterValidator();
}
