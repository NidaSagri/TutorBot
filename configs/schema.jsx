import { boolean, json, jsonb, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const CourseList = pgTable('courseList',{
    id: serial('id').primaryKey(),
    courseId: varchar('courseId').notNull().unique(),
    name: varchar('name').notNull(),
    category: varchar('category').notNull(),
    level: varchar('level').notNull(),
    includeVideo: varchar('includeVideo').notNull().default('Yes'),
    courseOutput: json('courseOutput').notNull(),
    createdBy: varchar('createdBy').notNull(),
    userName: varchar('username'),
    userProfileImage: varchar('userProfileImage'),
    courseBanner: varchar('courseBanner').default("/course.png"),
    publish: boolean('publish').default(false),
})


export const Chapters = pgTable('chapters', {
    id: serial('id').primaryKey(),
    courseId: varchar('courseId').notNull().references(() => CourseList.courseId, { onDelete: "cascade" }),
    chapterId: varchar('chapterId').notNull(),
    content: jsonb('content').notNull(),
    videoId: varchar('videoId'),
  });
  

// RELATIONS
export const ChaptersRelations = relations(Chapters, ({ one }) => ({
    course: one(CourseList, {
        fields: [Chapters.courseId],         // field from Chapters
        references: [CourseList.courseId],    // referencing CourseList.courseId
        onDelete: "cascade",                  // <<< THIS makes sure deletion of a course deletes its chapters
    }),
}));