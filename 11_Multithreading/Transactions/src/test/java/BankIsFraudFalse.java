public class BankIsFraudFalse extends Bank {


    @Override
    public synchronized boolean isFraud(String fromAccountNum, String toAccountNum, long amount) throws InterruptedException {
        return false;
    }
}
