
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { TableBody, TableCell, TableRow, Table, TableHead, TableContainer, Paper, Button, makeStyles } from "@material-ui/core";
import { changeQuestionStatus, searchQuestionById,getAllQusetions } from "../../../redux/actions/questionAction";
import Auth from "../../../helper/Auth";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  tableBorder: {
    background: '#e7e7e7',
    padding: '15px',
  },
  tableHeader: {
    background: '#3f51b5',
    color: 'white',
  },
}));

const QuestionTable = ({changeQuestionStatus, searchQuestionById, getAllQusetions  }) => {
  const classes = useStyles();

  const [questionList , setQuestionsList] = useState([]);

  useEffect(() => {
    async function getAns(params) {
      const response = await axios.get("http://localhost:5000/api/v1/user/getAllQuestions",{
        headers:{
          'Authorization':`Bearer ${Auth.retriveToken()}`
        }
      });

      if(response){
        console.log(response.data);
        setQuestionsList(response.data.allQuestions);
      }
    }
    getAns();
  }, [getAllQusetions]);

  const viewQuestion = (id) => {
    searchQuestionById(id);
  };

  const onQuestionStatusChange = (id, status) => {
    changeQuestionStatus({ id, status: !status });
  };

  return (
    <div className={classes.tableBorder}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>No.</TableCell>
              <TableCell align="left" className={classes.tableHeader}>Question</TableCell>
              <TableCell className={classes.tableHeader}>Status</TableCell>
              <TableCell className={classes.tableHeader}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questionList.map((question, index) => (
              <TableRow key={question._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell onClick={() => viewQuestion(question._id)}>{question.body}</TableCell>
                <TableCell style={{ color: question.status ? 'green' : 'red' }}>
                  {question.status ? 'Active' : 'Blocked'}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => onQuestionStatusChange(question._id, question.status)}
                    style={{ background: question.status ? '#ff0000aa' : '#00ff0088' }}
                  >
                    {question.status ? 'Block' : 'Unblock'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const mapStatetoProps = (state) => ({
  questionlist: state.questionDetails.list,
});

export default connect(mapStatetoProps, {
  changeQuestionStatus,
  searchQuestionById,
  getAllQusetions
})(QuestionTable);
