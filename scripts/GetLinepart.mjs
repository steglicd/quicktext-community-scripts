export async function GetLinepart() {
    let prefix = this.quicktext.variables[0] || "";
    let suffix = this.quicktext.variables[1] || "";

    let { plainTextBody } = await this.compose.getComposeDetails();
    let result = plainTextBody.match(prefix + "(.*)" + suffix);

    return result[1];
}