export async function SpellChecker() {
    let action = this.quicktext.variables[0];
    let languages = this.quicktext.variables[1];

    if (action == "getAllLanguages") {
        let spellChecker = await this.compose.getActiveDictionaries();
        return Object.keys(spellChecker).join(", ");
    }

    if (action == "getCurrentLanguage") {
        let spellChecker = await this.compose.getActiveDictionaries();
        return Object.entries(spellChecker).find(([k, v]) => !!v)[0]
    }

    if (action == "setLanguages") {
        await this.compose.setActiveDictionaries(languages.split(",").map(element => element.trim()));
    }
}