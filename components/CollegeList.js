// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link"
// import Image from "next/image"
// import Univ from "../public/university.png"

// const CollegeList = () => {
//     const apiUrl = process.env.API_URL;
//     const [colleges, setColleges] = useState([]);

//     useEffect(() => {
//         const getColleges = async () => {
//             try {
//                 const res = await fetch(`/api/colleges`, {
//                     cache: 'no-store',
//                 })
//                 if (!res.ok) {
//                     throw new Error("Failed to fetch Collegs")
//                 }
//                 const data = await res.json();
//                 setColleges(data.colleges);
//             } catch (error) {
//                 console.log("Error Loading Collegs", error);
//             }
//         }

//         getColleges();
//     }, []);
//     return (
//         <div>
//             {colleges.length > 0 ? (
//                 <div className="row gx-5 justify-content-center py-5">
//                     {colleges.map((coll) => (
//                         <div className="col-lg-6 col-xl-4" key={coll._id}>
//                             <Link href={`/college/${coll._id}`} style={{ textDecoration: "none" }}>
//                                 <div className="card mb-5 mb-xl-0 shadow">
//                                     <div className="card-body p-5 d-flex justify-content-between align-items-center">
//                                         <div className="mb-3">
//                                             <span className="display-4 fw-bold">{coll.college_name}</span>
//                                         </div>
//                                         <div className="img-fluid mb-3">
//                                             <Image src={Univ} alt="..." className="img-fluid" width={90} quality={100} />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </Link>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <h4 className="text-center">No colleges available.</h4>
//             )}
//         </div>
//     )
// }

// export default CollegeList

// components/CollegeList.js

// components/CollegeList.js
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import Univ from "../public/university.png";

const CollegeListContainer = styled.div`
  padding: 2rem;
  text-align: center;
`;

const CollegeCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.02);
  }
`;

const CardBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
`;

const CollegeName = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`;

const CollegeList = () => {
  const apiUrl = process.env.API_URL;
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getColleges = async () => {
      try {
        const res = await fetch(`/api/colleges`, {
          cache: 'no-store',
        });
        if (!res.ok) {
          throw new Error("Failed to fetch colleges");
        }
        const data = await res.json();
        setColleges(data.colleges);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getColleges();
  }, []);

  if (loading) {
    return <CollegeListContainer>Loading...</CollegeListContainer>;
  }

  if (error) {
    return <CollegeListContainer>Error: {error}</CollegeListContainer>;
  }

  return (
    <CollegeListContainer>
      {colleges.length > 0 ? (
        <div className="row gx-5 justify-content-center py-5">
          {colleges.map((coll) => (
            <div className="col-lg-6 col-xl-4" key={coll._id}>
              <Link href={`/college/${coll._id}`} passHref legacyBehavior>
                <CollegeCard>
                  <CardBody>
                    <CollegeName>{coll.college_name}</CollegeName>
                    <Image src={Univ} alt="University logo" width={90} quality={100} />
                  </CardBody>
                </CollegeCard>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <h4>No colleges available.</h4>
      )}
    </CollegeListContainer>
  );
};

export default CollegeList;
