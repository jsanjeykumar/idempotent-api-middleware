
enum PARTNER_STATUS {
    VERIFICATION = 'verfication',
    ACTIVE = 'Active',
    RE_VERIFICATION = 'Reverification',
    DE_ACTIVATE = 'De-activate',
    BLACKLISTED = 'Blacklisted'
}
enum TRANSACTION {
    MINIMUM_AMOUNT = 10.00,
    MAXIMUM_AMOUNT = 200000.00,
    MINIMUM_DEDUCTION_FEE = 5
}
enum MEMBERSHIP {
    SILVER = 'Silver',
    GOLD = 'Gold',
    PLATINUM = 'Platinum'
}
enum CONFIG {
    TRANSACTION_DOWNTIME = 'transaction_downtime'
}
enum DISCOUNT_PERCENTAGE {
    TWO_PERCENTAGE = 2,
    ZERO_PERCENTAGE = 0
}
export { PARTNER_STATUS, TRANSACTION, MEMBERSHIP, CONFIG, DISCOUNT_PERCENTAGE };