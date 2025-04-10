export function calculateCourierCharges(weight) {
    if (weight <= 200) return 5;
    if (weight <= 500) return 10;
    if (weight <= 1000) return 15;
    return 20
}
