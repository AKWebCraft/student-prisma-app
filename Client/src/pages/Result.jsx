import StudentResult from "../components/StudentResult";
import { useEffect, useState } from "react";
import { getMarks } from "../api/Api";
import { useSelector } from "react-redux";

const Result = () => {
  const { id, name, image } = useSelector((state) => state.user);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchMarks = async () => {
      const response = await getMarks(id);

      if (response.status === 200) {
        const { english, geography, history, mathematics, science } =
          response.data.marks[0];
        const results = [
          { book: "Mathematics", marks: mathematics },
          { book: "English", marks: english },
          { book: "Science", marks: science },
          { book: "History", marks: history },
          { book: "Geography", marks: geography },
        ];
        setBooks(results);
      }
    };

    fetchMarks();
  }, [id]);

  // console.log(books);
  const student = {
    name: name,
    photo: image,
    results: books.length > 0 ? books : []
  };
  return (
    <div>
      <StudentResult student={student} />
    </div>
  );
};

export default Result;
