export async function ToFirstOrLastname() {
    let data = await this.quicktext.processTag("to");

    // use lastname if firstname is not available
    if (typeof data['firstname'] == 'undefined') {
        data['firstname'] = [];
    }
    for (let i = 0; i < data['lastname'].length; i++) {
        if (typeof data['firstname'][i] == 'undefined' || data['firstname'][i] == '') {
            data['firstname'][i] = data['lastname'][i];
        }
    }

    if (typeof data['firstname'] != 'undefined') {
        if (this.quicktext.variables.length < 1) this.quicktext.variables[0] = ", ";
        return data['firstname'].join(this.quicktext.variables[0].replace(/\\n/g, "\n").replace(/\\t/g, "\t"));
    }
}