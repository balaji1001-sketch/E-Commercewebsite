/**
 * main.js — the entry point that every page loads.
 *
 * Phase 1: it only runs a setup check.
 * Phase 3 onwards: it will render the shared navbar/footer and boot the
 * page-specific script.
 */

import { API_BASE_URL, USE_MOCK, APP_CONFIG } from "./api/config.js";

/** Marks a checklist row green. */
function pass(id) {
  document.getElementById(id)?.classList.add("is-ok");
}

function runSetupCheck() {
  // 1. HTML parsed — if this script runs at all, the file was found.
  pass("check-html");

  // 2. CSS: we read a custom property that only base.css defines.
  const cssToken = getComputedStyle(document.documentElement)
    .getPropertyValue("--css-loaded")
    .trim();
  if (cssToken === "1") pass("check-css");

  // 3. JS: this file executed.
  pass("check-js");

  // 4. ES modules: the import at the top succeeded, so config values exist.
  if (API_BASE_URL) pass("check-modules");

  const dump = document.getElementById("config-dump");
  if (dump) {
    dump.textContent = JSON.stringify(
      { USE_MOCK, API_BASE_URL, currency: APP_CONFIG.currency },
      null,
      2
    );
  }
}

// DOMContentLoaded = "the HTML is fully parsed and safe to touch".
document.addEventListener("DOMContentLoaded", runSetupCheck);
