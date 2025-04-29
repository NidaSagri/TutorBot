import { UserInputContext } from '@/app/_context/UserInputContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useContext } from 'react';

const TopicDiscussion = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="mx-2 my-5 sm:mx-10 lg:mx-20 xl:mx-44">
      <div className="mt-8 sm:mt-10">
        <label className="text-sm sm:text-base">💡 Write a topic for which you want to generate a course (e.g., Java Course, Yoga, Sketching, etc.):</label>
        <Input
          placeholder="Topic"
          defaultValue={userCourseInput?.topic}
          onChange={(e) => handleInputChange('topic', e.target.value)}
          className="w-full sm:max-w-[60vw] mt-2 sm:mt-3"
        />
      </div>

      <div className="mt-8 sm:mt-10">
        <label className="text-sm sm:text-base">📝 Tell us more about your course, what do you want to include in it? (Optional)</label>
        <Textarea
          placeholder="Course description"
          defaultValue={userCourseInput?.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="w-full sm:max-w-[60vw]  mt-2 sm:mt-3"
        />
      </div>
    </div>
  );
};

export default TopicDiscussion;
