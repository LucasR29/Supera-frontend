import { AxiosResponse } from 'axios';
import { api } from '../api';

export async function getTransactions(): Promise<AxiosResponse<any>> {
    const transactions = await api.get('/transferencias')

    return transactions
}

export async function getTransactionsByDate(startDate: string, endDate: string): Promise<AxiosResponse<any>> {
    const transactions = await api.get(`/transferencias/by-date?startDate=${startDate}&endDate=${endDate}`)

    return transactions
}