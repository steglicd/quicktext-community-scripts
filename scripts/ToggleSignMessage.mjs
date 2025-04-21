export async function ToggleSignMessage() {
    let type = this.quicktext.variables[0];
    let { selectedEncryptionTechnology } = await this.compose.getComposeDetails();
    if (!selectedEncryptionTechnology) {
        return;
    }

    let sign = selectedEncryptionTechnology.signMessage;
    if (!type) {
        // toggle
        selectedEncryptionTechnology.signMessage = !sign;
    } else if (type == "on") {
        selectedEncryptionTechnology.signMessage = true;
    } else {
        selectedEncryptionTechnology.signMessage = false;
    }
    await this.compose.setComposeDetails({ selectedEncryptionTechnology });
}