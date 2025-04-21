export async function GoodMorning() {
    let date = new Date();
    if (date.getHours() < 5) return "Good night";
    if (date.getHours() < 12) return "Good morning";
    if (date.getHours() < 16) return "Good afternoon";
    if (date.getHours() < 21) return "Good evening";

    return "Good night";
}