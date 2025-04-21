"use strict";

// Classes to provide the same environment as directly executed scripts.

export class Compose {
  #tabId;

  constructor(tabId) {
    this.#tabId = tabId
    for (let func of [
      "getComposeDetails",
      "setComposeDetails",
      "addAttachment",
      "removeAttachment",
      "updateAttachment",
      "getAttachmentFile",
      "listAttachments",
      "getActiveDictionaries",
      "setActiveDictionaries",
      "beginNew",
      "beginForward",
      "beginReply",
    ]) {
      this[func] = function (...params) {
        return browser.compose[func](this.#tabId, ...params);
      }
    }
  }
}

export class Identities {
  constructor() {
    for (let func of [
      "get",
      "getDefault",
      "list"
    ]) {
      this[func] = function (...params) {
        return browser.identities[func](...params);
      }
    }
  }
}

export class Messages {
  constructor() {
    for (let func of [
      "get",
      "getFull",
      "getRaw",
      "listAttachments",
      "listInlineTextParts",
      "getAttachmentFile"
    ]) {
      this[func] = function (...params) {
        return browser.messages[func](...params);
      }
    }
  }
}

export class Quicktext {
  #tabId;
  #variables;
  #port;

  constructor(tabId, variables, port) {
    this.#port = port
    this.#tabId = tabId;
    this.#variables = variables;
  }

  get tabId() {
    return this.#tabId;
  }
  get variables() {
    return this.#variables;
  }
  async processTag(tag, ...variables) {
    let transmission = Promise.withResolvers();
    let listener = info => {
      if (info.command == "processedTag") {
        transmission.resolve(info.processedTag);
      }
    };

    this.#port.onMessage.addListener(listener);
    this.#port.postMessage({ command: "processTag", tag, variables })
    let rv = await transmission.promise;
    this.#port.onMessage.removeListener(listener);
    return rv;
  }
  async getTag(tag, ...variables) {
    let transmission = Promise.withResolvers();
    let listener = info => {
      if (info.command == "gotTag") {
        transmission.resolve(info.gotTag);
      }
    };

    this.#port.onMessage.addListener(listener);
    this.#port.postMessage({ command: "getTag", tag, variables })
    let rv = await transmission.promise;
    this.#port.onMessage.removeListener(listener);
    return rv;
  }
}