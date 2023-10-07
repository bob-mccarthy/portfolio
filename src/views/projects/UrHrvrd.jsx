import React from 'react'
import titleImage from '/static/course-interface.png'
import labelVid from '/static/labels.mov'
import scheduleVid from '/static/input-schedule.mov'
import addingClassesVid from '/static/add-classes.mov'

import { LazyLoadImage } from "react-lazy-load-image-component";


const UrHrvrd = () => {
  return (
    <div className='grid-container'>
      <div className='grid-item align-center'>
        <h1 className='project-header'>Redesigning the Harvard Course Catalog</h1>
      </div>
      <div className='grid-item align-center'>
        <LazyLoadImage 
            src={titleImage}
            className = "header-img"
            alt="Image Alt"
          />
        {/* <img className = "header-img" src = {titleImage} ></img> */}
      </div>
      <div className='grid-item align-center'>
        <div className='project-text-container'>
          <h3>TL;DR:</h3>
            <p>
              The harvard course catalog (my.Harvard) makes it very hard to compare classes with your schedule, and has no features
              to organize classes to save them for later. So I wanted to redesign the interface students which gave students
              calendar to input their schedules and visualize the classes they are taking. As well as, giving them labels 
              so they could effectively save and organize classes they wanted to look at later
            </p>
            <h3> Features: </h3>
            <h4> Inputting Schedule:</h4>
            <p> 
              Users can drag and drop the times that they are busy (meetings, club activities, practices, etc.) on the calendar and it will then gray and put a strikethrough
              all of the courses which overlap the times which are busy. You can also delete any time block by clicking on it.
            </p>
        </div>
      </div>
      <div className='grid-item align-center'>
        <video className='standard-img' autoPlay loop muted webkit-playsinline playsinline>
            <source src={scheduleVid} type='video/mp4'/>
        </video>
      </div>

      <div className='grid-item align-center'>
        <div className='project-text-container'>
          <p> Originally the courses which overlapped with your schedule would be filtered instead of just grayed out, but after
            demoing the project to students we found that many students liked to see classes even it conflicted with their schedule
            because sometimes if a student was interested enough in a class they would try and modify their schedule to accomodate it.
            So thats pivoted to strikethrough or graying out classes because you can quickly scan through and see which classes conflict with 
            your schedule without having them hidden from you
          </p>
          <h4>Adding Classes to Calendar: </h4>
          <p>
            Ur.Hrvrd also allows you to visualize your classes schedule as well. Allow you to add up to 10 classes to the calendar,
            as well as being able to toggle the visibility of any of these classes. The classes in the search field that overlap with
            any of the visible classes on your calendar with be grayed out as well. This means that if you hide a class on your calendar
            then any classes which overlapped with that class will no longer be grayed out in the search field (Assuming that nothing else
            on your calendar overlap with that time)
          </p>
        </div>
      </div>

      <div className='grid-item align-center'>
        <video className='standard-img' autoPlay loop muted webkit-playsinline playsinline>
            <source src={addingClassesVid} type='video/mp4'/>
        </video>
      </div>
      <div className='grid-item align-center'>
        <div className='project-text-container'>
          <p> 
            Originally with the courses on the calendar,   you could delete a course by clicking on it similar to how you
            would delete the other time blocks. However, after testing with students we found they kept accidentally deleting their classes, 
            because they were not expecting the class to be more permanent than the drag and drop time blocks. So we made it 
            such that you can only delete a class from your schedule by pressing the minus button in the search field or in the added classes
            section.
          </p>
          <h4>Adding Labels to Classes: </h4>
          <p>
            Next to each class there is a label button which allows users to give that course a new label, or one they have previously used, similar
            to labels in gmail. Users can then filter upon these labels to view them later.

          </p>
        </div>
      </div>
      <div className='grid-item align-center'>
        <video className='standard-img' autoPlay loop muted webkit-playsinline playsinline>
            <source src={labelVid} type='video/mp4'/>
        </video>
      </div>

      <div className='grid-item align-center'>
        <div className='project-text-container'>
          <p> 
            The inspiration for labels came from students complaining about only being able to save their classes in favorites or in their cart. Students
            did not like saving classes to favorites because favorites persisted over all 4 years of college so it just became this huge mess of classes that
            no one cleaned out. The cart would refresh each semester but when you put a class in your cart you could no longer see that classes syllabus or Q guide (the Harvard class rating guide).
            Also the problem is that it was just one big container. This is not helpful because many times students have different classes which fill different 
            niches. For example sometimes you need to fill a general education requirement, and you have multiple classes you are looking at to fill that spot. Instead
            of having all of your classes in one big container, labels allowed students to organize classes for those kinds of use cases. As well as, you can always make 
            new labels and delete old labels, so you don't have to worry about the clutter that you have with putting classes into your favorites. Also when you filter classes 
            by their labels you can still see the class syllabi and Q guide unlike the cart on my.harvard.
          </p>
        </div>
      </div>
    </div>
  )
}

export default UrHrvrd