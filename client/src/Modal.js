import React, { useState, useEffect, memo } from "react";
import "./Modal.css";
import View from "./View";
import axios from "axios";
import Plyr from "react-plyr";
import Gallery from "react-photo-gallery";
import { Embed } from "semantic-ui-react";
import ReactPlayer from "react-player";
import { exercise } from "./Data.js";
import DraggableList from "react-draggable-lists";
import arrayMove from "array-move";
import { Row, Container } from "react-bootstrap";
import {
  Dropdown,
  Popup,
  Button,
  Form,
  Divider,
  Grid,
  Segment,
  Header,
  Modal,
  Icon,
  Message,
  Input,
  Label,
  Loader,
} from "semantic-ui-react";
import DragList from "./DragAndDrop";
import GridList from "@material-ui/core/GridList";
import { SortableElement, SortableContainer } from "react-sortable-hoc";


const style = {
  content: {
    border: "0",
    left: "40%",
    top: "20%",

    width: "30%",
    height: "30%",
  },
};
const style1 = {
  content: {
    height: "auto",
    top: "auto",
    left: "auto",
    bottom: "auto",
    right: "auto",
  },
};


const Modalcall = (props) => {
  // const [copyItems, setCopy] = useState([1, 2, 3]);
  const [Instruction, setInstruction] = useState("");
  const [time, setTime] = useState("");
  const [rest, setRest] = useState("");
  const [sets, setSets] = useState("");
  const [excerciseName, setName] = useState("");
  const [Items, addList] = useState([]);

  const [video, setVideo] = useState("");
  const [modalIsOpen, setModalIsopen] = useState(false);
  const [modalIsOpen2, setModalIsopen2] = useState(false);
  const [modalIsOpen3, setModalIsopen3] = useState(false);
  const [youtubelink, setLink] = useState("");
  const [noUpdate, setUpdate] = useState(false);
  const [ID, passingId] = useState();
  const [wrongurl, setErrorUrlMessage] = useState("");
  const [uploadedFile, setUploadFile] = useState("");
  const [response, setResponse] = useState("");
  const [timerName, setWorkoutName] = useState("");
  const [timerDescription, settimerDescription] = useState("");
  const [
    errorMessagetimerestInstruction,
    seterrorMessagetimerestInstruction,
  ] = useState("");
  const [actualYoutubeLink, setActualYoutubeLink] = useState("");
  const [videoId, setVideoId] = useState("");
  const [TimerNameError, setTimerNameError] = useState("");
  const [addExerName, setExerName] = useState("");
  const [modalIsOpen4, setModalIsopen4] = useState(false);
  const [content, setemailcontent] = useState(
    "Sit tight! We are mailing you the workout!"
  );
  const [loadingbutton, setLoadingbutton] = useState(true);
  const [errorenteremail, setEmailerror] = useState("");
  const [isVideoShow, setVideoShow] = useState(false);

  const [editingExerciseName, seteditingExerciseName] = useState(false);
  const [picked, setPicked] = useState(false);
  const [added, setAdded] = useState(false);

  ///////////////////////// Drag And Drop ///////////////////////////////////
  const Item = SortableElement(({ item, id }) => {
  
    return (
      <div className="view">
        <Container>
          <Row>
            <Button icon="close" id={id} onClick={deleteItem}></Button>
            <Button icon="edit" id={id} onClick={callEdit}></Button>
  
            <Button icon="copy" id={id} onClick={callCopy}></Button>
          </Row>
  
          <Row>
            <View
              key={id}
              id={id}
              data={item}
              // onSelect={deleteItem}
              // onEdit={callEdit}
              videoId={item.videoId}
              // onCopy={callCopy}
            />
          </Row>
        </Container>
      </div>
    );
  });
  
  const ItemContainer = SortableContainer(({ items }) => (
    <Grid>
      {/* <Grid.Row style={{ marginLeft: "2.5%"}}> */}
  
      <GridList spacing={20} cellHeight={320} cols="md" marginTop={20}>
        {items.map((item, index) => (
          <Item key={"item-" + index} item={item} index={index} id={index} />
        ))}
      </GridList>
  
      {/* </Grid.Row> */}
    </Grid>
  ));

///////////////////////// Drag And Drop ///////////////////////////////////

//////////////////////// Mail send modal ////////////////////////////////////
  const Modal4 = () => {
    return (
      <Modal
        size="tiny"
        open={modalIsOpen4}
        onClose={(e) => setModalIsopen4(false)}
        closeOnDimmerClick={false}
      >
        <Form style={{ margin: "5%" }}>
          <Grid style={{ textAlign: "center" }}>
            <Grid.Row>
              <Grid.Column>
                <Message header={content} />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Button
                  loading={loadingbutton}
                  style={{
                    background: "#4DD599",
                    borderRadius: "4px",
                    color: "white",
                    boxShadow: "0px 4px 10px rgba(16, 156, 241, 0.24)",
                  }}
                  onClick={(e) => {
                    if (response !== "") {
                      setModalIsopen4(false);
                      setLoadingbutton(true);
                      setemailcontent(
                        "Sit tight! We are mailing you the workout!"
                      );
                    }
                  }}
                >
                  Close
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Modal>
    );
  };
//////////////////////// Mail send modal ////////////////////////////////////

//////////////////////// buildwork to send mail /////////////////////////////
  const BuildWorkout = () => {
    const [email, setEmail] = useState("");

    const SendToMail = async () => {
      if (email !== "") {
        setModalIsopen3(false);
        const items = Items;
        const mail = email;

        // posting request here to server
        setModalIsopen4(true);
        ///////////////////////////////////////////////////
        await axios
          .post("/submit", {
            items,
            mail,
            timerName,
            videoId,
            timerDescription,
          })
          .then((res) => {
            setResponse(res.data.msg);
            setemailcontent("Workout Mail has been sent!");
            setLoadingbutton(false);
          })
          .catch((err) => {
            setResponse(err.response.data.msg);
            setemailcontent(
              "Sorry workout couldn't be sent! Please contact - +91 9789005601 or enter valid email ID!"
            );
            setLoadingbutton(false);
          });
        setEmail("");
      } else {
        setEmailerror("Please enter your email address!");
      }
    };

    return (
      <div className="main">
        <Modal4 />
        <Modal
          closeIcon
          size="tiny"
          open={modalIsOpen3}
          onClose={(e) => setModalIsopen3(false)}
          closeOnDimmerClick={true}
        >
          <Form style={{ margin: "5%" }}>
            <Grid style={{ textAlign: "center" }}>
              <Grid.Row>
                <Grid.Column>
                  <Message
                    header="Your workout has been built."
                    content="Please enter your mail ID and we will mail you the link."
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Form.Field
                    label="Enter Your Email ID"
                    control="input"
                    id="form-input-control-error-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="joe@schmoe.com"
                    // error={{
                    //   content: "Please enter a valid email address",
                    //   pointing: "below",
                    // }}
                  ></Form.Field>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Header.Content style={{ color: "red", textAlign: "center" }}>
                    {errorenteremail}
                  </Header.Content>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Button
                    size="medium"
                    onClick={SendToMail}
                    style={{
                      background: "#4DD599",
                      borderRadius: "4px",
                      color: "white",
                      boxShadow: "0px 4px 10px rgba(16, 156, 241, 0.24)",
                    }}
                  >
                    Submit
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Modal>
      </div>
    );
  };
//////////////////////// buildwork to send mail /////////////////////////////

  const twomethod = () => {
    setRest("0");
    setSets("1");
    setModalIsopen(true);
    setUpdate(true);
    setInstruction("");
    setTime("");
    setExerName("");
    setVideoShow(false);
    setPicked(false);

    setAdded(false);
    //setRest("");
    setName("");
    setVideo("");
    setLink("");
    setResponse("");

    // setCopy([1]);
  };


////////////////////////////// Adding Item to arraylist /////////////////////
  const listOfItems = () => {
    if (
      noUpdate === true &&
      check(rest, time, Instruction, excerciseName, sets) === true
    ) {
      addList((oldItems) => {
        return [
          ...oldItems,
          {
            Instruction,
            time,
            rest,
            sets,
            excerciseName,
            video,
            videoId,
            id: oldItems.length,
          },
        ];
      });
      setModalIsopen(false);
      seterrorMessagetimerestInstruction("");
      setActualYoutubeLink("");
      setResponse("");
      seteditingExerciseName(false);
      setVideoShow(false);
      setExerName("");
      setPicked(false);
      setAdded(false);

      // setInstruction("");
      // setTime("");
      // setRest("");
      // setName("");
      // setVideo("");
      // setLink("");
    } else if (check(rest, time, Instruction, sets, excerciseName) === true) {
      Items.splice(ID, 1, {
        Instruction,
        time,
        rest,
        sets,
        excerciseName,
        video,
        videoId,
        id: ID,
      });
      addList([...Items]);
      setInstruction("");
      setTime("");
      setRest("");
      setSets("");
      setName("");
      setLink("");
      setVideo("");
      setExerName("");
      setVideoShow(false);
      setActualYoutubeLink("");
      setUpdate(true);
      setModalIsopen(false);
      setResponse("");

      seteditingExerciseName(false);
    }
  };
////////////////////////////// Adding Item to arraylist /////////////////////


////////////////////////////// youtube link vecrification to update video//////////////////
  const YoutubeUrlChange1 = (link) => {
    if (matchYoutubeUrl(link) === false) {
      setErrorUrlMessage("Invalid Youtube Url Link");
    } else {
      const videoId = getId(link);
      const ylink = "https://www.youtube.com/embed/" + videoId;
      setVideoId(videoId);
      setVideo(ylink);
    }
  };

  const handle = (e, data) => {
    setName(data.value);
    seterrorMessagetimerestInstruction("");
    setPicked(true);

    for (var i = 0; i < exercise.length; i++) {
      if (exercise[i].key === data.value) {
        YoutubeUrlChange1(exercise[i].src);
      }
    }
    setVideoShow(true);
  };

  function matchYoutubeUrl(url) {
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
      return url.match(p)[1];
    }
    return false;
  }
  function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  }

  const YoutubeUrlChange = (e) => {
    if (matchYoutubeUrl(actualYoutubeLink) === false) {
      setErrorUrlMessage("Invalid Youtube Url Link");
      // } else if (addExerName === "") {
      //   seterrorMessagetimerestInstruction("");
      //   setErrorUrlMessage("Please enter a name for your workout!");
      // }
    } else {
      const videoId = getId(actualYoutubeLink);
      const ylink = "https://www.youtube.com/embed/" + videoId;
      setVideoId(videoId);
      setVideo(ylink);
      setAdded(true);
      if (addExerName !== "") setName(addExerName);
      setExerName("");
      setModalIsopen2(false);
      setVideoShow(true);
    }
  };

  ////////////////////////////////////////Youtube link and excercise name fields


  //////////////// close  of main plus icon modal  ////////////////
  const closeModal = () => {
    setInstruction("");
    setTime("");
    setRest("");
    setAdded(false);
    setPicked(false);
    setName("");
    setSets("");
    setLink("");
    setVideo("");
    setVideoShow(false);
    setActualYoutubeLink("");
    setUpdate(true);
    seterrorMessagetimerestInstruction("");
    setModalIsopen(false);
    setResponse("");

    seteditingExerciseName(false);
    setExerName("");
  };
 //////////////// close  of main plus icon modal ////////////////

 ///////////////// close add youtube link modal ////////////////
  const closeSecondModal = () => {
    setModalIsopen2(false);
    setExerName("");
    setAdded(false);
    // setName("");
  };
 ///////////////// close add youtube link modal ////////////////
 
