export function money(n) {
    try {
        return new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(n);
    } catch {
        return "S/" + n;
    }
}

export function classNames(...arr) {
    return arr.filter(Boolean).join(" ");
}
