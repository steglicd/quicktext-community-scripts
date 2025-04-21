export async function LastMonth() {
    const months = ["December", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November"];
    let date = new Date();
    return months[date.getMonth()];
}