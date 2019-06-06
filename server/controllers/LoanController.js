import response from '../helpers/responses';
import FinAccountRepo from '../repository/FinAccountRepo';
import LoanTypeRepo from '../repository/LoanTypeRepo';
import CustomerRepo from '../repository/CustomerRepo';
import LoanRepo from '../repository/LoanRepo';
/**
 * Controller to handle neccessary loan requests
 */
class LoanController {
  /**
   * Method to create a loan
   * @param {object} req with Request Object
   * @param {object} res Response Object
   * @return {object} JSON response
   */
  static async createLoan(req, res) {
    const {
      requestAmount, loanRefNo, loanTypeName, purpose, gaurantorsArray, duration,
    } = req.body;

    const { customerId, accountNumber } = req.params;
    const { id: staffId } = res.locals.user;

    try {
      const findLoanType = () => LoanTypeRepo.getByName(loanTypeName);
      const findFinAccount = () => FinAccountRepo.getByAccountNumber(accountNumber);
      const findCustomer = () => CustomerRepo.getById(customerId);
      const findLoan = () => LoanRepo.getByLoanRefNo(loanRefNo);

      const [loanType, finAccount, customer, loan] = await Promise.all([
        findLoanType(),
        findFinAccount(),
        findCustomer(),
        findLoan(),
      ]);

      if (!loanType) {
        return response.notFound(res, {
          message: 'The loan type name sent does not exist',
        });
      }

      if (!finAccount) {
        return response.notFound(res, {
          message: 'This fincare accountNumber does not exist',
        });
      }

      if (!customer) {
        return response.notFound(res, {
          message: 'There is no customer with such an id',
        });
      }

      if (finAccount.customerId !== Number(customerId)) {
        return response.notFound(res, {
          message: 'This customerId does not match the financial account holder',
        });
      }

      if (loan) {
        return response.notFound(res, {
          message: 'Another loan has already been created with this loan ref number',
        });
      }

      const { minimumAmount, maximumAmount } = loanType;

      if (Number(requestAmount) < Number(minimumAmount)) {
        return response.badRequest(res, {
          message: `Unable to process this loan application, as it is below the minimum loanable amount of ${minimumAmount}`,
        });
      }

      if (Number(requestAmount) > Number(maximumAmount)) {
        return response.badRequest(res, {
          message: `Unable to process this loan application, as it is above the maximum loanable amount of ${maximumAmount}`,
        });
      }

      const loanDetails = {
        loanRefNo,
        duration,
        purpose,
        accountNumber,
        customerId,
        staffId,
        gaurantorsArray,
        requestAmount: Number(requestAmount),
        loanTypeId: loanType.id,
      };

      const newLoan = await LoanRepo.createLoan(loanDetails);
      const message = 'Customer Loan has been created successfully';

      return response.created(res, { message, newLoan });
    } catch (error) {
      return response.internalError(res, { error });
    }
  }

  /**
   * Method to approve a loan request
   * @param {object} req with Request Object
   * @param {object} res Response Object
   * @return {object} JSON response
   */
  static async approveLoan(req, res) {
    const { approvedAmount } = req.body;
    const { customerId, loanRefNo } = req.params;
    const findLoan = () => LoanRepo.getByLoanRefNo(loanRefNo);
    const findCustomer = () => CustomerRepo.getById(customerId);

    try {
      const [loan, customer] = await Promise.all([findLoan(), findCustomer()]);

      if (!loan) {
        return response.notFound(res, {
          message: 'There is no loan with such a loanRefNo',
        });
      }
      if (!customer) {
        return response.notFound(res, {
          message: 'There is no customer with such an id',
        });
      }

      const {
        requestAmount,
        LoanType: { minimumAmount, maximumAmount },
      } = loan;

      if (Number(approvedAmount) < Number(minimumAmount)) {
        return response.badRequest(res, {
          message: `Unable to complete this loan approval, approvedAmount should be equal or greater than the minimum loanable amount of N${minimumAmount}`,
        });
      }

      if (Number(approvedAmount) > Number(maximumAmount)) {
        return response.badRequest(res, {
          message: `Unable to complete this loan approval, approvedAmount should be equal or less than the maximum loanable amount of N${maximumAmount}`,
        });
      }

      if (Number(approvedAmount) > Number(requestAmount)) {
        return response.badRequest(res, {
          message: `Unable to complete this loan approval, approvedAmount should be equal or less than the requested amount of N${requestAmount}`,
        });
      }

      if (['approved', 'rejected'].includes(loan.approvalStatus)) {
        return response.badRequest(res, {
          message: `Unable to complete this loan approval request as it has already been ${
            loan.approvalStatus
          }`,
        });
      }

      const { repayments, totalPaybackAmount, numberOfPayments } = await LoanRepo.approveLoan(
        loan,
        approvedAmount,
      );
      const message = 'Loan has been approved successfully and the repayment dates have been calculated';

      return response.success(res, {
        message,
        loanRefNo,
        requestAmount,
        approvedAmount,
        totalPaybackAmount,
        numberOfPayments,
        repayments,
      });
    } catch (error) {
      return response.internalError(res, { error });
    }
  }

  /**
   * Method to approve a loan request
   * @param {object} req with Request Object
   * @param {object} res Response Object
   * @return {object} JSON response
   */
  static async rejectLoan(req, res) {
    const { customerId, loanRefNo } = req.params;
    const findLoan = () => LoanRepo.getByLoanRefNo(loanRefNo);
    const findCustomer = () => CustomerRepo.getById(customerId);

    try {
      const [loan, customer] = await Promise.all([findLoan(), findCustomer()]);

      if (!loan) {
        return response.notFound(res, {
          message: 'There is no loan with such a loanRefNo',
        });
      }
      if (!customer) {
        return response.notFound(res, {
          message: 'There is no customer with such an id',
        });
      }
      if (['approved', 'rejected'].includes(loan.approvalStatus)) {
        return response.badRequest(res, {
          message: `Unable to complete this loan rejection request as it has already been ${
            loan.approvalStatus
          }`,
        });
      }

      const rejecetedLoan = await LoanRepo.rejectLoan(loan);
      const message = 'Loan has been rejected successfully';

      return response.success(res, { message, loanRefNo, rejecetedLoan });
    } catch (error) {
      return response.internalError(res, { error });
    }
  }

  /**
   * Method to fetch all loans
   * @param {object} req with Request Object
   * @param {object} res Response Object
   * @return {object} JSON response
   */
  static async fetchAllLoans(req, res) {
    const { applyPagination, paginationData } = res.locals;
    try {
      const { count, rows: allLoans, cache } = await LoanRepo.getAll(
        applyPagination,
        req.originalUrl,
      );

      const message = 'Array of 0 or more loans has been fetched successfully';
      const metaData = { count, ...paginationData };

      return response.success(res, {
        message,
        allLoans,
        metaData,
        cache,
      });
    } catch (error) {
      return response.internalError(res, { error });
    }
  }

  /**
   * Method to fetch a loan by its loanRefNO
   * @param {object} req with Request Object
   * @param {object} res Response Object
   * @return {object} JSON response
   */
  static async fetchLoanById(req, res) {
    const { loanId } = req.params;
    try {
      const loan = await LoanRepo.getById(loanId);

      if (!loan) {
        return response.notFound(res, {
          message: 'There is no loan with such a loanRefNo',
        });
      }

      const message = 'Loan has been fetched successfully';

      return response.success(res, { message, loan });
    } catch (error) {
      return response.internalError(res, { error });
    }
  }
}

export default LoanController;
