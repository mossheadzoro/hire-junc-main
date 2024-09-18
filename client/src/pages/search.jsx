// import SearchGridItem from "../components/Search/SearchGridItem";
// import { SEARCH_GIGS_ROUTE } from "../utils/constants";
// import axios from "axios";
// import { useRouter } from "next/router";
// import React, { useEffect, useState } from "react";
// function Search() {
//   const router = useRouter();
//   const { category, q } = router.query;
//   const [gigs, setGigs] = useState(undefined);
//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const {
//           data: { gigs },
//         } = await axios.get(
//           `${SEARCH_GIGS_ROUTE}?searchTerm=${q}&category=${category}`
//         );
//         setGigs(gigs);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     if (category || q) getData();
//   }, [category, q]);
//   return (
//     <>
//       {gigs && (
//         <div className="mx-24 mb-24">
//           {q && (
//             <h3 className="text-4xl mb-10">
//               Results for <strong>{q}</strong>
//             </h3>
//           )}
//           <div className="flex gap-4">
//             <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium">
//               Category
//             </button>
//             <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium">
//               Budget
//             </button>
//             <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium">
//               Delivery Time
//             </button>
//           </div>
//           <div>
//             <div className="my-4">
//               <span className="text-[#74767e] font-medium ">
//                 {gigs.length} services available
//               </span>
//             </div>
//             <div className="grid grid-cols-4">
//               {gigs.map((gig) => (
//                 <SearchGridItem gig={gig} key={gig.id} />
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Search;



import SearchGridItem from "../components/Search/SearchGridItem";
import { SEARCH_GIGS_ROUTE } from "../utils/constants";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Search() {
  const router = useRouter();
  const { category, q } = router.query;
  const [gigs, setGigs] = useState(undefined);

  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: { gigs },
        } = await axios.get(
          `${SEARCH_GIGS_ROUTE}?searchTerm=${q}&category=${category}`
        );
        setGigs(gigs);
      } catch (err) {
        console.error(err);
      }
    };
    if (category || q) getData();
  }, [category, q]);

  if (!gigs) return null;

  // Filter gigs by mainCategory
  const technicalGigs = gigs.filter(gig => gig.mainCategory === 'TECHNICAL');
  const nonTechnicalGigs = gigs.filter(gig => gig.mainCategory === 'NON-TECHNICAL');

  return (
    <div className="mx-24 mb-24">
      {q && (
        <h3 className="text-4xl mb-10">
          Results for <strong>{q}</strong>
        </h3>
      )}
      <div className="flex gap-4 mb-4">
        <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium">
          Category
        </button>
        <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium">
          Budget
        </button>
        <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium">
          Delivery Time
        </button>
      </div>
      <div>
        <div className="my-4">
          <span className="text-[#74767e] font-medium ">
            {gigs.length} services available
          </span>
        </div>
        <div className="flex">
          {/* Left column for Technical services */}
          <div className="w-1/2 overflow-y-scroll h-screen p-4">
            <h2 className="text-xl font-bold">Technical Services</h2>
            {technicalGigs.length > 0 ? (
              technicalGigs.map(gig => <SearchGridItem key={gig.id} gig={gig} />)
            ) : (
              <p>No technical gigs found</p>
            )}
          </div>

          {/* Right column for Non-Technical services */}
          <div className="w-1/2 overflow-y-scroll h-screen p-4">
            <h2 className="text-xl font-bold">Non-Technical Services</h2>
            {nonTechnicalGigs.length > 0 ? (
              nonTechnicalGigs.map(gig => <SearchGridItem key={gig.id} gig={gig} />)
            ) : (
              <p>No non-technical gigs found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
