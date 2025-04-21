export async function CleanSubject() {
    // get subject from email if possible
    let { subject } = await this.compose.getComposeDetails();

    // detect first prefix
    let firstPrefix = "";
    if (subject.toLowerCase().startsWith("re: ")) firstPrefix = "Re: ";
    if (subject.toLowerCase().startsWith("fwd: ")) firstPrefix = "Fwd: ";

    // search and remove all prefixes
    let previousLength = 0;
    while (previousLength != subject.length) { // repeat the process if something gets shortened
        previousLength = subject.length;

        subject = subject.replace(/^(re:\s|r:\s|aw:\s|antw:\s|antwort:\s)/i, "");              // replace "Re: ", "R: ", "Aw: ", "Antw: ", "Antwort: "
        subject = subject.replace(/^(fwd:\s|fw:\s|wg:\s|wt:\s|wtrlt:\s)/i, "");                // replace "Fwd: ", "Fw: ", "Wg: ", "Wt: ", "Wtrlt: "
        subject = subject.replace(/^(Re-\d:\s|Re\[\d\]:\s)/i, "");                             // replace "Re-1: ", "Re-2: ", "Re[1]: ", "Re[2]: "
        subject = subject.replace(/^(\*\*\*\*SPAM\*\*\*\*\s|\[SPAM\]\s|\[SPAM\?\s\]\s)/i, ""); // replace "****Spam**** ", "[Spam] ", "[Spam? ] "
        subject = subject.replace(/^(Automatische Antwort:\s)/i, "");                          // replace "Automatische Antwort: "
        subject = subject.replace(/^(\[Extern]\s-\s|\[Extern]\s|\[Extern]:\s|Extern:\s)/i, ""); // replace "[Extern] - ", "[Extern] ", "[Extern]: ", "Extern: "
        subject = subject.replace(/^(\[Probable Suspicious URLs\]\s)/i, "");                    // replace "[Probable Suspicious URLs] "
        subject = subject.trim();
    }

    // reuse first prefix and change subject
    await this.compose.setComposeDetails({ subject: firstPrefix + subject });
}