export async function AddRecipients() {
    let type = this.quicktext.variables[0];
    let adresses = this.quicktext.variables[1].split(';');

    if (!type || !["to", "cc", "bcc", "reply-to"].includes(type)) {
        return;
    }

    if (type == "reply-to") {
        type = "replyTo";
    }

    let details = await this.compose.getComposeDetails();
    let recipients = new Set([...details[type], ...adresses].map(e => e.trim()));
    await this.compose.setComposeDetails({
        [type]: Array.from(recipients)
    });
}