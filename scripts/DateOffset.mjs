export async function DateOffset() {
    // default values for this.quicktext.variables
    if (this.quicktext.variables.length < 1) this.quicktext.variables[0] = "0"; // number of months to add or subtract
    if (this.quicktext.variables.length < 2) this.quicktext.variables[1] = "0"; // number of days to add or subtract
    if (this.quicktext.variables.length < 3) this.quicktext.variables[2] = "short"; // format to use


    // get the current date with an offset (specified by the this.quicktext.variables)
    let date = new Date();
    let dayOffset = date.getDate() - 1;
    let dateOffset = new Date(date.getFullYear(), date.getMonth(), 1);
    dateOffset.setMonth(dateOffset.getMonth() + parseInt(this.quicktext.variables[0]));
    dateOffset.setDate(dateOffset.getDate() + dayOffset + parseInt(this.quicktext.variables[1]));


    // options described here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    let options = { year: "numeric", month: "long", day: "numeric" };
    if (this.quicktext.variables[2].toLowerCase() == "numeric") options = { year: "numeric", month: "2-digit", day: "2-digit" };
    if (this.quicktext.variables[2].toLowerCase() == "short") options = { year: "numeric", month: "long", day: "numeric" };
    if (this.quicktext.variables[2].toLowerCase() == "long") options = { weekday: "long", year: "numeric", month: "long", day: "2-digit" };
    if (this.quicktext.variables[2].toLowerCase() == "yearmonth") options = { year: "numeric", month: "long" };
    if (this.quicktext.variables[2].toLowerCase() == "year") options = { year: "numeric" };
    if (this.quicktext.variables[2].toLowerCase() == "monthname") options = { month: "long" };
    if (this.quicktext.variables[2].toLowerCase() == "weekday") options = { weekday: "long" };


    // return result; undefined instead of "en-EN" or "de-DE" should use the users language by default
    return dateOffset.toLocaleDateString(undefined, options);
}