///////////////////// validation ///////////////////////////////
  function check(rest, time, Instruction, sets, excerciseName) {
    if (excerciseName === "") {
      seterrorMessagetimerestInstruction("Exercise name can not be empty");
      return false;
    } else if (Instruction === "" && time === "") {
      seterrorMessagetimerestInstruction(
        "Please specify the Time and/or Instruction"
      );
      return false;
    } else if (sets === "") {
      seterrorMessagetimerestInstruction("Please specify the Sets");
      return false;
    } else if (rest === "") {
      seterrorMessagetimerestInstruction("Please specify the Rest");
      return false;
    }
    return true;
  }
///////////////////// validation ///////////////////////////////

///////////////////// buildworkout button appear when we have one item in list///////////////////////
  var BuildWorkoutButtonAppear;
  if (Items.length === 0) BuildWorkoutButtonAppear = null;
  else {
    BuildWorkoutButtonAppear = (
      <div style={{ textAlign: "center" }} className="builderbutton">
        <br></br>
        <br></br>
        <Button
          style={{
            background: "#4DD599",
            borderRadius: "4px",
            color: "white",
            boxShadow: "0px 4px 10px rgba(16, 156, 241, 0.24)",
          }}
          onClick={(e) => {
            if (timerName !== "") {
              setModalIsopen3(true);
              setTimerNameError("");
              setResponse("");
            } else {
              setTimerNameError("Please enter a name for your workout!");
              setResponse("");
            }
          }}
        >
          Build the workout
        </Button>
        <BuildWorkout />
      </div>
    );
  }

  ///////////////////// buildworkout button appear when we have one item in list///////////////////////
 

