class CustomError extends Error {
	code: number;

	constructor(message: string, code: number) {
		super(message); // Call the parent constructor with the message
		this.code = code; // Add a custom property
	}
}

export default CustomError;
