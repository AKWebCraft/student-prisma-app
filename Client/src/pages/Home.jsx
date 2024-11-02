import Banner from "../components/Banner";
import Student from "../components/Student";
import student1 from "../assets/student 1.jpeg";

const Home = () => {
  const student = {
    name: "John Doe",
    className: "10th Grade",
    contact: "123-456-7890",
    photo: student1,
  };
  return (
    <div className="min-h-screen">
      <Banner />
      <div className="mt-11">
        <Student student={student} />
      </div>
    </div>
  );
};

export default Home;
