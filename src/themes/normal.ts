// Import objects
import { Theme } from "src/objects/Theme";

export const NormalTheme = new Theme("normal");

const DarkScheme = {
  background: "9, 8, 20",
  onBackground: "243, 242, 253",
  success: "118, 204, 78",
  onSuccess: "241, 255, 234",
  error: "161, 45, 45",
  onError: "245, 231, 231",
  warning: "250, 208, 58",
  onWarning: "88, 70, 7",
  info: "57, 136, 255",
  onInfo: "229, 240, 255",
  first: "95, 81, 255",
  onFirst: "227, 224, 255",
  second: "81, 154, 255",
  onSecond: "246, 234, 255",
  third: "182, 81, 255",
  onThird: "231, 241, 255",
};

// Set theme
Theme.setTheme(NormalTheme, "dark", DarkScheme);

// Install
Theme.install(NormalTheme);

NormalTheme.enable("dark");
