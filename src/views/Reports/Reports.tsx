import React from "react"
import {
    Icon, Tabs, Flex, Tab, useBreakpoint,
    TabList, TabPanel, StackDivider, TabPanels, Text, Checkbox, Avatar,
    Heading, HStack, VStack, Stack
} from "@chakra-ui/react"
import { Button } from "components/Button"
import { FaFilter } from "react-icons/fa"
import { makeStyles, createStyles } from "@material-ui/core/styles"
import { TiGroup } from "react-icons/ti"
import { IoMdWallet } from "react-icons/io"
import { useDispatch } from "react-redux"
import { setPageTitle } from "store/System/actions"
import { Table, TableRow } from "components/Table"
import { SearchInput } from "components/Input"
import { getUserByRoleAndChurchId } from "core/services/account.service"
import { getChurchMember } from "core/services/church.service"
import useToast from "utils/Toast"
import useParams from "utils/params"
import { IChurchMember } from "core/models/ChurchMember"
import axios, { CancelTokenSource } from "axios"
import { getChurchOnlyDonationTransactions } from "core/services/payment.service"
import { downloadFile } from "utils/functions"
import useTableService, { TableContextProvider } from "components/Table/TableContext"
import { IDonation } from "core/models/Donation"


const useStyles = makeStyles((theme) => {
    return (
        createStyles({
            root: {
                // height: "97vh",
                "& button,p": {
                    fontFamily: "MulishRegular"
                },
                margin: theme.spacing(2),
                [theme.breakpoints.up("md")]: {
                    margin: theme.spacing(7),
                    marginLeft: theme.spacing(10),
                }
            },
            reportCard: {
                "& > p": {
                    marginTop: "0px !important"
                }
            },
            tabContainer: {
                width: "100%"
            }
        })
    )
})

const selected = {
    bgColor: "#F2DCF4",
    color: "primary",
    shadow: "5px 0px 6px #0000001A"
}
const controlMargin = ["0px !important", ".3rem !important "]
const reportCardStyles = makeStyles((theme) => createStyles({
    root: {
        flex: 1,
        boxShadow: "0px 10px 20px #20A2A030",
        justifyContent: "space-around",
        maxHeight: "8.5rem",
        position: "relative",
        "& > svg": {
            backgroundColor: "rgba(21, 28, 77, .3)",
            borderRadius: "0.625rem",
            color: "#151C4D"
        },
        "& > div": {
            height: "100%",
            justifyContent: "space-evenly",
            [theme.breakpoints.up("md")]: {
                justifyContent: "space-evenly"
            },
        },
        "& h6": {
            marginTop: "-7px !important"
        }
    },
    monthContainer: {
        position: "absolute",
        top: "10%",
        fontSize: ".5rem",
        alignItems: "center"
    }
}))

interface IReportCard {
    heading: string;
    number: number | string;
    bgColor: string;
    icon: any;
    showMonth?: boolean;
}


const ReportCard: React.FC<IReportCard> = ({ heading, showMonth, number, bgColor, icon }) => {
    const classes = reportCardStyles()
    return (
        <Flex className={classes.root} px={{ md: "5" }}
            align={{ base: 'center', md: 'center' }} height={["13vh", "35vh"]}
            py={{ base: "2", md: "7" }} bgColor={bgColor} >
            <Icon as={icon} p={{ md: 1 }} boxSize={['3rem', "4rem", "5rem"]} display={{ base: "none", sm: "block" }} />
            <VStack align={["center", "flex-end"]} ml="2"  >
                {/* {showMonth &&
                <HStack className={classes.monthContainer} spacing={1} 
                    color="tertiary">
                    <Text letterSpacing="0.26px"
                     fontWeight="600">
                         Last Month
                    </Text>
                    <Icon as={IoIosArrowDown} />
                </HStack>
                } */}
                <Heading as="h6" textAlign={["center", "right"]} fontFamily="MontserratBold"
                    fontSize={[".6rem", "1rem"]} color="tertiary">
                    {heading}
                </Heading>
                <Text fontSize={["1rem", "1.1rem", "2rem", "3rem"]} mt={controlMargin} fontFamily="Bahnschrift"
                    fontWeight="600" color="tertiary">
                    {number}
                </Text>
            </VStack>
        </Flex>
    )
}

interface IFinance {
    amount: number;
    username: string;
    email: string
}

