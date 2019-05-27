/**
 * Method to update a fincare accounts ledger balance
 * @param {string} transactionType
 * @param {number} finAccount
 * @param {number} amount
 * @return {object} updatedAccount
 */
const updateLedgerBalance = (transactionType, finAccount, amount) => {
  let updatedAccount;
  if (transactionType === 'Credit') {
    updatedAccount = finAccount
      .update({
        ledgerBalance: Number(finAccount.ledgerBalance) + Number(amount),
        returning: true,
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  if (transactionType === 'Debit') {
    updatedAccount = finAccount
      .update({
        ledgerBalance: Number(finAccount.ledgerBalance) - Number(amount),
        returning: true,
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  return updatedAccount;
};

export default updateLedgerBalance;
