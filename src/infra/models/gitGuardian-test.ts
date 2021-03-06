import {TestLogger} from "../loggers/test-logger";

export interface GitGuardian extends WebdriverIO.Test {
  type: string;
  title: string;
  parent: string;
  fullTitle: string;
  pending: boolean;
  file: string;
  duration: number;
  currentTest: string;
  passed: boolean;
  testLogger: TestLogger;
}
