export async function GetRecipients() {
    let result = "";

    let { to, cc, bcc, replyTo } = await this.compose.getComposeDetails();

    for (let toAddress of to) {
        result += "To: " + toAddress + "\r\n";
    }

    for (let ccAddress of cc) {
        result += "CC: " + ccAddress + "\r\n";
    }

    for (let bccAddress of bcc) {
        result += "BCC: " + bccAddress + "\r\n";
    }

    for (let replyToAddress of replyTo) {
        result += "Reply to: " + replyToAddress + "\r\n";
    }

    return result;
}