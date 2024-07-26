// Import from utils
import { BooleanUtils } from "../utils/boolean";

/*
  IDEA
  This `Theme` will be used with tailwindcss, there are 2 steps we need to do:
    - Define theme and import to `tailwind.config.ts` for building.
    - Use this `Theme` to change theme in app.

  Depend on theme's concept of tailwind, we need to defined each color has themes and `DEFAULT` value
  of it, for example:
  ```
  colors: {
    primary: {
      "light": "#FFF", // Light theme
      "dark": "#2626262", // Dark theme
      "DEFAULT": "#F1F1F1" // Optional
    }
  }
  ```
*/

const __AllowedThemeSchemes = ["light", "dark"] as const;

export const __ThemePropertyNames = {
  background: "background",
  onBackground: "on-background",
  success: "success",
  onSuccess: "on-success",
  error: "error",
  onError: "on-error",
  warning: "warning",
  onWarning: "on-warning",
  info: "info",
  onInfo: "on-info",
  first: "first",
  onFirst: "on-first",
  second: "second",
  onSecond: "on-second",
  third: "third",
  onThird: "on-third",
};

/**
 * Create an instance to manage theme in app. Be set up with tailwind in compile-time.
 */
export class Theme {
  name!: string;
  themeSchemeCSSClasses!: Map<string, string>;
  initializedStyleContent!: string;

  static currentScheme = "";
  static colorVariablesContent: string = ":root { }";
  static isThemePropertyVariablesInitialized: boolean = false;

  constructor(name: string) {
    this.name = name;
    this.themeSchemeCSSClasses = new Map();
  }

  /**
   * Use this method to use theme
   * @param themeName
   */
  enable(scheme: UColorSchemes) {
    if (!document.getElementById(this.name)) {
      console.warn(`The theme [${this.name}] isn't installed`);
      return;
    }

    if (!this.themeSchemeCSSClasses.has(scheme)) {
      console.warn(`The scheme ${scheme} isn't installed`);
      return;
    }

    const themeSchemeClassName = Theme.getHTMLSchemeClassName(
      this.name,
      scheme
    );

    if (document.documentElement.classList.contains(themeSchemeClassName))
      return;
    if (document.documentElement.classList.contains(Theme.currentScheme))
      document.documentElement.classList.remove(Theme.currentScheme);

    document.documentElement.classList.add(themeSchemeClassName);
    Theme.currentScheme = themeSchemeClassName;
  }

  /**
   * Use this static method to create CSS class name for theme scheme with
   * format `<theme's name>-<theme scheme's name>`
   * @param theme
   * @param themeScheme
   */
  static getHTMLSchemeClassName(theme: Theme | string, themeScheme: string) {
    if (typeof theme === "string") return `${theme}-${themeScheme}`;
    return `${theme.name}-${themeScheme}`;
  }

  /**
   * Use this static method to create CSS class name for theme scheme with
   * format `.<theme's name>-<theme scheme's name>`
   * @param theme
   * @param themeScheme
   */
  static getSchemeClassName(theme: Theme | string, themeScheme: string) {
    if (typeof theme === "string") return `.${theme}-${themeScheme}`;
    return `.${theme.name}-${themeScheme}`;
  }

  /**
   * Get a brightness' collection of `color`, `color` is the brightest color. There are 10 colors
   * in collection.
   * @param color
   * @returns
   */
  static getBrightnessCollectionOf(color: string) {
    const reg = /^(\d{1,3})(?:,{0,1})\s*(\d{1,3})(?:,{0,1})\s*(\d{1,3})$/;
    const result = color.match(reg);

    if (BooleanUtils.isFalsy(result)) {
      console.warn(`The color \`${color}\` isn't a valid RGB format`);
      return null;
    }

    const red = parseInt(result[1]),
      green = parseInt(result[2]),
      blue = parseInt(result[3]),
      from = 100,
      to = 10,
      step = 10,
      rRate = (red / 255) * step,
      gRate = (green / 255) * step,
      bRate = (blue / 255) * step,
      colors = [{ brightness: from, value: color }];
    let prevRed = red,
      prevGreen = green,
      prevBlue = blue;

    for (let i = from; i > to; i -= step) {
      prevRed = Math.trunc(prevRed - rRate);
      prevGreen = Math.trunc(prevGreen - gRate);
      prevBlue = Math.trunc(prevBlue - bRate);

      prevRed = prevRed < 0 ? 0 : prevRed;
      prevGreen = prevGreen < 0 ? 0 : prevGreen;
      prevBlue = prevBlue < 0 ? 0 : prevBlue;

      colors.push({
        brightness: i - step,
        value: `${prevRed} ${prevGreen} ${prevBlue}`,
      });
    }

    return colors;
  }

