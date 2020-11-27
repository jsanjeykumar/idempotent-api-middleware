interface PartnerWalletTransferParams {
    BankAccount: string
    U_IFSCCode: string
    TransferSum: number
    CashSum: number
    U_AccountNo: string
    VendorCode: string
    UUID: string
    //sap values
    CashAccount: any
    BankCode: any
    TransferAccount: any
    ControlAccount: any
    Remarks: any
    U_type: any
    wsaction: any

}
interface SapResponse {
    status: string
    result?: string
}

interface WalletTopUpAdhocParams {
    // sap hardcoded values
    wsaction: string
    Memo: string
    LineMemo: string
    LineMemo1: string

    RefDate: string
    TaxDate: string
    DueDate: string
    DebitAmount: number
    GLAccount: string
    CreditAmount1: number
    GLAccount1: string
    UUID: string
}

interface WalletTopUpWithDiscountAdhocParams {
    // sap hardcoded values
    wsaction: string
    Memo: string
    LineMemo: string
    LineMemo1: string

    RefDate: string
    TaxDate: string
    DueDate: string
    DebitAmount: number
    GLAccount: string
    CreditAmount1: number
    GLAccount1: string
    CreditAmount2: number
    GLAccount2: string
    UUID: string

}


export { PartnerWalletTransferParams, SapResponse, WalletTopUpAdhocParams, WalletTopUpWithDiscountAdhocParams }