//////////////////////// video appear when we select exercise from dropdown ///////////////////////////
  var Embedvideo = null;

  if (picked === true || added === true) {
    Embedvideo = (
      <Embed
        id={videoId}
        source="youtube"
        iframe={{
          allowFullScreen: true,

          // autoplay:true
        }}
        active={true}
      />
    );
  }
 
//////////////////////// video appear when we select exercise from dropdown ///////////////////////////


////////////////////// validation in add your youbuelink modal//////////////////////////////////////////
  const ExerName = (e) => {
    setErrorUrlMessage("");
    setExerName(e.target.value);
    seterrorMessagetimerestInstruction("");
  };
  var excerciseNameValue;

  if (excerciseName === "") {
    excerciseNameValue = "Add your Exercise";
    // seterrorMessagetimerestInstruction("Exercise name can not be empty")
  } else {
    excerciseNameValue = excerciseName;
  }

////////////////////// validation in add your youbuelink modal//////////////////////////////////////////


///////////////////// edit specific workout card /////////////////////////////////////////////////////
  const callEdit = (e) => {
    const id = e.target.getAttribute("id");
    console.log("called for edit");
    setTime(Items[id].time);
    setInstruction(Items[id].Instruction);
    setRest(Items[id].rest);
    setSets(Items[id].sets);
    setPicked(true);
    setAdded(true);
    setVideoShow(true);
    setName(Items[id].excerciseName);
    setVideoId(Items[id].videoId);
    setVideo(Items[id].video);
    setResponse("");
    setModalIsopen(true);
    setUpdate(false);
    passingId(id);
  };

