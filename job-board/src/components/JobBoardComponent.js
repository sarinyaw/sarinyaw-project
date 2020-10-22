import React from 'react';

// {
//   "id": 1,
//   "company": "Photosnap",
//   "logo": "./images/photosnap.svg",
//   "new": true,
//   "featured": true,
//   "position": "Senior Frontend Developer",
//   "role": "Frontend",
//   "level": "Senior",
//   "postedAt": "1d ago",
//   "contract": "Full Time",
//   "location": "USA Only",
//   "languages": ["HTML", "CSS", "JavaScript"],
//   "tools": []
// },

const JobBoardComponent = ({ job, handleTagClick }) => {
  const tags = [job.role, job.level, ...job.languages, ...job.tools];
  return (
    <div  className={`flex flex-col bg-white shadow-md my-16 mx-auto p-6 rounded 
      ${job.featured && `border-l-4 border-teal-500 border-solid`}
      md:flex-row md:my-4`}>
      <div className='flex ml-4 md:ml-0'>
        <img className='-mt-16 mb-4 md:my-0 lg:my-auto w-20 h-20' src={`${process.env.PUBLIC_URL}/assets/${job.logo}`} alt={job.company} />
      </div>
      <div className='flex flex-col justify-around ml-4 md:ml-6'>
        <h3 className='font-bold text-md text-teal-500'>
          {job.company}
          {job.new && (<span className='ml-4 pt-2 pb-1 px-2 bg-teal-500 text-white text-sm uppercase font-medium rounded-full'>New!</span>)}
          {job.featured && (<span className='ml-2 pt-2 pb-1 px-2 bg-gray-700 text-white text-sm uppercase font-medium rounded-full'>Featured</span>)}
        </h3>
        <a href="#" className='font-bold text-xl my-2 cursor-pointer hover:text-teal-500'>{job.position}</a>
        <p className='text-gray-700'>{job.postedAt} • {job.contract} • {job.location}</p>
      </div>
      <div className='flex flex-wrap items-center m-4 pt-4 border-t-2 border-gray-200 border-solid
        md:ml-auto md:mr-0 md:border-0 md:justify-end md:pt-0'>
        {
          tags ? (
            tags.map((tag) =>
              (<span className='cursor-pointer mr-4 mb-4 p-2 font-bold bg-gray-200 text-teal-500 rounded
                md:ml-4 md:mr-0 md:my-2 hover:bg-teal-500 hover:text-gray-100'
                onClick={() => handleTagClick(tag)}>{tag}</span>))
          ) : ('')
        }
      </div>
    </div>
  )
}


export default JobBoardComponent;