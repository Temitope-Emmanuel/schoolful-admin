import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Tabs,
  Flex,
  Tab,
  Icon,
  AvatarGroup,
  TabList,
  TabPanel,
  Skeleton,
  TabPanels,
  HStack,
  VStack,
  Text,
  SimpleGrid,
  Avatar,
  IconButton,
  Wrap,
  WrapItem,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@chakra-ui/react";
import { Button } from "components/Button";
import { DetailCard } from "components/Card";
import {
  ChangeTestimonyStatus,
  CommentOnTestimony,
  getPrayer,
  getPrayerRequest,
  getTestimony,
  prayPrayerRequest,
} from "core/services/prayer.service";
import { IPrayer, IPrayerRequest } from "core/models/Prayer";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { FaPrayingHands } from "react-icons/fa";
import { MessageType } from "core/enums/MessageType";
import useParams from "utils/params";
import useToast, { ToastFunc } from "utils/Toast";
import { setPageTitle } from "store/System/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "store";
import { ITestimony, TestimonyStatusType } from "core/models/Testimony";
import axios, { CancelTokenSource } from "axios";
import { NoContent } from "components/NoContent";
import { Formik, FormikProps, Field, FieldProps } from "formik";
import { Dialog } from "components/Dialog"
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => {
  return createStyles({
    root: {
      "& button,p": {
        fontFamily: "MulishRegular",
      },
      "& > div": {
        [theme.breakpoints.up("sm")]: {
          width: "95%",
        },
        "& > div:first-child": {
          borderBottom: "1px solid #E0DEE6",
          overflow: "auto",
          [theme.breakpoints.up("sm")]: {
            paddingRight: "15%",
            marginLeft: "3%",
            width: "97%",
            marginRight: "10%",
          },
        },
      },
      "& p": {
        fontFamily: "MulishRegular",
      },
    },
    reportCard: {
      "& > p": {
        marginTop: "0px !important",
      },
    },
    tabContainer: {
      "& > div": {
        width: "100%",
      },
      "& > *:last-child": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > button": {
          margin: "1.5rem 0",
        },
        "& > div:last-child": {
          width: "100%",
        },
      },
    },
    prayerContainer: {
      "& > *": {
        shadow: "5px 0px 6px #0000001A",
        // backgroundColor: "white",
        padding: "1rem",
        borderRadius: "6px",
        alignItems: "flex-start !important",
      },
    },
    testimonyContainer: {
      "& ul": {
        justifyContent: "center",
        [theme.breakpoints.up("sm")]: {
          justifyContent: "flex-start",
        },
        "& li": {
          // maxWidth:"20rem",
          "& > div": {
            minWidth: "18.5rem",
            width: "100%",
            boxShadow: "5px 0px 6px #0000001A",
            backgroundColor: "white",
            // padding: "1rem",
            borderRadius: "6px",
            alignItems: "flex-start !important",
          },
          [theme.breakpoints.up("sm")]: {
            width: "initial",
          },
        },
      },
      "& button": {
        fontFamily: "MulishBold",
      },
    },
    prayerMainContainer: {
      paddingTop: "4.5rem !important",
      "& > button": {
        marginLeft: "50%",
        marginBottom: theme.spacing(4),
        fontWeight: "400",
        transform: "translateX(-50%)",
      },
      "& > div:nth-child(2)": {
        alignItems: "flex-start !important",
        width: "100%",
        "& > p": {
          marginLeft: ".75rem",
        },
        "& > div": {
          width: "100%",
        },
      },
    },
    buttonContainer: {
      "& > button": {
        whiteSpace: "nowrap",
        flex: 1,
        fontSize: "1rem",
        marginBottom: ".2px",
        borderRadius: "10px 10px 0px 0px",
        color: "#151C4D",
        letterSpacing: 0,
        backgroundColor: "#E0DEE6",
      },
    },
  });
});

const selected = {
  bgColor: "#F2DCF4",
  color: "primary",
  shadow: "5px 0px 6px #0000001A",
  marginBottom: "0",
};

interface IReviewBooking {
  handleReject(comment: string): void
  close():void
}

