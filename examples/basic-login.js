/**
 * basic-login.js — Basic login example for Yardi Voyager
 * Open Source: runs with local Puppeteer (no cloud required)
 *
 * Usage:
 *   cp .env.example .env   # Fill in your credentials
 *   node examples/basic-login.js
 */
'use strict';

require('dotenv').config();
const { createSession } = require('../src/auth');
const { login_yardi } = require('../src/actions');
const { log } = require('../src/utils');

async function main() {
  let page;

  try {
    log('Starting Yardi Voyager automation (Open Source mode)');

    // Create authenticated session
    // Handles: SSO redirect, MFA/TOTP, session persistence
    page = await createSession({
      headless: process.env.HEADLESS !== 'false', // set HEADLESS=false to see browser
    });

    log('Authenticated successfully');

    // Run your first action
    const result = await login_yardi(page, {
      // Add options specific to this action
    });

    log('Result:', result);

    // Add more actions here:
    // const data = await extract_rent_roll(page, {});
    // log('Data:', data);

  } catch (err) {
    console.error('Error:', err.message);
    if (page) {
      await page.screenshot({ path: `error-${Date.now()}.png` }).catch(() => {});
    }
    process.exit(1);
  } finally {
    if (page) {
      const browser = page.browser();
      await browser.close();
    }
  }
}

main();
