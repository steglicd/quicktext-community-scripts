export async function SetSubject() {
    let subject = this.quicktext.variables[0];
    this.compose.setComposeDetails({ subject });
}