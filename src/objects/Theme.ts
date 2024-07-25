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
      for (let i = 0; i <= 100; i += 10) {
        if (!result[actualName]) result[actualName] = {};
        if (i === 100) {
          result[actualName]["DEFAULT"] = `rgba(var(${cssVariableName}), ${
            i / 100
          })`;
          continue;
        }
        result[actualName][i] = `rgba(var(${cssVariableName}), ${i / 100})`;
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
      ] as ThemePropertyNames;

      if (!actualName) {
        console.error(
          `The name - ${colorName} that you assigned isn't a valid name`
        );
        continue;
      }

      const cssVariableName = `--color-${actualName}`;

      cssClassContent = cssClassContent.slice(0, cssClassContent.length - 1);
      cssClassContent =
        cssClassContent +
        cssVariableName +
        ": " +
        colors[colorName as keyof typeof colors] +
        "; }";
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
