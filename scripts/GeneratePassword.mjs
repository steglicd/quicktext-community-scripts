export async function GeneratePassword() {
    let password_length = 20;
    let password_chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.!?,;:-~+*=_/()[]{}#$@&%|'" + /* the chars '\' and '"' need to be escaped */ "\\\"";
    let password = '';

    if (this.quicktext.variables.length >= 1) password_length = this.quicktext.variables[0];
    if (this.quicktext.variables.length >= 2) password_chars = this.quicktext.variables[1];

    for (let i = 0; i < password_length; i++) {
        let position = Math.floor(Math.random() * password_chars.length);
        password += password_chars.substring(position, position + 1);
    }

    return "Password: " + password + "\n";
}