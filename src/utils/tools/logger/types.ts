// types.ts
export type LogLevel = 'info' | 'success' | 'warn' | 'error' | 'debug' | string;
export type StyleConfig = string | Record<string, string>;
export type LoggerOptions<T extends LogLevel> = {
  prefix?: string;
  enabled?: boolean;
  useIcons?: boolean;
  timestamp?: boolean | (() => string);
  styles?: {
    prefix?: StyleConfig;
    content?: StyleConfig;
  };
  levels?: Record<T, {
    icon?: string;
    style?: StyleConfig;
    hidden?: boolean;
  }>;
  hooks?: {
    preLog?: (level: T, messages: unknown[]) => boolean | void;
    postLog?: (level: T, messages: unknown[]) => void;
  };
};