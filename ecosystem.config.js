module.exports = {
  apps: [
    {
      name: 'wallet-transfer',
      script: '.build/src/server.js',
      exec_mode: 'fork',
      watch: true,
      autorestart: true,
      time: true,
      env: {
        NODE_ENV: 'dev',
        PORT: 3095,
        GRAPHQL_HOST: 'https://dcore.olog.in/v1/graphql',
        GRAPHQL_SECRET: 'freightolog@123',
        PAYMENT_URL: 'http://devjava8.southeastasia.cloudapp.azure.com:8091/api/payment-service/',
        SAP_URL: 'http://devjava8.southeastasia.cloudapp.azure.com:8090/api/sap-service/',
        PARTNER_WALLET_URL: 'http://devjava11.southeastasia.cloudapp.azure.com:8031/partner-wallet/',
        SAP_B1IF_PARAMS: {
          CashAccount: '_SYS00000000266',
          BankCode: 'OBT002',
          TransferAccount: '_SYS00000000271',
          ControlAccount: '_SYS00000000218',
          wsaction: 'AddPayonAcc',
          Remarks: '0',
          U_type: '0',
          WALLET_ADHOC_WITHOUT_DISCOUNT_PARAMS: {
            wsaction: 'AddJE',
            Memo: 'Adhoc Payment',
            LineMemo: 'Adhoc Payment',
            LineMemo1: 'Adhoc Payment'
          },
          WALLET_ADHOC_WITH_DISCOUNT_PARAMS: {
            wsaction: 'AddJE1',
            Memo: 'Adhoc Payment',
            LineMemo: 'Adhoc Payment',
            LineMemo1: 'Adhoc Payment',
            LineMemo2: 'Adhoc Payment',
            GLAccount2: '_SYS00000000108'
          }
        }
      },
      env_prod: {
        NODE_ENV: 'prod',
        PORT: 3095,
        GRAPHQL_HOST: 'https://core.olog.in/v1/graphql',
        GRAPHQL_SECRET: 'freightolog@123',
        PAYMENT_URL: 'http://10.0.0.15:8091/api/payment-service/',
        SAP_URL: 'http://10.0.0.15:8090/api/sap-service/',
        PARTNER_WALLET_URL: 'http://10.0.0.14:8031/partner-wallet/',
        SAP_B1IF_PARAMS: {
          CashAccount: '_SYS00000000263',
          BankCode: 'OBT002',
          TransferAccount: '_SYS00000000271',
          ControlAccount: '_SYS00000000218',
          wsaction: 'AddPayonAcc',
          Remarks: '0',
          U_type: '0',
          WALLET_ADHOC_WITHOUT_DISCOUNT_PARAMS: {
            wsaction: 'AddJE',
            Memo: 'Adhoc Payment',
            LineMemo: 'Adhoc Payment',
            LineMemo1: 'Adhoc Payment'
          },
          WALLET_ADHOC_WITH_DISCOUNT_PARAMS: {
            wsaction: 'AddJE1',
            Memo: 'Adhoc Payment',
            LineMemo: 'Adhoc Payment',
            LineMemo1: 'Adhoc Payment',
            LineMemo2: 'Adhoc Payment',
            GLAccount2: '_SYS00000000108'
          }
        }
      }
    }
  ]
}
