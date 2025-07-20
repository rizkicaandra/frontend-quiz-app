export function getTenNumbersFrom1To20(): number[] {
	const numbers = Array.from({ length: 20 }, (_, i) => i + 1);
	const shuffled = numbers.toSorted(() => Math.random() - 0.5);
	return shuffled.slice(0, 10);
}

export function numberToLetters(number: number): string {
	return String.fromCharCode(96 + number);
}
