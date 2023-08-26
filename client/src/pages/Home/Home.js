import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./Home.css";
import Question from "../../Components/Question/Question";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  const [allQuestions, setAllQuestions] = useState([]);
  const [search, setSearcher] = useState("");
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    if (!userData.user) navigate("/login");
  }, [userData.user, navigate]);

  useEffect(() => {
    // Fetch questions
    const fetchQuestions = async () => {
      try {
        const questionRes = await axios.get(
          "http://localhost:4000/api/questions"
        );
        console.log("Fetched questions:", questionRes.data.data);
        setAllQuestions(questionRes.data.data);
      } catch (err) {
        console.log("problem", err);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    // Apply search filter
    const filteredQuestions = allQuestions.filter(
      (q) =>
      q.question_description &&
        q.question && q.question.toLowerCase().includes(search.toLowerCase())
    );
    setFilterData(filteredQuestions);
  }, [search, allQuestions]);

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/ask-question");
  };

  const handleSearchInputChange = (e) => {
    const searchQuery = e.target.value;
    setSearcher(searchQuery);

    // Apply search filter
    const filteredQuestions = allQuestions.filter(
      (q) =>
        q.question &&
        q.question.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilterData(filteredQuestions);
  };

  return (
    <div className="container-fluid home-container px-5">
      <div className="d-flex mb-3 justify-content-between  all">
        <button className="ask_button" onClick={handleClick}>
          Ask Question
        </button>
        <input
          className="search_bar"
          type="text"
          placeholder="Search Question"
          onChange={handleSearchInputChange}
        />
        <h4>Welcome: {userData.user?.display_name}</h4>
      </div>
      <div>
        {search === "" && (
          <>
            <h3>Questions</h3>
            {allQuestions.map((question) => (
              <div key={question.post_id} className="all">
                <br />
                <Link
                  to={`questions/${question.post_id}`}
                  className="text-decoration-none text-reset question_title"
                >
                  <Question
                    question={question.question}
                    userName={question.user_name}
                  />
                  <div className="question_arrow">
                    <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                  </div>
                </Link>
              </div>
            ))}
          </>
        )}
      </div>
      {search !== "" && (
        <>
          <h3>Filtered Questions</h3>
          <div>
            {filterData.length === 0 ? (
              <div>No Result Found</div>
            ) : (
              filterData.map((qu, index) => (
                <div key={index}>
                  <br />
                  <Link
                    to={`questions/${qu.post_id}`}
                    className="text-decoration-none text-reset question_title"
                  >
                    <Question question={qu.question} userName={qu.user_name} />
                    <div className="question_arrow">
                      <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;