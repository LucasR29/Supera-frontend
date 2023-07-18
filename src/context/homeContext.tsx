import { createContext, useEffect, useState } from "react";
import { IHomeContext, IHomeContextProps, ITransactions } from "./homeTypes";
import { getTransactions, getTransactionsByDate } from "../services/getTransactions/getTransactions";

export const HomeContext = createContext({} as IHomeContext)

export const HomeProvider = ({ children }: IHomeContextProps) => {
    const [transactions, setTransactions] = useState<ITransactions[]>([])
    const [filterTransactions, setFilterTransactions] = useState<ITransactions[]>([])

    useEffect(() => {
        const listTransactions = async () => {
            const { data } = await getTransactions()

            setTransactions(data)
        }

        listTransactions()
    }, [])

    async function listTransactionsByDate(startDate: string, endDate: string) {
        const { data } = await getTransactionsByDate(startDate, endDate)

        setFilterTransactions(data)
    }

    const globalHomeValues: IHomeContext = {
        transactions: transactions,
        setTransactions: setTransactions,
        listTransactionsByDate: listTransactionsByDate,
        filterTransactions: filterTransactions,
        setFilterTransactions: setFilterTransactions
    }

    return (
        <HomeContext.Provider value={globalHomeValues}>
            {children}
        </HomeContext.Provider>
    )
}