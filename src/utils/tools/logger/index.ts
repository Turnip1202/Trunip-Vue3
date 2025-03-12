import { LogLevel } from '@/types';

interface LogConfig {
    showTimestamp?: boolean;
    colorize?: boolean;
}

class Logger {
    private name: string;
    private config: LogConfig;

    constructor(name: string, config?: LogConfig) {
        this.name = name;
        this.config = {
            showTimestamp: true,
            colorize: true,
            ...config // 使用传入的配置覆盖默认配置
        };
    }

    // 为消息添加时间戳
    private timestamp(): string {
        if (!this.config.showTimestamp) return '';
        const now = new Date();
        return `[${now.toISOString()}]`;
    }

    // 根据不同级别设置不同的颜色
    private colorize(level: LogLevel, message: string): string {
        if (!this.config.colorize) return message;
        switch (level) {
            case 'debug':
                return `\x1b[36m${message}\x1b[0m`; // 青色
            case 'info':
                return `\x1b[32m${message}\x1b[0m`; // 绿色
            case 'warn':
                return `\x1b[33m${message}\x1b[0m`; // 黄色
            case 'error':
                return `\x1b[31m${message}\x1b[0m`; // 红色
            case 'fatal':
                return `\x1b[41m${message}\x1b[0m`; // 白字红底
            case 'success':
                return `\x1b[32;1m${message}\x1b[0m`; // 加粗绿色
            default:
                return message;
        }
    }

    private log(level: LogLevel, message: string): this {
        const coloredTimestamp = this.timestamp();
        const formattedMessage = `${coloredTimestamp} [${level.toUpperCase()}] (${this.name}): ${message}`;
        const output = this.config.colorize ? this.colorize(level, formattedMessage) : formattedMessage;
        switch (level) {
            case 'debug':
                console.debug(output);
                break;
            case 'info':
            case 'success': // 对于成功信息，使用console.log输出
                console.log(output);
                break;
            case 'warn':
                console.warn(output);
                break;
            case 'error':
            case 'fatal': // Fatal和Error都用console.error输出
                console.error(output);
                break;
        }
        return this; // 返回this以支持链式调用
    }

    public debug(message: string): this {
        return this.log('debug', message);
    }

    public info(message: string): this {
        return this.log('info', message);
    }

    public warn(message: string): this {
        return this.log('warn', message);
    }

    public error(message: string): this {
        return this.log('error', message);
    }

    public fatal(message: string): this {
        return this.log('fatal', message);
    }

    public success(message: string): this {
        return this.log('success', message);
    }
}

// 使用示例
export const logger = new Logger('Turnip', { showTimestamp: true, colorize: true });