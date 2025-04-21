"use strict";

import * as scopes from "./scope.mjs"
import { SCRIPTS } from "../list-of-scripts.mjs"

browser.runtime.onConnectExternal.addListener(port => {
  port.onMessage.addListener(async info => {
    // Reject message if it it not from Quicktext.
    if (port.sender.id != "{8845E3B3-E8FB-40E2-95E9-EC40294818C4}") {
      return;
    }

    if (info.command == "evaluateScript") {
      let { tabId, scriptName, scriptArgs } = info;
      if (!SCRIPTS[scriptName]) {
        return;
      }
      let script = await import(`../scripts/${SCRIPTS[scriptName]}`)
        .then(imported => imported[scriptName]);

      if (!script) {
        return;
      }

      let scope = {
        quicktext: new scopes.Quicktext(tabId, scriptArgs, port),
        // These scopes map some WebExtension APIs into this.*, so they can be
        // accessed as this.compose.* etc.
        // This is optional and you can use the real APIs instead (browser.compose.*).
        // The reason this is here is: You might copy scripts from elsewhere which
        // were written to be run in Quicktext directly and therefore *do* need
        // these wrappers, as they cannot access most of the browser.* namespace.
        // Such a script will fail if run inside this add-on, if these scopes
        // are not provided and the script is not modified to use browser.* instead
        // of this.*
        compose: new scopes.Compose(tabId),
        messages: new scopes.Messages(),
        identities: new scopes.Identities(),
      }
      let evaluatedScript = await script.call(scope);
      port.postMessage({ command: "evaluatedScript", evaluatedScript });
    }
  });
})

