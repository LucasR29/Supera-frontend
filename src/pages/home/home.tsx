import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
    Box,
    Text,
    Input,
    Button,
    Select
} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { HomeContext } from '../../context/homeContext'



export const HomePage = () => {
    const { transactions, listTransactionsByDate, filterTransactions } = useContext(HomeContext)
    const [account, setAccount] = useState<string>()
    const [startDate, setStartDate] = useState<string>("1000-01-01")
    const [endDate, setEndDate] = useState<string>("4000-01-01")
    const [name, setName] = useState<string>("")
    const [total, setTotal] = useState<number | string>("Nenhuma conta selecionada")
    const [partial, setPartial] = useState<number | string>('Nenhuma conta selecionada')

    const accounts = new Set<number>()

    transactions.forEach((x) => {
        accounts.add(x.conta?.idConta)
    })

    const sumTotal = (account: string) => {
        console.log(account.length)
        if (account) {
            let sum = 0
            transactions.forEach((x) => {
                if (x.conta.idConta.toString() == account) {
                    sum += x.valor
                }
            })
            setTotal(sum)
        } else {
            setTotal("Nenhuma conta selecionada")
        }
    }

    const sumPartial = (account: string | undefined) => {
        if (account) {
            if (filterTransactions.length > 0) {
                let sum = 0
                filterTransactions.forEach((x) => {
                    if (x.conta.idConta.toString() == account) {
                        sum += x.valor
                    }
                })
                setPartial(sum)
            } else {
                let sum = 0
                transactions.forEach((x) => {
                    if (x.conta.idConta.toString() == account) {
                        sum += x.valor
                    }
                })
                setPartial(sum)
            }
        } else {
            setPartial("Nenhuma conta selecionada")
        }
    }

    const handleAccountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedAccount = event.target.value;

        sumTotal(selectedAccount)
        sumPartial(selectedAccount)
        setAccount(selectedAccount)
    }

    const handleStartChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const start = event.target.value;

        setStartDate(start)
    }

    const handleEndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const end = event.target.value;

        setEndDate(end)
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const n = event.target.value;

        setName(n)
    }

    return (
        <Box>
            <Box width={"85%"} margin={"auto"}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Box>
                        <Text marginBottom={"15px"}>
                            Data de início
                        </Text>
                        <Input onChange={handleStartChange} type="date" />
                    </Box>
                    <Box>
                        <Text marginBottom={"15px"}>
                            Data de Fim
                        </Text>
                        <Input onChange={handleEndChange} type="date" />
                    </Box>
                    <Box>
                        <Text marginBottom={"15px"}>
                            Nome do Operador transacionado
                        </Text>
                        <Input onChange={handleNameChange} />
                    </Box>
                </Box>

                <Box display={"flex"} justifyContent={"space-between"} marginTop={"20px"} marginBottom={"30px"}>
                    <Select width={"215px"} placeholder='selecione a conta' onChange={handleAccountChange}>
                        {
                            Array.from(accounts).map((x, index) => {
                                return (
                                    <option value={x} key={index} >{x}</option>
                                )
                            })
                        }
                    </Select>
                    <Button onClick={() => {
                        listTransactionsByDate(startDate.split("T")[0], endDate.split("T")[0])
                        sumPartial(account)
                    }}>Pesquisar</Button>
                </Box>

                <TableContainer>
                    <Table variant='striped' size='sm'>
                        <Thead>
                            <Tr>
                                <Th>Saldo Total: {total}</Th>
                                <Th>Saldo no periodo: {partial}</Th>
                            </Tr>
                            <Tr borderWidth={'2px'}>
                                <Th borderWidth={'2px'}>Dados</Th>
                                <Th borderWidth={'2px'}>Valencia</Th>
                                <Th borderWidth={'2px'}>Tipo</Th>
                                <Th borderWidth={'2px'}>Nome do operador transacionado</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {filterTransactions.length > 0 ?
                                filterTransactions?.map((x, index) => {
                                    if (account) {
                                        if (x.conta.idConta.toString() == account && name == "") {
                                            return (
                                                <Tr key={index}>
                                                    <Td borderWidth={'2px'}>{x.dataTransferencia.split("T")[0].split("-").reverse().join("/")}</Td>
                                                    <Td borderWidth={'2px'}>{x.valor}</Td>
                                                    <Td borderWidth={'2px'}>{x.tipo}</Td>
                                                    <Td borderWidth={'2px'}>{x.nomeOperadorTransacao}</Td>
                                                </Tr>
                                            )
                                        } else if (x.conta.idConta.toString() == account && x.nomeOperadorTransacao?.toLowerCase().includes(name.toLowerCase())) {
                                            return (
                                                <Tr key={index}>
                                                    <Td borderWidth={'2px'}>{x.dataTransferencia.split("T")[0].split("-").reverse().join("/")}</Td>
                                                    <Td borderWidth={'2px'}>{x.valor}</Td>
                                                    <Td borderWidth={'2px'}>{x.tipo}</Td>
                                                    <Td borderWidth={'2px'}>{x.nomeOperadorTransacao}</Td>
                                                </Tr>
                                            )
                                        }
                                    } else if (x.tipo != "DEPOSITO" && x.tipo != "SAQUE") {
                                        if (name == "none") {
                                            return (
                                                <Tr key={index}>
                                                    <Td borderWidth={'2px'}>{x.dataTransferencia.split("T")[0].split("-").reverse().join("/")}</Td>
                                                    <Td borderWidth={'2px'}>{x.valor}</Td>
                                                    <Td borderWidth={'2px'}>{x.tipo}</Td>
                                                    <Td borderWidth={'2px'}>{x.nomeOperadorTransacao}</Td>
                                                </Tr>
                                            )
                                        } else if (x.nomeOperadorTransacao?.toLowerCase().includes(name.toLowerCase())) {
                                            return (
                                                <Tr key={index}>
                                                    <Td borderWidth={'2px'}>{x.dataTransferencia.split("T")[0].split("-").reverse().join("/")}</Td>
                                                    <Td borderWidth={'2px'}>{x.valor}</Td>
                                                    <Td borderWidth={'2px'}>{x.tipo}</Td>
                                                    <Td borderWidth={'2px'}>{x.nomeOperadorTransacao}</Td>
                                                </Tr>
                                            )
                                        }

                                    }
                                })
                                : transactions?.map((x, index) => {
                                    if (account) {
                                        if (x.conta.idConta.toString() == account && name == "") {
                                            return (
                                                <Tr key={index}>
                                                    <Td borderWidth={'2px'}>{x.dataTransferencia.split("T")[0].split("-").reverse().join("/")}</Td>
                                                    <Td borderWidth={'2px'}>{x.valor}</Td>
                                                    <Td borderWidth={'2px'}>{x.tipo}</Td>
                                                    <Td borderWidth={'2px'}>{x.nomeOperadorTransacao}</Td>
                                                </Tr>
                                            )
                                        } else if (x.conta.idConta.toString() == account && x.nomeOperadorTransacao?.toLowerCase().includes(name.toLowerCase())) {
                                            return (
                                                <Tr key={index}>
                                                    <Td borderWidth={'2px'}>{x.dataTransferencia.split("T")[0].split("-").reverse().join("/")}</Td>
                                                    <Td borderWidth={'2px'}>{x.valor}</Td>
                                                    <Td borderWidth={'2px'}>{x.tipo}</Td>
                                                    <Td borderWidth={'2px'}>{x.nomeOperadorTransacao}</Td>
                                                </Tr>
                                            )
                                        }
                                    } else if (x.tipo != "DEPOSITO" && x.tipo != "SAQUE") {
                                        if (name == "none") {
                                            return (
                                                <Tr key={index}>
                                                    <Td borderWidth={'2px'}>{x.dataTransferencia.split("T")[0].split("-").reverse().join("/")}</Td>
                                                    <Td borderWidth={'2px'}>{x.valor}</Td>
                                                    <Td borderWidth={'2px'}>{x.tipo}</Td>
                                                    <Td borderWidth={'2px'}>{x.nomeOperadorTransacao}</Td>
                                                </Tr>
                                            )
                                        } else if (x.nomeOperadorTransacao?.toLowerCase().includes(name.toLowerCase())) {
                                            return (
                                                <Tr key={index}>
                                                    <Td borderWidth={'2px'}>{x.dataTransferencia.split("T")[0].split("-").reverse().join("/")}</Td>
                                                    <Td borderWidth={'2px'}>{x.valor}</Td>
                                                    <Td borderWidth={'2px'}>{x.tipo}</Td>
                                                    <Td borderWidth={'2px'}>{x.nomeOperadorTransacao}</Td>
                                                </Tr>
                                            )
                                        }

                                    }
                                })}
                        </Tbody>
                        <Tfoot>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}