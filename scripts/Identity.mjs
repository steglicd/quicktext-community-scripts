export async function Identity() {
    let action = this.quicktext.variables[0];
    let setIdentity = this.quicktext.variables[1];
    let result = "";

    function pretty(identity) {
        let label = identity.email;
        if (identity.label) {
            label = label + " (" + identity.label + ")"
        }
        return identity.id + " - " + label + "\r\n";
    }

    if (action == "getAllIdentities") {
        let identities = await this.identities.list();
        for (let identity of identities) {
            result += pretty(identity);
        }
        return result;
    }

    if (action == "getCurrentIdentity") {
        let { identityId } = await this.compose.getComposeDetails();
        let identity = await this.identities.get(identityId);
        result += pretty(identity);

        return result;
    }

    if (action == "setIdentity") {
        // Since switching the signature loses the caret position, we record it
        // and restore it later.

        // This only works for directly executed scripts, which run *in* the editor
        // window.
        //let selection = window.selection;
        //let range = selection.getRangeAt(0);
        //let start = range.startOffset;
        //let startNode = range.startContainer;

        await this.compose.setComposeDetails({
            isModified: false,
            identityId: setIdentity,
        })

        //selection.collapse(startNode, start);
    }
}