///////////////////// edit specific workout card /////////////////////////////////////////////////////

///////////////////// delete specific workout card /////////////////////////////////////////////////////
  const deleteItem = (e) => {
    const id = e.target.getAttribute("id");
    console.log(id);
    
    addList((oldItems) => {

      return oldItems.filter((element, index) => {
        return index !== id;
      });
    });
  };
  
///////////////////// delete specific workout card /////////////////////////////////////////////////////

///////////////////// copy specific workout card /////////////////////////////////////////////////////
  const callCopy = (e) => {
    const id = e.target.getAttribute("id");
    // console.log(Items[id]);

    Items.splice(id + 1, 0, Items[id]);

    console.log(Items.length);
    addList([...Items]);
  };
  
///////////////////// copy specific workout card /////////////////////////////////////////////////////


///////////////////// drag and drop specific workout card /////////////////////////////////////////////////////
  function onSortEnd({ oldIndex, newIndex }) {
    const updatedItems = arrayMove(Items, oldIndex, newIndex);
    addList(updatedItems);
  }
  
///////////////////// drag and drop  specific workout card /////////////////////////////////////////////////////


//////////////////////// return to webpage ///////////////////////////////////////////////////////////////////
  return (
    <div>
      <Modal
        closeIcon
        open={modalIsOpen}
        onClose={closeModal}
        closeOnDimmerClick={true}
        size="small"
      >
        <Form style={{ margin: "5%" }}>
          <Segment className="workoutname" style={{ fontSize: "20px" }}>
            <Input
              transparent
              onChange={(e) => {
                setName(e.target.value);
                seterrorMessagetimerestInstruction("");
                seteditingExerciseName(true);
                setVideoShow(true);
              }}
              value={excerciseName}
              placeholder="Add Your Exercise Name"
              className="workoutname"
              style={{ width: "100%", fontFamily: "Poppins" }}
              icon={<Icon name="pencil alternate" />}
              iconPosition="right"
            ></Input>
          </Segment>

          {/* <Header size="huge" textAlign="center">
            {excerciseNameValue}
          </Header> */}

          <Grid columns="equal" centered>
            <Grid.Row>
              <Grid.Column>
                <p style={{ fontSize: 14, fontWeight: 600 }}>
                  Choose exercise from our library
                </p>
                <Dropdown
                  placeholder="Select"
                  fluid
                  search
                  selection
                  options={exercise}
                  value={excerciseName}
                  onChange={handle}
                  labeled="Choose exercise from our library"
                />
              </Grid.Column>
              <Grid.Column width={2} style={{ marginTop: "6%" }}>
                <Header style={{ textAlign: "center" }}>OR</Header>
              </Grid.Column>

              <Grid.Column style={{ marginTop: "4%" }}>
                <Button
                  onClick={(e) => {
                    setModalIsopen2(true);
                    setVideo("");
                    // setName("");
                    setActualYoutubeLink("");
                  }}
                  fluid
                >
                  Add your own video link
                </Button>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column textAlign="center">
                {isVideoShow && Embedvideo}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Form.Group widths="equal">
                  <Form.Field
                    label="Time (s)"
                    control="input"
                    value={time}
                    onChange={(e) => {
                      setTime(e.target.value);

                      seterrorMessagetimerestInstruction("");
                    }}
                    type="number"
                    min="1"
                  />

                  <Form.Field
                    label="Rest (s)"
                    control="input"
                    value={rest}
                    onChange={(e) => {
                      setRest(e.target.value);
                      seterrorMessagetimerestInstruction("");
                    }}
                    type="number"
                    min="0"
                  />
                  <Form.Field
                    label="Sets"
                    control="input"
                    value={sets}
                    onChange={(e) => {
                      setSets(e.target.value);
                      seterrorMessagetimerestInstruction("");
                    }}
                    type="number"
                    min="0"
                  />
                </Form.Group>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field
                      label="Instructions"
                      control="input"
                      value={Instruction}
                      type="text"
                      onChange={(e) => {
                        if (e.target.value.length <= 60)
                          setInstruction(e.target.value);
                      }}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Header.Content style={{ color: "red", textAlign: "center" }}>
                  {errorMessagetimerestInstruction}
                </Header.Content>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <div className="builderbutton">
                <Button
                  type="submit"
                  onClick={listOfItems}
                  size="medium"
                  style={{ background: "#4DD599", color: "white", size: 40 }}
                >
                  Save
                </Button>
              </div>
            </Grid.Row>
            {/* <Divider hidden /> */}
          </Grid>
        </Form>
      </Modal>

      <Grid>
        {/* ////////////////////////////////////// timer Name editable text segment //////////////////////////////// */}
        <Grid.Row style={{ marginLeft: "6%", marginRight: "6%" }}>
          <Header style={{ color: "red" }}>{TimerNameError}</Header>

          <Segment.Group style={{ width: "100%" }}>
            <Segment className="workoutname" style={{ fontSize: "24px" }}>
              <Input
                transparent
                onChange={(e) => {
                  setWorkoutName(e.target.value);
                  setTimerNameError("");
                }}
                value={timerName}
                placeholder="Add Workout Name"
                className="workoutname"
                style={{ width: "100%", fontFamily: "Poppins" }}
                icon={<Icon name="pencil alternate" />}
                iconPosition="left"
              ></Input>
            </Segment>
            <Segment>
              <Input
                transparent
                placeholder="Add instructions for the workout"
                onChange={(e) => settimerDescription(e.target.value)}
                value={timerDescription}
                style={{ width: "100%" }}
              />
            </Segment>
          </Segment.Group>
        </Grid.Row>
        {/* ////////////////////////////////////// timer Name editable text segment //////////////////////////////// */}


        {/* /////////////////////////////////////// Card Print//////////////////////////////////////////////// */}

        <Grid.Row style={{ marginLeft: "2.5%" }}>
          {/* <GridList spacing={20} cellHeight={320} cols="md"> */}

          <br />
          <br />
          <br />
          <br />
          {/* ///////////////////// Item container called for drag and drop ///////////////////////////// */}
          <ItemContainer items={Items} onSortEnd={onSortEnd} axis={"xy"} />
          {/* ///////////////////// Item container called for drag and drop ///////////////////////////// */}

          {/* //////////////////////////////// plus icon button ////////////////////////////////////////////// */}
          <Button
            onClick={twomethod}
            icon="add"
            style={{
              width: 150,
              height: 150,
              marginLeft: 100,
              marginTop: 110,
            }}
          ></Button>
          {/* //////////////////////////////// plus icon button ////////////////////////////////////////////// */}

          {/* <ListView data={Items}/> */}
          {/* <DragList data={Items}/> */}
          {/* {Items.map((item, index) => {
              return (
                <div className="view">
                  <View
                    key={index}
                    id={index}
                    data={item}
                    onSelect={deleteItem}
                    onEdit={callEdit}
                    videoId={item.videoId}
                    onCopy={callCopy}
                  />
                </div>
              );
            })} */}

          {/* <Button
          onClick={twomethod}
          icon="add"
          style={{
            width: 150,
            height: 150,
            marginLeft: 100,
            marginTop: 110,
          }}
        ></Button> */}

          {/* </GridList> */}
        </Grid.Row>

        {/* /////////////////////////////////////// Card Print//////////////////////////////////////////////// */}

        {/* ////////////////////////////////// buildworkout button appear /////////////////////////////////////// */}
        <Grid.Row>
          <Grid.Column style={{ textAlign: "center" }}>
            <br />
            <br />
            {BuildWorkoutButtonAppear}
          </Grid.Column>
        </Grid.Row>
        {/* ////////////////////////////////// buildworkout button appear /////////////////////////////////////// */}

        {/* ////////////////////////////////////// add youtubelink modal //////////////////////////////////////// */}
        <Modal
          closeIcon
          onClose={closeSecondModal}
          open={modalIsOpen2}
          size="tiny"
          closeOnDimmerClick={true}
          className="modal2"
          // style={{ marginTop: "10%" }}
        >
          <Form style={{ margin: 30 }}>
            <Grid columns="equal">
              <Grid.Row>
                <Grid.Column>
                  <Header textAlign="center">Add Exercise</Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Form.Input
                    label="Video link from Youtube"
                    value={actualYoutubeLink}
                    onChange={(e) => {
                      setActualYoutubeLink(e.target.value);
                      setErrorUrlMessage("");
                    }}
                    fluid
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>
                  <Form.Input
                    label="Exercise Name"
                    // value={excerciseName}
                    onChange={ExerName}
                    fluid
                  />
                  <Header.Content style={{ color: "red" }}>
                    {wrongurl}
                  </Header.Content>
                </Grid.Column>
              </Grid.Row>
              {/* <Grid.Row>
              <Grid.Column width={1}>
                <Header>Or</Header>
              </Grid.Column>
              <Grid.Column>
                <Button icon labelPosition="left" onClick={getFile}>
                  <Icon name="file" />
                  Choose File
                </Button>
                <input
                  type="file"
                  id="file"
                  name="filename"
                  onChange={(e) => setUploadFile(e.target.files)}
                  style={{ display: "none" }}
                  multiple
                />
                {uploadedFile}
              </Grid.Column>
            </Grid.Row> */}

              <Grid.Row>
                <Grid.Column style={{ textAlign: "center" }}>
                  <Button
                    onClick={YoutubeUrlChange}
                    style={{
                      background: "#4DD599",
                      borderRadius: "4px",
                      color: "white",
                      boxShadow: "0px 4px 10px rgba(16, 156, 241, 0.24)",
                    }}
                  >
                    Save to Library
                  </Button>

                  <Button
                    onClick={(e) => {
                      setModalIsopen2(false);
                      setLink("");
                      setErrorUrlMessage("");
                    }}
                  >
                    Cancel
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Modal>
        {/* ////////////////////////////////////// add youtubelink modal //////////////////////////////////////// */}
      </Grid>
    </div>
  );
};

export default Modalcall;
