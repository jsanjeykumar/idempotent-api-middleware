
export default class ApplicationError extends Error {
    public steps: string
    constructor(message: string, steps: string) {
        super(message);
        this.steps = steps
        Object.setPrototypeOf(this, ApplicationError.prototype);
    }
}

