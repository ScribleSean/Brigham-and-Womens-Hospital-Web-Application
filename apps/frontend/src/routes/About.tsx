import React from "react";
import styles from "../styles/About.module.css";
import Christian from "../../public/ChristianBackgroundRemoved.png";
import Ethan from "../../public/EthanBackgroundRemoved.png";
import Gabe from "../../public/GabrielBackgroundRemoved.png";
import Gus from "../../public/GustaveBackgroundRemoved.png";
import Jose from "../../public/JoseBackgroundRemoved.png";
import Lorenzo from "../../public/LorenzoBackgroundRemoved.png";
import Maddux from "../../public/MadduxBackgroundRemoved.png";
import Peter from "../../public/PeterBackgroundRemoved.png";
import Sean from "../../public/SeanBackgroundRemoved.png";
import Sofia from "../../public/SofiaBackgroundRemoved.png";
import Timothy from "../../public/TimothyBackgroundRemoved.png";
import { Box, Container } from "@mui/material";
//import { Container, Box } from "@mui/material";

function About() {
  const everyone = [
    {
      gamertag: "ScribleSean",
      description: "Full-Stack Developer",
      quote:
        '"First, solve the problem. Then, write the code." - John Johnson',
      image: Sean,
    },
    {
      gamertag: "Maddux Berry",
      description: "Project Manager / Full-Stack Developer",
      quote:
        '"If possible, as far as it depends on you, live at peace with everyone." - Romans 12:18',
      image: Maddux,
    },
    {
      gamertag: "Lorenzo Cassano",
      description: "Full-Stack Developer",
      quote:
        '"In the kingdom of the blind, the one-eyed man is king." - Desiderius Erasmus',
      image: Lorenzo,
    },
    {
      gamertag: "Christian Consiglio",
      description: "Full-Stack Developer",
      quote:
        '"There\'s smoke in my iris. But I painted a sunny day on the insides of my eyelids" - Aesop Rock',
      image: Christian,
    },
    {
      gamertag: "Peter Czepiel",
      description: "Full-Stack Developer",
      quote:
        '"Real G\'s move in silence like lasagna" -Lil Wayne 6 Foot 7 Foot',
      image: Peter,
    },
    {
      gamertag: "Ethan Glasby",
      description: "Product Owner / Full-Stack Developer",
      quote:
        '"And such were some of you: but ye are washed, but ye are sanctified, but ye are justified in the name of the Lord Jesus, and by the Spirit of our God." - 1 Corinthians 6:11',
      image: Ethan,
    },
    {
      gamertag: "Timothy Hutzley",
      description: "Scrum Master / Full-Stack Developer",
      quote:
        '"I don\'t really care about fame or recognition. I just totally dig on advancing knowledge!" -Jimmy Lightning, Peggle',
      image: Timothy,
    },
    {
      gamertag: "José Manuel Pérez Jiménez",
      description: "Full-Stack Developer",
      quote: '"Un vaso es un vaso y un plato es un plato" - Mariano Rajoy',
      image: Jose,
    },
    {
      gamertag: "Gustave Montana",
      description: "Full-Stack Developer",
      quote:
        '"In theory there\'s no difference between theory and practice. In practice there is." - Yogi Berra',
      image: Gus,
    },
    {
      gamertag: "Gabriel Olafsson",
      description: "Full-Stack Developer",
      quote:
        '"I be goofy, kinda funny. Acting stupid but they love me." - Mac Miller',
      image: Gabe,
    },
    {
      gamertag: "Sofia Xie",
      description: "Document Analyst / Full-Stack Developer",
      quote: '"Fashion over function"',
      image: Sofia,
    },
  ];
  return (
    <div className={styles.pageContainer}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1vh",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#F0F0F0",
            borderRadius: "10px",
            width: "95%",
            padding: "10px",
            textAlign: "center",
            fontColor: "#F00E0E",
          }}
        >
          <div style={{ fontSize: 18, color: "#F00E0E" }}>
            The Brigham & Women’s Hospital maps and data used in this
            application are copyrighted and provided for the sole use of
            educational purposes.
          </div>
        </Box>
      </Container>

      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2vw",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "10px",
            width: "120%",
            padding: "30px",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              marginBottom: "4vh",
              width: "100%",
            }}
          >
            <h1
              style={{
                fontSize: 50,
                color: "#012D5A",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Meet the Team
            </h1>
          </Box>

          {/*Big Box 1*/}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              textAlign: "left",
              width: "100%",
              fontSize: 20,
              fontColor: "#012d5a",
            }}
          >
            {/*Box 1*/}

            <Box
              sx={{
                flexBasis: "30%",
                marginRight: "10px",
                backgroundColor: "white",
                height: "60%",
                minHeight: "45vh",
                fontColor: "#012d5a",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#59B7CF",
                  width: "100%",
                }}
              >
                <img
                  src={everyone[0].image}
                  alt="Team Image"
                  style={{
                    width: "100%",
                    maxHeight: "230px",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <div
                style={{
                  fontSize: 20,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[0].gamertag}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[0].description}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[0].quote}
              </div>
            </Box>

            {/*Box 2*/}

            <Box
              sx={{
                flexBasis: "30%",
                marginRight: "10px",
                backgroundColor: "white",
                height: "60%",
                minHeight: "45vh",
                fontColor: "#012d5a",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#6EB5FF",
                  width: "100%",
                }}
              >
                <img
                  src={everyone[1].image}
                  alt="Team Image"
                  style={{
                    width: "100%",
                    maxHeight: "230px",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <div
                style={{
                  fontSize: 20,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[1].gamertag}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[1].description}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[1].quote}
              </div>
            </Box>

            {/*Box 3*/}

            <Box
              sx={{
                flexBasis: "30%",
                marginRight: "10px",
                backgroundColor: "white",
                height: "60%",
                minHeight: "45vh",
                fontColor: "#012d5a",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#40BBE0",
                  width: "100%",
                }}
              >
                <img
                  src={everyone[2].image}
                  alt="Team Image"
                  style={{
                    width: "100%",
                    maxHeight: "230px",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <div
                style={{
                  fontSize: 20,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[2].gamertag}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[2].description}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[2].quote}
              </div>
            </Box>
          </Box>

          {/*Big Box 2*/}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              textAlign: "left",
              width: "100%",
              fontSize: 20,
              fontColor: "#012d5a",
            }}
          >
            {/*Box 4*/}

            <Box
              sx={{
                flexBasis: "30%",
                marginRight: "10px",
                backgroundColor: "white",
                height: "60%",
                minHeight: "45vh",
                fontColor: "#012d5a",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#60A3E0",
                  width: "100%",
                }}
              >
                <img
                  src={everyone[3].image}
                  alt="Team Image"
                  style={{
                    width: "100%",
                    maxHeight: "230px",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <div
                style={{
                  fontSize: 20,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[3].gamertag}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[3].description}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[3].quote}
              </div>
            </Box>

            {/*Box 5*/}

            <Box
              sx={{
                flexBasis: "30%",
                marginRight: "10px",
                backgroundColor: "white",
                height: "60%",
                minHeight: "45vh",
                fontColor: "#012d5a",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#4194E0",
                  width: "100%",
                }}
              >
                <img
                  src={everyone[4].image}
                  alt="Team Image"
                  style={{
                    width: "100%",
                    maxHeight: "230px",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <div
                style={{
                  fontSize: 20,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[4].gamertag}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[4].description}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[4].quote}
              </div>
            </Box>

            {/*Box 6*/}

            <Box
              sx={{
                flexBasis: "30%",
                marginRight: "10px",
                backgroundColor: "white",
                height: "60%",
                minHeight: "45vh",
                fontColor: "#012d5a",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#59B7CF",
                  width: "100%",
                }}
              >
                <img
                  src={everyone[5].image}
                  alt="Team Image"
                  style={{
                    width: "100%",
                    maxHeight: "230px",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <div
                style={{
                  fontSize: 20,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[5].gamertag}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[5].description}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[5].quote}
              </div>
            </Box>
          </Box>

          {/*Big Box 3*/}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              textAlign: "left",
              width: "100%",
              fontSize: 20,
              fontColor: "#012d5a",
            }}
          >
            {/*Box 7*/}

            <Box
              sx={{
                flexBasis: "30%",
                marginRight: "10px",
                backgroundColor: "white",
                height: "60%",
                minHeight: "45vh",
                fontColor: "#012d5a",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#4194E0",
                  width: "100%",
                }}
              >
                <img
                  src={everyone[6].image}
                  alt="Team Image"
                  style={{
                    width: "100%",
                    maxHeight: "230px",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <div
                style={{
                  fontSize: 20,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[6].gamertag}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[6].description}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[6].quote}
              </div>
            </Box>

            {/*Box 8*/}

            <Box
              sx={{
                flexBasis: "30%",
                marginRight: "10px",
                backgroundColor: "white",
                height: "60%",
                minHeight: "45vh",
                fontColor: "#012d5a",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#40BBE0",
                  width: "100%",
                }}
              >
                <img
                  src={everyone[7].image}
                  alt="Team Image"
                  style={{
                    width: "100%",
                    maxHeight: "230px",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <div
                style={{
                  fontSize: 20,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[7].gamertag}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[7].description}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[7].quote}
              </div>
            </Box>

            {/*Box 9*/}

            <Box
              sx={{
                flexBasis: "30%",
                marginRight: "10px",
                backgroundColor: "white",
                height: "60%",
                minHeight: "45vh",
                fontColor: "#012d5a",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#60A3E0",
                  width: "100%",
                }}
              >
                <img
                  src={everyone[8].image}
                  alt="Team Image"
                  style={{
                    width: "100%",
                    maxHeight: "230px",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <div
                style={{
                  fontSize: 20,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[8].gamertag}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[8].description}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[8].quote}
              </div>
            </Box>
          </Box>

          {/*Big Box 4*/}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              textAlign: "left",
              width: "100%",
              fontSize: 20,
              fontColor: "#012d5a",
            }}
          >
            {/*Box 10*/}

            <Box
              sx={{
                flexBasis: "30%",
                marginRight: "10px",
                marginLeft: "15%",
                backgroundColor: "white",
                height: "60%",
                minHeight: "45vh",
                fontColor: "#012d5a",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#6EB5FF",
                  width: "100%",
                }}
              >
                <img
                  src={everyone[9].image}
                  alt="Team Image"
                  style={{
                    width: "100%",
                    maxHeight: "230px",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <div
                style={{
                  fontSize: 20,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[9].gamertag}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[9].description}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[9].quote}
              </div>
            </Box>

            {/*Box 11*/}

            <Box
              sx={{
                flexBasis: "30%",
                marginRight: "15%",
                marginLeft: "10px",
                backgroundColor: "white",
                height: "60%",
                minHeight: "45vh",
                fontColor: "#012d5a",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#60A3E0",
                  width: "100%",
                }}
              >
                <img
                  src={everyone[10].image}
                  alt="Team Image"
                  style={{
                    width: "100%",
                    maxHeight: "230px",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <div
                style={{
                  fontSize: 20,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[10].gamertag}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[10].description}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: "#012D5A",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {everyone[10].quote}
              </div>
            </Box>
          </Box>
        </Box>
      </Container>

      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1vh",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#F0F0F0",
            borderRadius: "10px",
            width: "75%",
            padding: "10px",
            textAlign: "center",
            fontColor: "black",
          }}
        >
          <div style={{ fontSize: 16, color: "black" }}>
            Special thanks to Brigham and Women’s Hospital and their
            representative, Andrew Shinn
          </div>
          <div style={{ fontSize: 12, color: "black" }}> - - - - - </div>
          <div style={{ fontSize: 16, color: "black" }}>
            WPI Computer Science Department
          </div>
          <div style={{ fontSize: 16, color: "black" }}>
            CS3733-D24 Software Engineering
          </div>
          <div style={{ fontSize: 16, color: "black" }}>Prof. Wilson Wong</div>
          <div style={{ fontSize: 16, color: "black" }}>
            Team Coach Joseph Cardarelli
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default About;
