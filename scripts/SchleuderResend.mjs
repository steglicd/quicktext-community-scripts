export async function SchleuderResend() {
    let { relatedMessageId } = await this.compose.getComposeDetails();
    // Instead of parsing the raw message for headers, better use getFull to get the individual parsed headers.
    let text = await this.messages.getRaw(relatedMessageId).then(t => t.replaceAll("\r\n", "\n"));

    let resentLines = text.match(/Resent: .*\n/g)
    let fromLines = text.match(/From: .*\n/g)
    let toLines = text.match(/To: .*\n/g)
    let ccLines = text.match(/Cc: .*\n/g)

    let headerLines = []

    if (resentLines != null) { headerLines = headerLines.concat(resentLines) }
    if (fromLines != null) { headerLines = headerLines.concat(fromLines[0].split(",")) }
    if (toLines != null) { headerLines = headerLines.concat(toLines[0].split(",")) }
    if (ccLines != null) { headerLines = headerLines.concat(ccLines[0].split(",")) }

    let resentEmails = [];

    for (let elem in headerLines) {
        if (headerLines[elem] == null) { continue };

        // Match all possible email in the string
        let emails = headerLines[elem].match(/\S+@\S+\.\S+/g)
        if (emails == null) { continue };

        emails = emails.map(sanitizeMail)

        for (let email in emails) {
            resentEmails.push("x-resend: ".concat(emails[email]))
        }
    }
    return resentEmails.join("\n")

    function sanitizeMail(value) {
        return value.replace(/</g, '').replace(/>/g, '').replace(/"/g, '')
    }
}