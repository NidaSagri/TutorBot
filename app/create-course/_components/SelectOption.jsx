// import React, { useContext } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { UserInputContext } from "@/app/_context/UserInputContext";

// const SelectOption = () => {

//   const {userCourseInput, setUserCourseInput} = useContext(UserInputContext);
  
//     const handleInputChange = (fieldName, value) =>{
//       setUserCourseInput(prev => ({
//         ...prev,
//         [fieldName]:value
//       }))
//     }
  
//   return (
//     <div className="px-10 md:px-20 lg:px-44 mt-2">
//       <div className="grid grid-cols-2 gap-10">
//         <div>
//           <label className="text-sm">🎓 Difficulty Level</label>
//           <Select 
//             defaultValue={userCourseInput?.level}
//             onValueChange={(value)=>handleInputChange('level', value)} >
//             <SelectTrigger className="w-[350px]">
//               <SelectValue placeholder="Select" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="Beginner">Beginner</SelectItem>
//               <SelectItem value="Intermediate">Intermediate</SelectItem>
//               <SelectItem value="Advanced">Advanced</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div>
//           <label className="text-sm">🕑Course Duration</label>
//           <Select 
//             defaultValue={userCourseInput?.duration}
//             onValueChange={(value)=>handleInputChange('duration', value)}>
//             <SelectTrigger className="w-[350px]">
//               <SelectValue placeholder="Select" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="1 hour">1 hour</SelectItem>
//               <SelectItem value="2 hours">2 hours</SelectItem>
//               <SelectItem value="More than 3 hours">More than 3 hours</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div>
//           <label className="text-sm">▶️ Add Videos</label>
//           <Select
//            defaultValue={userCourseInput?.displayVideo}
//            onValueChange={(value)=>handleInputChange('displayVideo', value)}>
//             <SelectTrigger className="w-[350px]">
//               <SelectValue placeholder="Select" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="Yes">Yes</SelectItem>
//               <SelectItem value="No">No</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div>
//           <label className="text-sm">📖 No of Chapters</label>
//           <Input type={'number'} 
//             defaultValue={userCourseInput?.noOfChapter}
//             onChange={(e)=>handleInputChange('noOfChapter', e.target.value)} className='w-[350px]'/>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default SelectOption;


import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UserInputContext } from "@/app/_context/UserInputContext";

const SelectOption = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="px-1 sm:px-10 lg:px-20 xl:px-44 m-15">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
        <div>
          <label className="text-sm sm:text-base">🎓 Difficulty Level</label>
          <Select
            defaultValue={userCourseInput?.level}
            onValueChange={(value) => handleInputChange("level", value)}
          >
            <SelectTrigger className="w-full sm:w-[350px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm sm:text-base">🕑 Course Duration</label>
          <Select
            defaultValue={userCourseInput?.duration}
            onValueChange={(value) => handleInputChange("duration", value)}
          >
            <SelectTrigger className="w-full sm:w-[350px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 hour">1 hour</SelectItem>
              <SelectItem value="2 hours">2 hours</SelectItem>
              <SelectItem value="More than 3 hours">More than 3 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm sm:text-base">▶️ Add Videos</label>
          <Select
            defaultValue={userCourseInput?.displayVideo}
            onValueChange={(value) => handleInputChange("includeVideo", value)}
          >
            <SelectTrigger className="w-full sm:w-[350px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm sm:text-base">📖 No of Chapters</label>
          <Input
            type="number"
            defaultValue={userCourseInput?.noOfChapter}
            onChange={(e) => handleInputChange("noOfChapter", e.target.value)}
            className="w-full sm:w-[350px]"
          />
        </div>
      </div>
    </div>
  );
};

export default SelectOption;
