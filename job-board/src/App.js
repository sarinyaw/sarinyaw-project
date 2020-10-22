import React, { useState, useEffect } from 'react';
import JobBoardComponent from './components/JobBoardComponent'

function App() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState([]);
  useEffect(() => {
    // get data from some api + set data into jobs
    fetch(process.env.PUBLIC_URL + '/assets/data.json')
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
      });
  }, [])
  const filterTagsFunc = ({ role, level, tools, languages }) => {
    if (filters.length === 0) {
      return true;
    }
    const tags = [role, level, ...tools, ...languages];

    return tags.some(tag => filters.includes(tag));
  }
  const filterJobs = jobs.filter(filterTagsFunc);
  const handleTagClick = (tag) => {
    if (filters.includes(tag)) return;
    setFilters([...filters, tag]);
  }
  const handleFilterClick = (passFilter) => {
    setFilters(filters.filter((filter) => filter !== passFilter));
  }
  return (
    <div className='App'>
      <header className="bg-teal-500 mb-16">
        <img src={process.env.PUBLIC_URL + "/assets/images/bg-header-desktop.svg"} alt='header-img' />
      </header>
      <section className='container m-auto w-11/12'>
        {filters.length > 0 && (
          <div className='flex flex-wrap bg-white shadow-md my-16 mx-auto p-6 rounded'>
            {filters.map((filter) =>
              <span className='text-teal-500 bg-teal-100 font-bold mr-4 mb-4 p-2 rounded 
          sm:mb-0' onClick={() => handleFilterClick(filter)}>{filter}
                <span className='cursor-pointer bg-teal-500 hover:bg-black text-teal-100 p-2 ml-2 -mr-4 rounded rounded-l-none'>
                  X
              </span>
              </span>
            )}
          </div>
        )}

        <div>
          {
            jobs.length === 0 ? (
              <p>Jobs are fetching...</p>
            ) : (
                filterJobs.map((job) => (
                  <JobBoardComponent
                    job={job}
                    key={job.id} 
                    handleTagClick={handleTagClick} />
                ))
              )
          }
        </div>
      </section>
    </div>
  );
}

export default App;

// TODOs
// 1. Study design & json ✅
// 2. Create Job board Component (JBC) ✅
// 3. Get the data from the json ✅
// 4. Pass down the data to JBC ✅
// 5. Style it
// 6. Filter component
// 7. Filter the data