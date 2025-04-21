export async function ToNickname() {
    let data = await this.quicktext.processTag("to");

    // use name if nickname is not available
    if (typeof data['nickname'] == 'undefined') {
        data['nickname'] = [];
    }
    for (let i = 0; i < data['firstname'].length; i++) {
        if (typeof data['nickname'][i] == 'undefined') {
            data['nickname'][i] = data['firstname'][i];
        }
    }

    if (typeof data['nickname'] != 'undefined') {
        if (this.quicktext.variables.length < 1) this.quicktext.variables[0] = ", ";
        return data['nickname'].join(this.quicktext.variables[0].replace(/\\n/g, "\n").replace(/\\t/g, "\t"));
    } else return "";
}