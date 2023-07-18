import { ReactNode } from "react";


export interface IHomeContextProps {
    children: ReactNode
}

export interface IHomeContext {
    transactions: ITransactions[]
    setTransactions: React.Dispatch<React.SetStateAction<ITransactions[]>>
    listTransactionsByDate: (startDate: string, endDate: string) => Promise<void>
}

export interface ITransactions {
    id: number,
    dataTransferencia: string,
    valor: number,
    tipo: string,
    nomeOperadorTransacao: string | null,
    conta: {
        idConta: number,
        nomeResponsavel: string
    }
}