import Notes from "../components/Notes";
export const Home1 = (props) => {
  const {showAlert} = props;
  return (
    <div>
      <Notes showAlert={showAlert} />
    </div>
  );
};

export default Home1;
