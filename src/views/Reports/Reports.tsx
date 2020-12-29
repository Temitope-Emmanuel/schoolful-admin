import React from "react"
import {
    Icon,Tabs, Flex, Tab,useBreakpoint,
    TabList, TabPanel, StackDivider, TabPanels,Text,Checkbox,Avatar,
    Heading, HStack, VStack, Stack
} from "@chakra-ui/react"
import {Button} from "components/Button"
import { FaFilter } from "react-icons/fa"
import { makeStyles, createStyles } from "@material-ui/styles"
import { TiGroup } from "react-icons/ti"
import {IoMdWallet} from "react-icons/io"
import {IoIosArrowDown} from "react-icons/io"
import {useDispatch} from "react-redux"
import {setPageTitle} from "store/System/actions"
import {Table,TableRow} from "components/Table"
import {SearchInput} from "components/Input"


const useStyles = makeStyles((theme) => {
    return (
        createStyles({
            root: {
                height: "97vh"
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
    root:{
        flex:1,
        shadow:"0px 10px 20px #20A2A030",
        justifyContent:"space-around",
        maxHeight:"8.5rem",
        position:"relative",
        "& > svg":{
            backgroundColor:"rgba(21, 28, 77, .3)",
            borderRadius:"0.625rem",
            color:"#151C4D",
            height:"7vh",
            width:"8vh",
            maxHeight:"4.125rem",
            maxWidth:"4.57rem"
        }
    },
    monthContainer:{
        position:"absolute",
        top:"10%"
    }
}))

interface IReportCard {
    heading: string;
    number: number | string;
    bgColor: string;
    icon:any;
    showMonth?:boolean;
}


const ReportCard: React.FC<IReportCard> = ({ heading,showMonth, number, bgColor,icon }) => {
    const classes = reportCardStyles()
    return (
        <Flex className={classes.root} px={{ md: "7" }}
         align={{base:'center',md:'flex-start'}} height={["13vh","35vh"]}
         py={{ base: "2", md: "10" }} bgColor={bgColor} >
            <Icon as={icon} p={{md:2}} display={{base:"none",sm:"block"}} />
            <VStack align={["center","flex-end"]} ml="2"  >
                {showMonth &&
                <HStack className={classes.monthContainer} spacing={1}
                    fontSize={[".5rem"]} 
                    color="tertiary" align="center" >
                    <Text letterSpacing="0.26px"
                     fontWeight="600">
                         Last Month
                    </Text>
                    <Icon as={IoIosArrowDown} />
                </HStack>
                }
                <Heading as="h6" textAlign={["center","right"]} fontSize={[".6rem","1rem"]} >
                    {heading}
                </Heading>
                <Text fontSize={["1rem","1.1rem","2rem"]} mt={controlMargin} fontWeight="600" >
                {number}
                </Text>
            </VStack>
        </Flex>
    )
}

const Reports = () => {
    const classes = useStyles()
    const breakpoint = useBreakpoint()
    const notBaseBreakpoint = breakpoint !== "base"
    const dispatch = useDispatch()
    const [inputText,setInputText] = React.useState("")
    const defaultFinancialReport = [
        <Checkbox/>,<Avatar name="Dan Abrahmov" size={!notBaseBreakpoint ? "sm" : "md"} src="https://bit.ly/dan-abramov" />,
        "Bismark Achodo","Offering","123456789","21-5-2020",<Text color="primary">₦3454</Text>
    ]
    const defaultMemberReport = [
        <Checkbox/>,<Avatar name="Dan Abrahmov" size={!notBaseBreakpoint ? "sm" : "md"} src="https://bit.ly/dan-abramov" />,
        "Bismark Achodo","achodobismark@gmail.com","09072235895","21-5-2020","Choir"
    ]

    const handleInputChange = (e:React.SyntheticEvent<HTMLInputElement>) => {
        setInputText(e.currentTarget.value)
    }
    const demoFinancialReport = new Array(4).fill(defaultFinancialReport)
    const demoMemberReport = new Array(4).fill(defaultMemberReport)

    React.useEffect(() => {
        dispatch(setPageTitle("Reports"))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <Flex className={classes.root} p={{ base: "4", md: "0" }}
             pl={{ md: "12" }} pt={{ md: "12" }} direction={{ base: "column", md: "row" }}>
                <Tabs width={{base:"100%",md:"90%"}} pr={{ md: "5" }} >
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
                         flex={2} value={inputText} setValue={handleInputChange} />
                    </TabList>
                    <SearchInput display={{ md: "none" }} mt="3" width="100%"
                     ml="auto" value={inputText} setValue={handleInputChange} />
                    <TabPanels mb={{ base: "5rem", md: "10rem" }}
                     className={classes.tabContainer}>
                        <TabPanel mt={{ sm: "3", md: "10" }} ml={{ md: "3" }}
                             width={[ "100%","95%"]}>
                            <HStack>
                                <ReportCard number={"₦3454"} bgColor="rgba(182, 3, 201, 0.3)"
                                    heading="Total Amount in Wallet" icon={IoMdWallet}
                                />
                                <ReportCard number={"₦3454"} showMonth={true} bgColor="rgba(246, 185, 88, .18)"
                                    heading="Total Amount in Wallet" icon={IoMdWallet}
                                />
                                <ReportCard number={"₦3454"} showMonth={true} bgColor="rgba(105, 199, 112, .1)"
                                    heading="Total Amount in Wallet" icon={IoMdWallet}
                                />
                            </HStack>
                            <Stack spacing={5} mt={7}
                                divider={<StackDivider borderColor="gray.200" />}>
                                <HStack m={{ md: 7 }} justify="space-between">
                                    <Flex align="center">
                                        <Heading color="tertiary"
                                            mr={["1", "10"]} fontSize={[".7rem", "1.5rem"]} >
                                            Transaction History
                                            </Heading>
                                        <Icon as={FaFilter} color="tertiary"
                                        />
                                    </Flex>
                                    <Button variant="link" color="tertiary"
                                        textDecoration="underline" fontSize="0.875rem" >
                                        Download Excel File
                                        </Button>
                                </HStack>
                                <Table rowLength={demoFinancialReport.length} heading={[null,null,"Name","Type","Transaction ID","Date","Amount"]} >
                                    {
                                        demoFinancialReport.map((item,idx) => (
                                            <TableRow key={idx} isLoaded={true} fields={item} />
                                        ))
                                    }
                                </Table>
                                
                            </Stack>
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
                            <Stack spacing={5} mt={7}
                                divider={<StackDivider borderColor="gray.200" />}>
                                <HStack m={{ md: 7 }} justify="space-between">
                                    <Flex align="center">
                                        <Heading color="tertiary"
                                            mr={["1", "10"]} fontSize={[".7rem", "1.5rem"]} >
                                            Members Report
                                            </Heading>
                                        <Icon as={FaFilter} color="tertiary"
                                        />
                                    </Flex>
                                    <Button variant="link" color="tertiary"
                                        textDecoration="underline" fontSize="0.875rem" >
                                        Download Excel File
                                        </Button>
                                </HStack>
                                <Table rowLength={demoMemberReport.length} heading={[null,null,"Name","Email","Phone","Date","Group"]}>
                                    {demoMemberReport.map((item,idx) => (
                                        <TableRow key={idx} isLoaded={true} fields={item} />
                                    ))}
                                </Table>
                            </Stack>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
    )
}

export default Reports