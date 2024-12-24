import type { LoginType } from "../types";
import { accRules, accountConfig, phoneConfig, phoneRules } from "../config";
export const getConfig = (type: LoginType) => (type === "accLogin" ? accountConfig : phoneConfig);
export const getRules = (type: LoginType) => (type === "accLogin" ? accRules : phoneRules);
