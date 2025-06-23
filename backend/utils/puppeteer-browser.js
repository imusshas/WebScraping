import { mkdtempSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import puppeteerExtra from "puppeteer-extra";
import Stealth from "puppeteer-extra-plugin-stealth";

const userDataDir = mkdtempSync(path.join(tmpdir(), 'puppeteer-profile-'));
puppeteerExtra.use(Stealth())
export {puppeteerExtra, userDataDir}
