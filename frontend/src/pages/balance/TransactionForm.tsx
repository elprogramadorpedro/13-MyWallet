import { FC, useState, FormEventHandler, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../../context/SessionContext";
import { FormError, ITransactionInput } from "../../global/types/forms.types";
import { submitTransactionForm, validateTransactionFormInput } from "../../global/utils/forms";
import TransactionFormDumb from "./TransactionFormDumb";

type TransactionInput = ITransactionInput;
type Props = {
    action: string;
    type: string;
};

const TransactionForm: FC<Props> = ({ action, type }) => {
    const { sessionInfo } = useContext(SessionContext);

    const navigate = useNavigate();
    const [transactionInfo, setTransactionInfo] = useState<TransactionInput>({
        value: "",
        description: "",
    });
    const [errorMessage, setErrorMessage] = useState<FormError>();

    const handleInput: FormEventHandler<HTMLInputElement> = (e) => {
        const inputInfo = e.currentTarget;
        transactionInfo[inputInfo.name as keyof TransactionInput] = inputInfo.value;
        setTransactionInfo(transactionInfo);
    };

    const handleSubmit: FormEventHandler<HTMLInputElement> = async (e) => {
        e.preventDefault();
        const inputError = validateTransactionFormInput(transactionInfo);
        if (inputError) return setErrorMessage(inputError);

        const isIncome = type === "income";
        const { error } = await submitTransactionForm(isIncome, transactionInfo, sessionInfo);
        if (error) return setErrorMessage(error.message);

        navigate("/balance");
    };

    return (
        <TransactionFormDumb
            action={action}
            type={type}
            handleInput={handleInput}
            handleSubmit={handleSubmit}
            errorMessage={errorMessage}
        />
    );
};

export default TransactionForm;
