export class BooleanUtils {
  static isTruthy<T>(data?: T): data is T {
    return !BooleanUtils.isFalsy(data);
  }

  static isFalsy(data?: any) {
    return !data;
  }

  static isEmpty<T>(data?: T): data is undefined {
    switch (typeof data) {
      case "string": {
        return !data;
      }

      case "number": {
        return data === undefined || data === null || Number.isNaN(data);
      }

      case "object": {
        if (Array.isArray(data)) return data.length === 0;
        return Object.getOwnPropertyNames(data).length === 0;
      }

      case "undefined": {
        return true;
      }

      default:
        return data === undefined || data === null || false;
    }
  }
}
