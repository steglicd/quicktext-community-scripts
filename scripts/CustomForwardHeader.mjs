export async function CustomForwardHeader() {
    // This re-implements get_orgheader.
    let { relatedMessageId } = await this.compose.getComposeDetails();
    let data = await this.messages.getFull(relatedMessageId);

    const getOrgHeader = (name) => {
        let rv = [];
        for (let [hName, hValue] of Object.entries(data.headers)) {
            if (name == hName) {
                rv.push(...hValue);
            }
        }
        return rv;
    }

    let originalSubject = getOrgHeader("subject")
    let originalFrom = getOrgHeader("from")
    let originalTo = getOrgHeader("to")
    let originalDate = new Date(Date.parse(getOrgHeader("date")));

    // options described here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };

    return "----- Original message -----\n" +
        "Subject: " + originalSubject + "\n" +
        "Date: " + originalDate.toLocaleDateString(undefined, options) + "\n" + // undefined instead of "en-EN" or "de-DE" should use the users language by default
        "From: " + originalFrom + "\n" +
        "To: " + originalTo + "\n";
}