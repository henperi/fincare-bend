import model from '../models';
import response from '../helpers/responses';
import FinAccountRepo from '../repository/FinAccountRepo';
import LoanTypeRepo from '../repository/LoanTypeRepo';
import CustomerRepo from '../repository/CustomerRepo';
import LoanRepo from '../repository/LoanRepo';

const { Loan, LoanGaurantor } = model;
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
      amount, loanRefNo, loanTypeName, purpose, gaurantorsArray,
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

      const { minimumAmount, maximumAmount } = finAccount;

      if (amount < minimumAmount) {
        return response.badRequest(res, {
          message: `Unable to process this loan application, as it is below the minimum loanable amount of ${minimumAmount}`,
        });
      }

      if (amount > maximumAmount) {
        return response.badRequest(res, {
          message: `Unable to process this loan application, as it is above the maximum loanable amount of ${minimumAmount}`,
        });
      }

      const newLoan = await Loan.create(
        {
          loanRefNo,
          amount: Number(amount),
          purpose,
          accountNumber,
          customerId,
          staffId,
          loanTypeId: loanType.id,
          Gaurantors: [...gaurantorsArray],
        },
        {
          include: [{ model: LoanGaurantor, as: 'Gaurantors' }],
        },
      );

      const message = 'Customer Loan has been created successfully';

      return response.created(res, { message, newLoan });
    } catch (error) {
      return response.internalError(res, { error });
    }
  }
}

export default LoanController;
