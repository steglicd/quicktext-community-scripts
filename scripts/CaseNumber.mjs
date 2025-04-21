export async function CaseNumber() {
    // create timestampID
    let date = new Date();

    let yy = date.getFullYear().toString().substr(2, 2);
    let mm = (date.getMonth() + 1).toString();
    let dd = date.getDate().toString();
    let hh = date.getHours().toString();
    let nn = date.getMinutes().toString();

    if (mm.length < 2) mm = "0" + mm;
    if (dd.length < 2) dd = "0" + dd;
    if (hh.length < 2) hh = "0" + hh;
    if (nn.length < 2) nn = "0" + nn;

    let timestampID = yy + mm + dd + hh + nn;

    // combine prefix and timestampID to the caseID if the variable was set
    let caseID = timestampID;
    if (this.quicktext.variables.length >= 1) caseID = this.quicktext.variables[0] + "-" + timestampID;

    // add caseID in front of the current subject
    let { subject } = await this.compose.getComposeDetails();
    subject = "[" + caseID + "] " + subject;
    await this.compose.setComposeDetails({ subject });

    return "Reference number: " + caseID + "\n";
}