import React from "react";
import { connect } from "react-redux";
import { Button, makeStyles } from "@material-ui/core";
import QuestionSearchBox from "../../atoms/SearchBox/QuestionSearchBox";
import QuestionTable from "../../molecues/QuestionsTable/QuestionTable";
import ViewnUpdateQuestion from "../ViewnUpdateQuestion/ViewnUpdateQuestion";
import { searchQuestion, goBacktoSearch } from "../../../redux/actions/questionAction";

const useStyles = makeStyles((theme) => ({
  questionDetails: {
    margin: '20px',
    display: 'inline-block',
    textAlign: 'center',
  },
}));

const QuestionDetails = ({ questionDetails, searchQuestion, goBacktoSearch }) => {
  const classes = useStyles();

  const renderContent = () => {
    if (!questionDetails.searched) {
      return (
        <>
          <QuestionSearchBox searchCallback={searchQuestion} />
          <QuestionTable />
        </>
      );
    }

    if (questionDetails.question?._id) {
      return (
        <>
          <QuestionSearchBox searchCallback={searchQuestion} />
          <br />
          <ViewnUpdateQuestion />
          <Button onClick={goBacktoSearch}>Back</Button>
        </>
      );
    }

    return <QuestionSearchBox searchCallback={searchQuestion} />;
  };

  return <div className={classes.questionDetails}>{renderContent()}</div>;
};

const mapStatetoProps = (state) => ({
  questionDetails: state.questionDetails,
});

export default connect(mapStatetoProps, {
  searchQuestion,
  goBacktoSearch,
})(QuestionDetails);
