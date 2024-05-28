export function formatCurrency(amount: number | string): string {
	// Set currency options for Nigerian Naira
	const options: Intl.NumberFormatOptions = {
		style: 'currency',
		currency: 'NGN',
	};

	// Format the currency using toLocaleString method
	const formattedCurrency: string = Number(amount).toLocaleString('en-NG', options);

	return formattedCurrency;
}