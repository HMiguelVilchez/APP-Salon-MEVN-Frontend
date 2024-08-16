export const formatCurrency = price => {
    return Number(price).toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP'
    });
}