type ReportKey = keyof IChurchMember
const filterOptions: ReportKey[] = ["email", "username", "phoneNumber"]

type FinanceKey = keyof IDonation
const filterFinanceOptions: FinanceKey[] = ["targetAmount", "donationName", "churchDonationID"]


const FinancialReport: React.FC<{
    financialReport: any[];
    inputValue: string;
}> = React.memo(({ financialReport }) => {
    const {
        dialog: {
            handleToggle
        },
        filter: {
            selectedFilter,
            setFilter
        },
        pagination: {
            page, rowsPerPage
        }
    } = useTableService()
    const [localPage, setLocalPage] = React.useState(0)
    const [displayFinancialReport, setDisplayFinancialReport] = React.useState<IDonation[]>([])
    const handleFinancialDownload = React.useMemo(() => {
        return () => {
            downloadFile(financialReport.map(item => {
                return ({
                    id: item.id,
                    username:item.username,
                    phoneNumber:item.phoneNumber,
                    email:item.email,
                    address:item.home_address
                })
            }), "report")
        }
    }, [financialReport])
    React.useEffect(() => {
        if(financialReport.length){
            console.log({financialReport})
            setFilter(filterFinanceOptions[0])
            setDisplayFinancialReport(financialReport)
        }
    }, [financialReport])
    
    React.useEffect(() => {
        if ((localPage + 1) === page) {
            getNextDocument()
        } else if ((localPage - 1) === page) {
            getPreviousDocument()
        }
        setLocalPage(page)
    }, [page])
    const getNextDocument = () => {
        // const foundIdx = allCompanyUser.findIndex(item => item.id === companyUsers[companyUsers.length -1].id)

        // if(foundIdx){
        //     setCompanyUsers(allCompanyUser.slice(foundIdx+1,foundIdx+rowsPerPage+1))  
        // }
    }

    const getPreviousDocument = () => {
        // const foundIdx = allCompanyUser.findIndex(item => item.id === companyUsers[0].id)
        // if(foundIdx){
        // const start = foundIdx-rowsPerPage
        // const end = foundIdx
        // console.log({
        //     start,
        //     end
        // })
        //     setCompanyUsers(allCompanyUser.slice(start,end))
        // }
    }

    console.log('this is the display financial report', displayFinancialReport)

    React.useEffect(() => {
        const testString = new RegExp(selectedFilter, "i")
        const newDisplay = financialReport.filter(item => testString.test(item[filterFinanceOptions[selectedFilter as any]] as any))
        // setDisplayFinancialReport([...newDisplay])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFilter])

    return (
        <Stack spacing={5} mt={7}
            divider={<StackDivider borderColor="gray.200" />}>
            <HStack m={{ md: 7 }} justify="space-between">
                <Flex align="center">
                    <Heading color="tertiary"
                        mr={["1", "10"]} fontSize={[".7rem", "1.5rem"]} >
                        Transaction History
                    </Heading>

                    <Icon as={FaFilter} color="tertiary" onClick={handleToggle}
                    />
                </Flex>
                {
                    displayFinancialReport.length &&
                    <Button variant="link" color="tertiary" fontWeight="800"
                        fontFamily="MontserratBold" onClick={handleFinancialDownload}
                        textDecoration="underline" fontSize="0.875rem" >
                        Download Excel File
                </Button>
                }
            </HStack>
            <Table rowLength={displayFinancialReport.length}
                numSelected={0} filterOptions={filterFinanceOptions}
                heading={[null, "ID", "Name", "Target Amount", "Description"]} >
                    {displayFinancialReport.map((item, idx) => (
                        <TableRow key={idx} isLoaded={true} fields={[
                            <Checkbox />,
                            item.churchDonationID, item.donationName, item.targetAmount, item.donationDescription.substring(0,50)
                        ]} />
                    ))}
            </Table>
        </Stack>
    )
})

const MemberReport: React.FC<{
    churchMember: IChurchMember[];
    notBaseBreakpoint: boolean;
    inputValue: string;
}> = React.memo(({ churchMember, notBaseBreakpoint, inputValue }) => {
    const {
        dialog: {
            handleToggle
        },
        filter: {
            selectedFilter,
            setFilter
        },
        pagination: {
            page, rowsPerPage
        }
    } = useTableService()
    const [localPage, setLocalPage] = React.useState(0)
    const [localChurchMember, setLocalChurchMember] = React.useState<IChurchMember[]>([])
    const [displayChurchMember, setDisplayChurchMember] = React.useState<any[]>([])

    const handleMemberDownload = React.useMemo(() => {
        return () => {
            downloadFile(churchMember.map(item => {
                return ({
                    id: item.churchMemberID,
                    username: item.username,
                    phoneNumber: item.phoneNumber,
                    email: item.email
                })
            }), "church member")
        }
    }, [churchMember])

    React.useEffect(() => {
        if ((localPage + 1) === page) {
            getNextDocument()
        } else if ((localPage - 1) === page) {
            getPreviousDocument()
        }
        setLocalPage(page)
    }, [page])

    const getNextDocument = () => {
        if (localChurchMember.length && churchMember.length) {
            const foundIdx = churchMember.findIndex(item => item.churchMemberID === localChurchMember[localChurchMember.length - 1].churchMemberID)
            if (foundIdx) {
                setLocalChurchMember(churchMember.slice(foundIdx + 1, foundIdx + rowsPerPage + 1))
            }
        }
    }

    const getPreviousDocument = () => {
        if (localChurchMember.length && churchMember.length) {
            const foundIdx = churchMember.findIndex(item => item.churchMemberID === localChurchMember[0].churchMemberID)
            if (foundIdx) {
                const start = foundIdx - rowsPerPage
                const end = foundIdx
                setLocalChurchMember(churchMember.slice(start, end))
            }
        }
    }

    // For searching
    React.useEffect(() => {
        const testString = new RegExp(inputValue, "i")
        const newDisplay = churchMember.filter((item: any) => {
            return testString.test(item[selectedFilter])
        })
        setDisplayChurchMember(newDisplay)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFilter, inputValue])

    React.useEffect(() => {
        setFilter(filterOptions[0])
    }, [])

    // For setting the local church Member list
    React.useEffect(() => {
        if (churchMember.length) {
            setLocalChurchMember(churchMember)
        }
    }, [churchMember])
    React.useEffect(() => {
        setDisplayChurchMember(localChurchMember)
    }, [localChurchMember])

    return (
        <Stack spacing={5} mt={7}
            divider={<StackDivider borderColor="gray.200" />}>
            <HStack m={{ md: 7 }} justify="space-between">
                <Flex align="center">
                    <Heading color="tertiary"
                        mr={["1", "10"]} fontSize={[".7rem", "1.5rem"]} >
                        Members Report
                    </Heading>
                    <Icon as={FaFilter} color="tertiary"
                        onClick={handleToggle}
                    />
                </Flex>
                {
                    churchMember.length ?
                        <Button variant="link" color="tertiary" onClick={handleMemberDownload}
                            textDecoration="underline" fontSize="0.875rem" >
                            Download Excel File
                    </Button> :
                        undefined
                }
            </HStack>
            <Table rowLength={displayChurchMember.length}
                numSelected={0} filterOptions={filterOptions}
                heading={[null, null, "Name", "Email", "Phone", "Date", "Group"]}>
                {displayChurchMember.map((item, idx) => (
                    <TableRow key={idx} isLoaded={true} fields={[
                        <Checkbox />, <Avatar name="Dan Abrahmov" size={!notBaseBreakpoint ? "sm" : "md"} src="https://bit.ly/dan-abramov" />,
                        item.username, item.email, item.phoneNumber, item.status === 1 ? 'Active' : 'Deactivated', item.role
                    ]} />
                ))}
            </Table>
        </Stack>
    )
})

const Reports = () => {
    const toast = useToast()
    const params = useParams()
    const classes = useStyles()
    const breakpoint = useBreakpoint()
    const dispatch = useDispatch()
    const notBaseBreakpoint = breakpoint !== "base"
    const [filter, setFilter] = React.useState("")
    const [inputText, setInputText] = React.useState("")
    const [churchMember, setChurchMember] = React.useState<IChurchMember[]>([])
    const [churchTransaction, setChurchTransaction] = React.useState<any[]>([])

    const handleInputChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        setInputText(e.currentTarget.value)
    }
    const churchMemberDetail = ({ page, count, cancelToken }: {
        page: number;
        count: number;
        cancelToken?: CancelTokenSource
    }) => {
        getChurchMember(params.churchId as any)
            getUserByRoleAndChurchId({
                churchId: params.churchId as any,
                count,
                page,
                role: "ChurchMember",
                cancelToken: cancelToken
            })
            .then(payload => {
                setChurchMember(payload.data.records)
            }).catch(err => {
                if (!axios.isCancel(err)) {
                    toast({
                        messageType: "error",
                        subtitle: `Error:${err}`,
                        title: "Unable to completed get user request"
                    })
                }
            })
    }
    const getChurchTransaction = ({
        cancelToken, page, take
    }: {
        page: number;
        take: number;
        cancelToken?: CancelTokenSource
    }) => {
        getChurchOnlyDonationTransactions({
            churchId: params.churchId,
            page,
            take,
            cancelToken: cancelToken
        }).then(payload => {
            setChurchTransaction(payload.data ?? [])
        }).catch(err => {
            if (!axios.isCancel(err)) {
                toast({
                    title: "Unable to Load church transaction",
                    subtitle: `Error:${err}`,
                    messageType: "error"
                })
            }
        })
    }

    React.useEffect(() => {
        dispatch(setPageTitle("Reports"))
        
        const cancelToken = axios.CancelToken.source()
        churchMemberDetail({
            count: 10,
            page: 1,
            cancelToken
        })
        getChurchTransaction({
            take: 10,
            page: 1,
            cancelToken,
        })
        return () => {
            cancelToken.cancel()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Flex className={classes.root} direction={{ base: "column", md: "row" }}>
            <Tabs width={{ base: "100%", md: "90%" }} pr={{ md: "5" }} isLazy >
                <TabList width="100%">
                    <Tab whiteSpace="nowrap" flex={1}
                        px={["2", "10"]} py="4" _selected={{ ...selected }}
                        borderRadius="10px 10px 0px 0px"
                        color="#151C4D" bgColor="#E0DEE6">
                        Financial reports
                        </Tab>
                    <Tab whiteSpace="nowrap" _selected={{ ...selected, shadow: " -3px 0px 6px #00000029" }}
                        borderRadius="10px 10px 0px 0px" flex={1}
                        color="#151C4D" bgColor="#E0DEE6"
                        px={["2", "10"]} py="3" >
                        Membership report
                    </Tab>
                    <Flex flex={{ md: 1 }} flexShrink={{ md: 2 }} />
                    <SearchInput display={{ base: "none", md: "block" }}
                        flex={1.5} value={inputText} setValue={handleInputChange} />
                </TabList>
                <SearchInput display={{ md: "none" }} mt="3" width="100%" placeholder={filter}
                    ml="auto" value={inputText} setValue={handleInputChange} />
                <TabPanels mb={{ base: "5rem", md: "10rem" }}
                    className={classes.tabContainer}>
                    <TabPanel mt={{ sm: "3", md: "10" }} ml={{ md: "3" }}
                        width={{ base: "100%", md: "95%" }}>
                        <HStack>
                            <ReportCard number={"₦3454"} bgColor="rgba(182, 3, 201, 0.3)"
                                heading="Total Amount in Wallet" icon={IoMdWallet}
                            />
                            <ReportCard number={"₦3454"} showMonth={true} bgColor="rgba(246, 185, 88, .18)"
                                heading="Total Amount withdrawn" icon={IoMdWallet}
                            />
                            <ReportCard number={"₦3454"} showMonth={true} bgColor="rgba(105, 199, 112, .1)"
                                heading="Total Offering" icon={IoMdWallet}
                            />
                        </HStack>
                        <TableContextProvider>
                            <FinancialReport inputValue={inputText} financialReport={churchTransaction} />
                        </TableContextProvider>
                    </TabPanel>
                    <TabPanel mt={{ sm: "3", md: "10" }} ml={{ md: "3" }}>
                        <HStack>
                            <ReportCard number={3454} bgColor="outlinePrimary"
                                heading="Total Members" icon={TiGroup}
                            />
                            <ReportCard number={3454} showMonth={true} bgColor="#F6B958"
                                heading="Total Members" icon={TiGroup}
                            />
                            <ReportCard number={3454} showMonth={true} bgColor="#69C770"
                                heading="Total Members" icon={TiGroup}
                            />
                        </HStack>
                        <TableContextProvider>
                            <MemberReport inputValue={inputText}
                                churchMember={churchMember} notBaseBreakpoint={notBaseBreakpoint} />
                        </TableContextProvider>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    )
}

export default Reports