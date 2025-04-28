/**
 * Add recipients to the mail. (similar to `[[HEADER|to|test@example.com]]`). A
 * type could be specified to add recipients to the `to`, `cc`, `bcc`, `reply-to`
 * area.
 * 
 * Usage:
 * 
 * Add recipients to `to`:
 * [[SCRIPT=AddRecipients|to|John Doe <john.doe@example.com>;Jane Doe <jane.doe@example.com>;test@example.com]]
 * 
 * Add recipients to `cc`, `bcc` and `reply-to`:
 * [[SCRIPT=AddRecipients|cc|John Doe <john.doe@example.com>]]
 * [[SCRIPT=AddRecipients|bcc|Jane Doe <jane.doe@example.com>]]
 * [[SCRIPT=AddRecipients|reply-to|test@example.com]]
 */
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