export const ReviewBooking: React.FC<IReviewBooking> = ({ handleReject,close }) => {
  interface IReviewForm {
      reason: string
  }
  const initialValue = {
      reason: ""
  }
  const handleSubmit = (values: IReviewForm, { ...actions }: any) => {
      actions.setSubmitting(true)
      handleReject(values.reason)
      close()
  }
  const validationSchema = Yup.object({
      reason: Yup.string().min(3, "Reason for rejecting is too short").required()
  })
  return (
      <ModalContent alignItems="center" bgColor="bgColor2" py={5} >
          <ModalHeader textAlign="center" mt={5} mb={6} color="primary">
              Reason for Rejecting
          </ModalHeader>
          <ModalCloseButton border="2px solid rgba(0,0,0,.5)"
              outline="none" borderRadius="50%" opacity={.5} />
          <Formik
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              initialValues={initialValue}
          >
              {(formikProps: FormikProps<IReviewForm>) => (
                  <>
                      <ModalBody maxW="md" width="75%" >
                          <Field name="reason" >
                              {({ field }: FieldProps) => (
                                  <Textarea rows={7} width="100%" placeholder="Enter details for this Event" {...field} />
                              )}
                          </Field>
                      </ModalBody>
                      <ModalFooter justifyContent="center">
                          <Button px="12"
                          disabled={formikProps.isSubmitting || !formikProps.dirty || !formikProps.isValid}
                          onClick={(formikProps.handleSubmit as any)}>
                              Proceed
                      </Button>
                      </ModalFooter>
                  </>
              )}
          </Formik>
      </ModalContent>
  )
}


