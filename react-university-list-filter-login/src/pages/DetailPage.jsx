import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";

const DetailPage = () => {
  const [university, setUniversity] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`universities/${id}`)
      .then((res) => setUniversity(res.data))
      .catch((err) => {
        console.log(err);
        navigate("/undefined", { state: err.message });
      });
  }, []);

  return (
    <div className=" md:mt-20">
      {!university ? (
        <p className="flex justify-center items-center">Loading.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-5 p-2">
          <div className="flex justify-center items-center sm:w-full sm:h-auto">
            <img
              src={university.image}
              className="w-150 h-150 rounded shadow"
              alt={university.name}
            />
          </div>
          <div className="flex flex-col justify-center xl:mr-20">
            <h4 className="text-2xl font-bold mb-4">{university.name}</h4>
            <UniversityInfo label={"Country:"} value={university.country} />
            <UniversityInfo label={"Language:"} value={university.language} />
            <UniversityInfo
              label={"Departments"}
              value={university.top_departments.join(", ")}
            />
            <UniversityInfo label={"Duration:"} value={university.duration} />
            <UniversityInfo
              label={"Description:"}
              value={university.description}
            />
            <UniversityInfo label={"Deadline:"} value={university.deadline} />
          </div>
        </div>
      )}
    </div>
  );
};

const UniversityInfo = ({ label, value }) => {
  return (
    <div className="mb-2">
      <span className="font-semibold">{label}</span> {value}
    </div>
  );
};

export default DetailPage;
