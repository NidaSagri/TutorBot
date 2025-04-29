import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiPencilSquare } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const EditCourseBasicInfo = ({ course, GetCourse }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(course?.courseOutput?.CourseName || "");
    setDescription(course?.courseOutput?.Description || "");
  }, [course]);

  const onUpdateHandler = async () => {
    await fetch("/api/edit-course/basic-info", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: course.id,
        name,
        description,
      }),
    });

    GetCourse(); 
  };

  return (
    <Dialog>
      <DialogTrigger>
        <HiPencilSquare />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course Title & Description</DialogTitle>
          <DialogDescription>
            You can update the course title and description here.
          </DialogDescription>
        </DialogHeader>
        <div>
          <label htmlFor="title" className="text-gray-500 ">
            Course Title
          </label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="description" className="text-gray-500 ">
            Description
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-30"
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onUpdateHandler}>Update</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCourseBasicInfo;
