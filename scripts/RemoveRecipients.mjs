export async function RemoveRecipients() {
    let type = this.quicktext.variables[0];
    let details = {}

    if (type == "to" || type == "all") {
        details.to = [];
    }

    if (type == "cc" || type == "all") {
        details.cc = [];
    }

    if (type == "bcc" || type == "all") {
        details.bcc = [];
    }

    if (type == "reply-to" || type == "all") {
        details.replyTo = [];
    }
    await this.compose.setComposeDetails(details);
}