/* eslint-disable default-case */
/* eslint-disable prettier/prettier */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: "income" | "outcome";
}


class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    // [ ---- Solução do curso/professor ---- ]
    const { income, outcome } = this.transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        switch( transaction.type ){
          case "income":
            accumulator.income += transaction.value;
            break;

          case "outcome":
            accumulator.outcome += transaction.value;
            break;

          default:
            break;
        }

        return accumulator;
    },{
      income:0,
      outcome:0,
      total:0
    })


    // [ ---- Minha solução, muito mais legível ---- ]
    // const newIncome = this.transactions.reduce((acumulator, currentValue)=> (currentValue.type === 'income' ? acumulator + currentValue.value : acumulator),0);
    // const newOutCome = this.transactions.reduce((acumulator, currentValue)=> (currentValue.type === 'outcome' ? acumulator + currentValue.value : acumulator),0);

    // const newbalance = {
    //   income: newIncome,
    //   outcome: newOutCome,
    //   total: newIncome - newOutCome,
    // };

    // return newBalance;

    const total = income - outcome;
    
    return { income, outcome, total};
  }

  public create({title ,value, type}: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({title, type, value});

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
