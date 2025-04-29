const {
    GoogleGenerativeAI,
  } = require("@google/generative-ai");
  // const fs = require("node:fs");
  // const mime = require("mime-types");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [
    ],
    responseMimeType: "application/json",
  };
  

    export const GenerateCourseLayout_AI = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "generate a course tutorial on the following details with fields as Course Name, Description along with Chapter Name, About, Duration: Category:'Programming', Topic:Python, Level:Basic, Duration:1 hours, NofChapters:5, in json format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"CourseName\": \"Introduction to Python Programming\",\n  \"Description\": \"A beginner-friendly course covering the fundamentals of Python programming.  Learn the basics of syntax, data types, control flow, and more.\",\n  \"Category\": \"Programming\",\n  \"Topic\": \"Python\",\n  \"Level\": \"Basic\",\n  \"Duration\": \"1 hour\",\n  \"NoOfChapters\": 5,\n  \"Chapters\": [\n    {\n      \"ChapterName\": \"Setting up your Python Environment\",\n      \"About\": \"Learn how to install Python, choose an IDE (like VS Code or Thonny), and run your first Python program. We'll cover different operating systems.\",\n      \"Duration\": \"10 minutes\"\n    },\n    {\n      \"ChapterName\": \"Basic Syntax and Data Types\",\n      \"About\": \"Introduction to Python's syntax, including variables, operators, and basic data types like integers, floats, strings, and booleans.\",\n      \"Duration\": \"15 minutes\"\n    },\n    {\n      \"ChapterName\": \"Control Flow: Conditional Statements and Loops\",\n      \"About\": \"Understanding `if`, `elif`, `else` statements and looping structures like `for` and `while` loops to control the flow of your program.\",\n      \"Duration\": \"20 minutes\"\n    },\n    {\n      \"ChapterName\": \"Data Structures: Lists and Dictionaries\",\n      \"About\": \"Learn about lists and dictionaries, two fundamental data structures in Python, and how to manipulate them.\",\n      \"Duration\": \"10 minutes\"\n    },\n    {\n      \"ChapterName\": \"Functions and Modules\",\n      \"About\": \"Introduction to functions for code reusability and modules for extending Python's functionality.  We'll cover basic function definitions and importing modules.\",\n      \"Duration\": \"5 minutes\"\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
  

    export const GenerateChapterContent_AI = model.startChat({
      generationConfig,
      history: [
        {
          role: 'user',
          parts: [
            {
              text: `explain the concept in detail on Topic: HTML, Chapter: HTML Basics: Structure and Elements, in JSON format with list of array with field as title, description, Code example (without <pre><code> tags if applicable).`,
            },
          ],
        },
        {
          role: 'model',
          parts: [
            {
              text: `\`\`\`json
    {
      "chapterTitle": "HTML Basics: Structure and Elements",
      "topics": [
        {
          "title": "HTML Structure",
          "description": "An HTML document follows a basic structure.  It begins with the \`<!DOCTYPE html>\` declaration, which tells the browser it's an HTML5 document.  The \`<html>\` element is the root element, encompassing everything else.  Inside \`<html>\`, we have the \`<head>\` and \`<body>\` sections. The \`<head>\` contains meta-information (like the title, character set, and links to external stylesheets), while the \`<body>\` contains the visible page content.",
          "codeExample": "<!DOCTYPE html>\\n<html>\\n<head>\\n  <title>My Web Page</title>\\n  <meta charset=\\"UTF-8\\">\\n</head>\\n<body>\\n  <h1>Hello, world!</h1>\\n</body>\\n</html>"
        },
        {
          "title": "HTML Elements",
          "description": "HTML elements are the building blocks of web pages. They consist of start and end tags (e.g., \`<h1>...</h1>\`, \`<p>... </p>\`), with content in between.  Some elements are self-closing (e.g., \`<img />\`, \`<br />\`), meaning they don't need a separate closing tag. Elements can have attributes providing additional information (e.g., \`src\` for images, \`href\` for links).",
          "codeExample": "<h1>This is a heading</h1>\\n<p>This is a paragraph of text.</p>\\n<img src=\\"image.jpg\\" alt=\\"My Image\\" />\\n<a href=\\"https://www.example.com\\">Link to Example</a>\\n<br />"
        },
        {
          "title": "Common HTML Elements",
          "description": "HTML provides various elements for structuring content.  Headings (\`<h1>\` to \`<h6>\`), paragraphs (\`<p>\`), line breaks (\`<br>\`), images (\`<img>\`), links (\`<a>\`), lists (\`<ul>\`, \`<ol>\`, \`<li>\`), divs (\`<div>\`), and spans (\`<span>\`) are fundamental.",
          "codeExample": "<ul>\\n  <li>Item 1</li>\\n  <li>Item 2</li>\\n</ul>\\n<ol>\\n  <li>First item</li>\\n  <li>Second item</li>\\n</ol>\\n<div>This is a div element.</div>\\n<span>This is a span element.</span>"
        },
        {
          "title": "HTML Attributes",
          "description": "Attributes provide additional information about HTML elements. They're written within the start tag, using the name-value pair format (e.g., \`id=\\"myElement\\"\`, \`class=\\"myClass\\"\`).  Attributes like \`id\` (for unique identification) and \`class\` (for styling and scripting) are crucial for CSS and JavaScript interaction.",
          "codeExample": "<p id=\\"myParagraph\\" class=\\"intro\\">This is a paragraph with an ID and a class.</p>\\n<img src=\\"image.jpg\\" alt=\\"Description of the image\\" width=\\"300\\" height=\\"200\\">"
        },
        {
          "title": "Nested Elements",
          "description": "HTML elements can be nested within each other to create complex structures.  The nesting must be well-formed, meaning each opening tag has a corresponding closing tag, and the nesting structure is logical.",
          "codeExample": "<div>\\n  <h1>My Heading</h1>\\n  <p>This is a paragraph inside a div.</p>\\n  <ul>\\n    <li>List item 1</li>\\n    <li>List item 2</li>\\n  </ul>\\n</div>"
        },
        {
          "title": "Semantic HTML",
          "description": "Semantic HTML uses elements that clearly describe the meaning and purpose of the content. For example, using \`<h1>\` for main headings, \`<nav>\` for navigation, \`<article>\` for independent content, and \`<aside>\` for sidebars improves accessibility, SEO, and code readability.",
          "codeExample": "<article>\\n  <header>\\n    <h1>Article Title</h1>\\n  </header>\\n  <p>Article content.</p>\\n</article>"
        }
      ]
    }
    \`\`\`
    `,
            },
          ],
        },
        {
          role: 'user',
          parts: [
            {
              text: `INSERT_INPUT_HERE`,
            },
          ],
        },
      ],
    });
 
