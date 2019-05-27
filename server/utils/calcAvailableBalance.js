const calcAvailableBalance = finAccount => finAccount.ledgerBalance - finAccount.outstandingBalance;
export default calcAvailableBalance;
