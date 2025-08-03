export async function ExtendSubject() {
    const getOrgHeader = (name) => {
        let rv = [];
        for (let [hName, hValue] of Object.entries(data.headers)) {
            if (name == hName) {
                rv.push(...hValue);
            }
        }
         return rv;
    }

    let { relatedMessageId } = await this.compose.getComposeDetails();
    let data = await this.messages.getFull(relatedMessageId);

    let subject = getOrgHeader("subject")
    let Prefix = this.quicktext.variables[0];
    let FullSubject = Prefix + " " + subject;
    await this.compose.setComposeDetails({ subject: FullSubject });
}
