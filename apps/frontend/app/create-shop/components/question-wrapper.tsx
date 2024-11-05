interface IQuestionWrapperProps {
  children: React.ReactNode;
  value: string | object;
  onValueChange: (value: string | object) => void;
  options: string[] | object[];
}

const QuestionWrappper = () => {
  return <div>QuestionWrappper</div>;
};

export default QuestionWrappper;
