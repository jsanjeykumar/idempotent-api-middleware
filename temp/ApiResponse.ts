enum Status {
    OK = 'OK', NOT_OK = 'NOT_OK', PENDING = 'PENDING'
}
class ApiResponse<T> {
    private status: Status
    private description?: string
    private result?: T
    private steps?:string

    constructor(params: { status: Status, description?: string, result?: T , steps?:string }) { 

        let {
            status = Status.NOT_OK,
            description = undefined,
            result = undefined,
            steps = ""
        } = params;

        this.status = status;
        this.description = description;
        this.result = result
        this.steps = steps

    }
}
export { Status, ApiResponse }
