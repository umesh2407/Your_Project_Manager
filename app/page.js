// import { Suspense } from 'react';
// import Loading from "./loading"
// import CollegeList from '@/components/CollegeList'
// import Link from 'next/link';

// export default function Home() {
//   return (
//     <div className="container-fluid px-0">
//       {/* Header section */}
//       <header className="py-5" style={{ backgroundColor: '#3C3738', color: '#fff' }}>
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-lg-8 text-center">
//               <h1 className="fw-bold mb-3">Elevate your final year project experience</h1>
//               <p className="lead fw-normal mb-4">Leave a lasting mark on the world of engineering.</p>
//               {/* Updated Link component */}
//               <Link href="/addCollege">
//                 <button className="btn btn-primary btn-lg">Get Started</button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* College list section */}
//       <section className="py-5">
//         <div className="container">
//           <h2 className="text-center mb-5 fw-bold">Select Institution</h2>
//           <div className="row justify-content-center">
//             <Suspense fallback={<Loading />}>
//               <CollegeList />
//             </Suspense>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }


import { Suspense } from 'react';
import Loading from "./loading"
import CollegeList from '@/components/CollegeList'
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container-fluid px-0">
      {/* Header section with background image */}
      <header className="py-5" style={{ backgroundImage: `url('saffrony.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h1 className="fw-bold mb-3 text-black">Elevate your final year project experience</h1>
              <p className="lead fw-normal mb-4 text-black">Leave a lasting mark on the world of engineering.</p>
              {/* Updated Link component */}
              <Link href="/addCollege">
                <button className="btn btn-primary btn-lg">Get Started</button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* College list section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Select Institution</h2>
          <div className="row justify-content-center">
            <Suspense fallback={<Loading />}>
              <CollegeList />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  )
}

