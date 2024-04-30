import React, { useState, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

const StartScreen = () => {
  const startScreenContainer = {
    height: "100%",
    background:
      "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('/backgroundCancerGame.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    color: "white",
  };

  const gameTitle = {
    fontFamily: "'Halogen Rough by Pixel Surplus', sans-serif",
    fontSize: "4rem",
    textDecoration: "underline",
  };

  const gameDescription = {
    fontFamily: "'Halogen by Pixel Surplus', sans-serif",
    fontSize: "2rem",
    paddingLeft: "15%",
    paddingRight: "15%",
  };

  const gameInstructionsHeader = {
    fontFamily: "'Halogen by Pixel Surplus', sans-serif",
    fontSize: "2rem",
    paddingLeft: "15%",
    paddingRight: "15%",
    textDecoration: "underline",
  };

  const gameInstructionsBody = {
    fontFamily: "'Halogen by Pixel Surplus', sans-serif",
    fontSize: "2rem",
    paddingLeft: "15%",
    paddingRight: "15%",
  };

  const imageRef1 = useRef(null);
  const imageRef2 = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const username = event.target.elements[0].value; // get the value of the text input

    axios
      .post("/api/sign-in-brig-user", { username })
      .then((response) => {
        // handle response here
        console.log(response.data);
        window.location.href = "/character-select";
      })
      .catch((error) => {
        // handle error here
        console.error(error);
      });
  };

  return (
    <div
      id={"startScreenContainer"}
      style={startScreenContainer}
      className={"container-fluid"}
    >
      <div id={"gameTitle"} style={gameTitle} className={"text-center"}>
        Brigham Breakout!
      </div>
      <div
        id={"gameDescription"}
        style={gameDescription}
        className={"text-center pt-5"}
      >
        Oh No, There's been a contamination leak at Brigham and Women's
        Hospital! See how long you can survive the outbreak of diseases!
      </div>
      <div
        id={"gameInstructionsHeader"}
        style={gameInstructionsHeader}
        className={"text-center pt-5"}
      >
        How To Play:
      </div>
      <div
        id={"gameInstructionsBody"}
        style={gameInstructionsBody}
        className={"text-center pt-5"}
      >
        Use the arrow keys or WASD to move your character around, dodging all
        diseases that fly across the screen. Upon colliding with a disease, you
        will lose one heart. Look out for hearts that appear to refill lost
        health. Survive as long as you can! Your score is your final time.
      </div>
      <div className={"row"}>
        <div className={"col px-5 text-end"}>
          <img
            id="arrowKey"
            ref={imageRef1}
            src={"/arrowKeys.png"}
            alt="Arrow Keys"
            width={225}
            height={202}
          />
        </div>
        <div className={"col px-5 pt-5"}>
          <img
            id="wasd"
            ref={imageRef2}
            src={"/wasd.png"}
            alt="WASD Keys"
            width={225}
            height={150}
          />
        </div>
      </div>
      <div>
        <Button onClick={() => setShowModal(true)}>PLAY</Button>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit}>
            <input type="text" required />
            <Button type="submit">PLAY</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StartScreen;