  /**
   * Use this static method to get a set of CSS Variables Template to set up in
   * `tailwind.config.ts`
   */
  static getTailwindColorsTheme() {
    const result: { [K: string]: { [N: string]: string } } = {};
    for (const key in __ThemePropertyNames) {
      const actualName =
        __ThemePropertyNames[key as keyof typeof __ThemePropertyNames];
      const cssVariableName = `--color-${actualName}`;

      // RGB will be used, because it's more flexible than HEX
      for (let i = 10; i <= 100; i += 10) {
        if (!result[actualName]) result[actualName] = {};
        if (i === 100) {
          result[actualName]["DEFAULT"] = `rgb(var(${cssVariableName}))`;
          continue;
        }
        result[actualName][i] = `rgb(var(${cssVariableName}-${i}))`;
      }
    }

    return result;
  }

  /**
   * Use this static method to set theme colors. It receives a array of string theme's property that has the
   * following format: `<name>:<value of color in scheme 1>:...:<value of color in scheme n>`, the order of
   * __value of color in theme__ depends on `themeNames`.
   *
   * `Scheme Order: light -> dark`
   *
   * This will create a `<style>` and an `colors` object.
   * @param colorStrs
   */
  static setTheme(
    theme: Theme,
    scheme: UColorSchemes,
    colors: { [K in ThemePropertyNames]: string }
  ) {
    if (!__AllowedThemeSchemes.includes(scheme)) {
      console.warn(`The scheme ${scheme} isn't supported`);
      return;
    }

    // Generate content for <style>
    // and generate colors object for tailwind
    let cssClassContent = `${Theme.getSchemeClassName(theme, scheme)} { }`;

    for (const colorName in colors) {
      if (!__ThemePropertyNames[colorName as keyof typeof colors]) continue;

      const actualName = __ThemePropertyNames[
          colorName as ThemePropertyNames
        ] as ThemePropertyNames,
        collection = Theme.getBrightnessCollectionOf(
          colors[colorName as keyof typeof colors]
        );

      if (!collection) {
        console.warn(
          "The brightness collection of " +
            colors[colorName as keyof typeof colors] +
            " doen't exists"
        );
        continue;
      }

      if (!actualName) {
        console.warn(
          `The name - ${colorName} that you assigned isn't a valid name`
        );
        continue;
      }

      for (const color of collection) {
        const cssVariableName =
          color.brightness === 100
            ? `--color-${actualName}`
            : `--color-${actualName}-${color.brightness}`;

        cssClassContent = cssClassContent.slice(0, cssClassContent.length - 1);
        cssClassContent =
          cssClassContent + cssVariableName + ": " + color.value + "; }";
      }
    }

    theme.themeSchemeCSSClasses.set(scheme, cssClassContent);
  }

  static initializeCSSVariables() {
    if (Theme.isThemePropertyVariablesInitialized) return;

    const headElement = document.getElementsByTagName("head")[0];
    const themeStyleElement = document.createElement("style");
    themeStyleElement.id = "__theme__";
    themeStyleElement.append(Theme.colorVariablesContent);
    headElement.appendChild(themeStyleElement);
  }

  static install(theme: Theme) {
    if (!document.getElementById(theme.name)) {
      const headElement = document.getElementsByTagName("head")[0];
      const themeStyleElement = document.createElement("style");
      themeStyleElement.id = theme.name;
      theme.themeSchemeCSSClasses.forEach((value) => {
        themeStyleElement.append(value);
      });
      headElement.appendChild(themeStyleElement);
    }
  }
}

export type UColorSchemes = (typeof __AllowedThemeSchemes)[number];
export type ThemePropertyNames = keyof typeof __ThemePropertyNames;
export type ThemeData = {
  colors: { [N in ThemePropertyNames]: string };
  styleContent: Array<string>;
  initializedStyleContent: string;
};
