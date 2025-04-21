export async function OpenComposeWindow() {
    let subject = this.quicktext.variables[0];
    // TODO: Expose this.compose.begin*
    await this.compose.beginNew({
        subject
    });
}