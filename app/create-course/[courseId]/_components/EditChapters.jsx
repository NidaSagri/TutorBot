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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const EditChapters = ({ index, course, GetCourse }) => {

  const Chapters = course?.courseOutput?.Chapters || [];
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    if (Chapters[index]) {
      setName(Chapters[index].ChapterName || "");
      setAbout(Chapters[index].About || "");
    }
  }, [course, index]);

  const onUpdateHandler = async () => {
    await fetch("/api/edit-course/edit-chapter", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: course.id,
        name,
        about,
        index
      }),
    });

    GetCourse(); 
  };

  return (
    <Dialog>
      <DialogTrigger><HiPencilSquare/></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chapter</DialogTitle>
          <DialogDescription>
          You can update the Chapter Name and Chapter Description here.
          </DialogDescription>

        </DialogHeader>
        <div>
          <label htmlFor="title" className="text-gray-500 ">
            Chapter Name
          </label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="description" className="text-gray-500 ">
            About
          </label>
          <Textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
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

export default EditChapters;
