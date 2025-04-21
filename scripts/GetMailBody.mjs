// This did not and does not return the headers!
export async function GetMailBody() {
    let { plainTextBody, body } = await this.compose.getComposeDetails();
    return this.quicktext.variables[0] == "text/html" ? body : plainTextBody;
}