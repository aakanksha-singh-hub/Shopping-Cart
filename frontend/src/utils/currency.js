export function formatCurrency(amount) {
  try {
    const value = Number(amount) || 0;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  } catch (e) {
    return `₹${(Number(amount) || 0).toFixed(2)}`;
  }
}


