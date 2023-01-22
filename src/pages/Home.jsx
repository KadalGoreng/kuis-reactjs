import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Container, Alert, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

function Home() {
  const [questions, setQuestions] = useState();
  const [answer, setAnswer] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [checkedTrue, setCheckedTrue] = useState(false);
  const [checkedFalse, setCheckedFalse] = useState(false);
  const [timer, setTimer] = useState(500);

  const navigate = useNavigate();
  const user = localStorage.getItem("username");

  useEffect(() => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=boolean`
      )
      .then((res) => {
        setQuestions(res.data.results);
      });
  }, []);

  console.log(questions);
  const handleSubmit = () => {
    if (answer) {
      if (answer == questions[currentQuestion].correct_answer) {
        setScore(score + 10);
      }
      setCurrentQuestion(currentQuestion + 1);
      setCheckedTrue(false);
      setCheckedFalse(false);
      setAnswer("");
    }
  };

  const checkedAnswer = (label, lawan) => {
    if (lawan) {
      lawan(false);
      label(true);
    } else {
      label(true);
    }
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (currentQuestion < 10 && timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);
    return () => {
      clearInterval(countdown);
    };
  }, [timer]);

  const minute = Math.floor(timer / 60);
  const second = timer % 60;

  if (!user) {
    navigate("/");
  }

  if (!questions)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Loader />;
      </div>
    );

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Row className="mb-5">
        <Col>
          {questions && currentQuestion !== 10 && timer > 0 && (
            <div>
              <h4 className="mb-4">Hi, {user.replace("@gmail.com", "")}</h4>
              <div className="text-center">
                <Alert variant="warning">
                  <strong>Petunjuk: </strong>Tentukan apakah pernyataan berikut
                  ini benar atau salah, setiap jawaban benar akan mendapat score
                  10. Anda dinyatakan lolos jika score minimal 70
                </Alert>
                <h4 className="text-end">{`${minute} menit ${second} detik`}</h4>
                <h1>{`${currentQuestion}/${questions.length}`}</h1>
                <h4>
                  {`${currentQuestion + 1}. ${
                    questions[currentQuestion].question
                  }`}
                </h4>
                True{" "}
                <input
                  className="me-4"
                  type="radio"
                  checked={checkedTrue}
                  name="quis"
                  value="True"
                  onChange={(e) => {
                    setAnswer(e.target.value),
                      setCheckedTrue(true),
                      checkedAnswer(setCheckedTrue, setCheckedFalse);
                  }}
                />
                False{" "}
                <input
                  type="radio"
                  name="quis"
                  checked={checkedFalse}
                  value="False"
                  onChange={(e) => {
                    setAnswer(e.target.value),
                      setCheckedFalse(true),
                      checkedAnswer(setCheckedFalse, setCheckedTrue);
                  }}
                />
                <div className="mt-3">
                  <Button size="sm" onClick={handleSubmit} variant="success">
                    Selanjutnya
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Col>
        {(currentQuestion > 9 || timer == 0) && (
          <div className="text-center">
            <h1>Score kamu: {score}</h1>
            <h5>
              {`Jawaban benar: ${score.toString().slice(0, 1)} soal`}
              <br />
              {`Jawaban salah: ${
                currentQuestion - score.toString().slice(0, 1)
              } soal`}
              <br />
              {`Total jawab: ${currentQuestion}`}
            </h5>
            {score >= 70 ? (
              <h3>Selamat kamu lolos</h3>
            ) : (
              <div>
                <h3>Sayang sekali kamu tidak lolos, yuk coba lagi</h3>
              </div>
            )}
            <Button
              onClick={() => window.location.reload(false)}
              size="sm"
              variant="primary"
            >
              Coba lagi
            </Button>
          </div>
        )}
      </Row>
    </Container>
  );
}

export default Home;