const Prayer = () => {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: AppState) => state.system.currentUser
  );
  // const history = useHistory()
  const toast = useToast();
  const location = useLocation();
  const [options, setOptions] = React.useState<string | number>("1");
  const cancelToken = axios.CancelToken.source();
  // const currentChurch = useSelector((state:AppState) => state.system.currentChurch)
  const defaultPrayer: IPrayer = {
    prayerName: "",
    prayerDetail: "",
  };
  const defaultPrayerRequest: IPrayerRequest = {
    prayerTitle: "",
    prayerDetail: "",
    churchID: 0,
    createdAt: new Date(),
    personID: "",
    fullName: "",
    pictureUrl: "",
    timeLapsed: "",
    prayedPrayerRequests: [
      {
        fullName: "",
        personPrayedId: "",
        personPrayedPictureUrl: "",
        pictureUrl: "",
        prayedPrayerRequestID: 0,
        prayerRequestID: 0,
      },
    ],
  };
  const defaultTestimony: ITestimony = {
    churchID: 0,
    dateEntered: new Date(),
    personID: "",
    testimonyTitle: "",
    testimonyDetail: "",
    timeLapsed: "",
  };
  const [prayer, setPrayer] = React.useState<IPrayer[]>(
    new Array(10).fill(defaultPrayer)
  );
  const [prayerRequest, setPrayerRequest] = React.useState<IPrayerRequest[]>(
    new Array(10).fill(defaultPrayerRequest)
  );
  const [churchTestimony, setChurchTestimony] = React.useState<ITestimony[]>(
    new Array(10).fill(defaultTestimony)
  );
  const [tabIndex, setTabIndex] = React.useState(1);
  const handleTabChange = (event: number) => {
    setTabIndex(event);
  };

  const apiChurchTestimony = (cancelToken: CancelTokenSource) => () => {
    getTestimony(
      { churchId: Number(params.churchId), testimonyType: "General" },
      cancelToken
    )
      .then((payload) => {
        const newChurchTestimony = payload.data.map((item) => {
          const timeLapsedInMilli =
            new Date().getTime() - new Date(item.dateEntered).getTime();
          const timeLapsed = String(
            Math.round(timeLapsedInMilli / (1000 * 3600 * 24))
          );
          return {
            ...item,
            timeLapsed,
            dateEntered: new Date(item.dateEntered),
          };
        });
        setChurchTestimony(newChurchTestimony);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          toast({
            title: "Unable to get Church Testimony",
            subtitle: `Error:${err}`,
            messageType: MessageType.ERROR,
          });
        }
      });
  };
  const getChurchTestimony = apiChurchTestimony(cancelToken);

  React.useEffect(() => {
    dispatch(setPageTitle("Prayers/Verses"));
    setTabIndex(Number(location.search.split("=")[1]) || 0);

    const getChurchPrayer = async () => {
      await getPrayer(3, cancelToken)
        .then((payload) => {
          setPrayer(payload.data);
        })
        .catch((err) => {
          if (!axios.isCancel(err)) {
            toast({
              title: "Unable to get Church Prayer",
              subtitle: `Error:${err}`,
              messageType: MessageType.ERROR,
            });
          }
        });
    };

    const getChurchPrayerRequest = () => {
      getPrayerRequest(params.churchId, cancelToken)
        .then((payload) => {
          const newPrayerRequest = payload.data.map((item) => {
            const timeLapsedInMilli =
              new Date().getTime() - new Date(item.createdAt).getTime();
            console.log("this is the time lapsed", { timeLapsedInMilli });
            // const timeLapsed = String(Math.round(timeLapsedInMilli / (1000 * 3600 * 24)))
            return {
              ...item,
              // timeLapsed,
              hasPrayed: Boolean(
                item.prayedPrayerRequests!.find(
                  (item) => item.fullName === currentUser.fullname
                )
              ),
            };
          });
          setPrayerRequest(newPrayerRequest);
        })
        .catch((err) => {
          if (!axios.isCancel(err)) {
            toast({
              title: "Unable to get Church Request",
              subtitle: `Error:${err}`,
              messageType: MessageType.ERROR,
            });
          }
        });
    };
    const getChurchTestimony = () => {
      getTestimony({ churchId: Number(params.churchId), testimonyType: "Thanksgiven" },cancelToken).then(payload => {
        setChurchTestimony(payload.data)
      }).catch(err => {
        if(!axios.isCancel(err)){
          toast({
            title: "Unable to get Church Testimony",
            subtitle: `Error:${err}`,
            messageType: MessageType.ERROR
          })
        }
      })
    }
    getChurchPrayerRequest();
    getChurchTestimony();
    getChurchPrayer();
    getChurchTestimony()
    return () => {
      cancelToken.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTestimonyStatus =
    (arg: TestimonyStatusType, toast: ToastFunc) => (testimonyId: number) => {
      ChangeTestimonyStatus({ testimonyId, testimonyStatus: arg })
        .then(() => {
          getChurchTestimony();
          toast({
            title: "Testimony updated Successfully",
            subtitle: "",
            messageType: MessageType.SUCCESS,
          });
        })
        .catch((err) => {
          toast({
            title: "Something went wrong",
            subtitle: `Error:${err}`,
            messageType: MessageType.ERROR,
          });
        });
  };

  const approveTestimony = (testimonyId: number) => () => {
    updateTestimonyStatus("Approved", toast)(testimonyId);
  };

  const rejectTestimony = (testimonyId: number) => () => {
    updateTestimonyStatus("Deleted", toast)(testimonyId);
  };

  const rejectChurchTestimony = (personId: string, testimonyId: number) => (comment: string) => {
    CommentOnTestimony({ comment, personId, testimonyId }).then(() => {
      updateTestimonyStatus("Deleted", toast)(testimonyId)
    }).catch(err => {
      toast({
        title:"something went wrong",
        subtitle:`Error: ${err}`,
        messageType:MessageType.ERROR
      })
    })
}

  const addToPrayer = (prayerRequestId: number) => () => {
    const foundIndex = prayerRequest.findIndex(
      (item) => item.prayerRequestID === prayerRequestId
    );
    const newFoundPrayerRequest: IPrayerRequest = {
      ...prayerRequest[foundIndex],
      // prayedPrayerRequests:[
      //     ...prayerRequest[foundIndex].prayedPrayerRequests as [],
      //     {}
      // ],
      hasPrayed: true,
    };
    const filteredPrayerRquest = [...prayerRequest];
    filteredPrayerRquest.splice(foundIndex, 1, newFoundPrayerRequest);
    setPrayerRequest(filteredPrayerRquest);
    const addToPrayerQuery = `prayerRequetId=${prayerRequestId}&personId=${currentUser.id}`;
    prayPrayerRequest(addToPrayerQuery)
      .then((payload) => {
        toast({
          title: `${currentUser.fullname} has prayed for this request`,
          subtitle: ``,
          messageType: MessageType.SUCCESS,
        });
      })
      .catch((err) => {
        toast({
          title: `Unable to add Admin to prayed List`,
          subtitle: `Error:${err}`,
          messageType: MessageType.ERROR,
        });
      });
  };
  const optionForDate: Intl.DateTimeFormatOptions = { month: "long" };
  const dateMonth = new Intl.DateTimeFormat("en-US", optionForDate).format(
    new Date()
  );
  const [open, setOpen] = React.useState(false)
    const [currentTestimony, setCurrentTestimony] = React.useState<ITestimony>(defaultTestimony)
  const handleToggle = (arg: ITestimony) => () => {
    setOpen(!open)
    setCurrentTestimony(arg)
}

  return (
    <>
      <Flex
        className={classes.root}
        p={{ base: "4", md: "0" }}
        pl={{ md: "12" }}
        pt={{ md: "12" }}
        direction={{ base: "column", md: "row" }}
      >
        <Tabs index={tabIndex} onChange={handleTabChange}>
          <TabList className={classes.buttonContainer} width="100%">
            <Tab _selected={{ ...selected }} px={["2", "5"]} py="4">
              Prayer Requests
            </Tab>
            <Tab
              _selected={{ ...selected, shadow: " -3px 0px 6px #00000029" }}
              px={["2", "5"]}
              py="3"
            >
              Testimonies
            </Tab>
            <Tab
              _selected={{ ...selected, shadow: " -3px 0px 6px #00000029" }}
              px={["2", "5"]}
              py="3"
            >
              Church Prayers
            </Tab>
            <Tab
              _selected={{ ...selected, shadow: " -3px 0px 6px #00000029" }}
              px={["2", "5"]}
              py="3"
            >
              Thanksgiving
            </Tab>
          </TabList>
          <TabPanels
            mb={{ base: "5rem", md: "10rem" }}
            className={classes.tabContainer}
          >
            <TabPanel mt="3">
              <SimpleGrid
                minChildWidth="17.5rem"
                alignItems={{ base: "center", md: "flex-start" }}
                gridGap=".5rem"
                spacing={3}
                className={classes.prayerContainer}
              >
                {prayerRequest.length > 0 &&
                  prayerRequest.map((item, idx) => (
                    <DetailCard
                      title={item.fullName}
                      key={item.prayerRequestID || idx}
                      subtitle={item.prayerTitle}
                      image={item.pictureUrl}
                      timing={new Date(item.createdAt)}
                      body={item.prayerDetail}
                      isLoaded={Boolean(item.prayerRequestID)}
                    >
                      <HStack width="100%" justify="space-between">
                        {item.prayedPrayerRequests?.length && (
                          <>
                            <AvatarGroup size="sm" max={3}>
                              {item.prayedPrayerRequests!.map((item) => (
                                <Avatar
                                  name={item.fullName}
                                  key={item.prayedPrayerRequestID}
                                  src={item.personPrayedPictureUrl}
                                />
                              ))}
                            </AvatarGroup>
                            <Text mr="auto">
                              <Text as="b">
                                {item.prayedPrayerRequests!.length}
                              </Text>{" "}
                              has Prayed
                            </Text>
                          </>
                        )}
                        <IconButton
                          disabled={item.hasPrayed || false}
                          onClick={addToPrayer(item.prayerRequestID as number)}
                          aria-label="Add to Prayer"
                          boxSize="1rem"
                          icon={<FaPrayingHands />}
                        />
                      </HStack>
                    </DetailCard>
                  ))}
              </SimpleGrid>
              {prayerRequest.length <= 0 && (
                <NoContent>
                  <Text>No Prayer Request is Available</Text>
                </NoContent>
              )}
            </TabPanel>
            <TabPanel mt="3" className={classes.testimonyContainer}>
              <Wrap spacing={6}>
                {churchTestimony.length > 0 &&
                  churchTestimony.map((item, idx) => (
                    <WrapItem key={item.testimonyID || idx} bgColor="white">
                      <DetailCard
                        title="Bismark Achodo"
                        timing={new Date(item.dateEntered)}
                        image="https://bit.ly/ryan-florence"
                        isLoaded={Boolean(item.testimonyID)}
                        smallText={new Date(
                          item.dateEntered
                        ).toLocaleDateString()}
                        body={item.testimonyDetail}
                      >
                        <HStack width="100%">
                          <Button
                            mr="4"
                            variant="link"
                            textDecoration="underline"
                            onClick={approveTestimony(item.testimonyID as number)}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="link"
                            color="tertiary"
                            textDecoration="underline"
                            onClick={rejectTestimony(item.testimonyID as number)}
                          >
                            Discard
                          </Button>
                        </HStack>
                      </DetailCard>
                    </WrapItem>
                  ))}
              </Wrap>
              {churchTestimony.length <= 0 && (
                <NoContent>
                  <Text>No Testimony is Available</Text>
                </NoContent>
              )}
            </TabPanel>
            <TabPanel mt="3" className={classes.prayerMainContainer}>
              <Button>
                <Link to={`/church/${params.churchId}/prayer/create`}>
                  Create Church Prayer
                </Link>
              </Button>
              <VStack>
                <Text fontWeight="600" color="primary">
                  {`${dateMonth} Daily Fasting & Prayers`}
                </Text>
                <SimpleGrid
                  minChildWidth="17.5rem"
                  alignItems={{ base: "center", md: "flex-start" }}
                  gridGap=".5rem"
                  spacing={3}
                  className={classes.prayerContainer}
                >
                  {prayer.map((item, idx) => (
                    <Skeleton
                      key={item.prayerID || idx}
                      isLoaded={Boolean(item.prayerID)}
                    >
                      <DetailCard
                        title={item.prayerName}
                        key={item.prayerID || idx}
                        smallText={"JOHN 3:16"}
                        body={item.prayerDetail}
                      >
                        <HStack width="100%" justify="space-between">
                          <AvatarGroup size="sm" max={3}>
                            <Avatar
                              name="Ryan Florence"
                              src="https://bit.ly/ryan-florence"
                            />
                            <Avatar
                              name="Segun Adebayo"
                              src="https://bit.ly/sage-adebayo"
                            />
                            <Avatar
                              name="Kent Dodds"
                              src="https://bit.ly/kent-c-dodds"
                            />
                            <Avatar
                              name="Prosper Otemuyiwa"
                              src="https://bit.ly/prosper-baba"
                            />
                            <Avatar
                              name="Christian Nwamba"
                              src="https://bit.ly/code-beast"
                            />
                          </AvatarGroup>
                          <Text mr="auto">
                            <Text as="b">14 People</Text> Prayed
                          </Text>
                          <Icon boxSize="1rem" as={FaPrayingHands} />
                        </HStack>
                      </DetailCard>
                    </Skeleton>
                  ))}
                </SimpleGrid>
              </VStack>
            </TabPanel>
            <TabPanel mt="3">
              <SimpleGrid
                minChildWidth="17.5rem"
                alignItems={{ base: "center", md: "flex-start" }}
                gridGap="1.5rem"
                className={classes.prayerContainer}
              >
                {churchTestimony.length > 0 &&
                  churchTestimony.map((item, idx) => (
                    <DetailCard
                      title="Bismark Achodo"
                      key={item.testimonyID || idx}
                      timing={new Date(item.dateEntered)}
                      image="https://bit.ly/ryan-florence"
                      subtitle={item.testimonyTitle}
                      isLoaded={Boolean(item.testimonyID)}
                      smallText={new Date(item.dateEntered).toLocaleDateString()}
                      body={item.testimonyDetail}
                    >
                      <HStack width="100%">
                        <Button
                          mr="4"
                          variant="link"
                          onClick={approveTestimony(item.testimonyID as number)}
                          textDecoration="underline"
                        >
                          Approve
                        </Button>
                        <Button
                          variant="link"
                          textDecoration="underline"
                          onClick={handleToggle(item)}
                          color="tertiary"
                        >
                          Reject
                        </Button>
                      </HStack>
                    </DetailCard>
                  ))}
              </SimpleGrid>
              {churchTestimony.length <= 0 && (
                <NoContent align={false}>
                  <Text>No Church Testimony is Available</Text>
                </NoContent>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
      <Dialog open={open} size="xl" close={handleToggle}>
        <ReviewBooking close={() => setOpen(false)}
          handleReject={rejectChurchTestimony(currentUser.id, currentTestimony.testimonyID as number)} />
      </Dialog>
    </>
  );
};

export default Prayer;
