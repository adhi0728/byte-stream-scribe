
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: {
    id: string;
    name: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  readTime: string;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding React Hooks and Their Real-World Applications",
    excerpt: "Deep dive into React Hooks with practical examples and best practices for modern React development.",
    content: `
# Understanding React Hooks and Their Real-World Applications

React Hooks have revolutionized how we build React components since their introduction in React 16.8. They enable function components to use state and other React features that were previously only available in class components.

## The Core Hooks

### useState

The useState hook allows function components to have local state. Let's see how it works:

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

### useEffect

The useEffect hook allows performing side effects in function components:

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
    
    return () => {
      // Cleanup code
    };
  }, [count]); // Only re-run if count changes

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## Advanced Hooks

### useContext

useContext provides a way to pass data through the component tree without having to pass props down manually at every level.

### useReducer

useReducer is usually preferable to useState when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one.

## Custom Hooks

One of the most powerful features of Hooks is the ability to create your own. A custom Hook is a JavaScript function whose name starts with "use" and that may call other Hooks.

\`\`\`jsx
import { useState, useEffect } from 'react';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener('resize', handleResize);
    
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return windowSize;
}
\`\`\`

## Real-World Applications

### Form Handling

Hooks make form state management much cleaner:

\`\`\`jsx
function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formState.name}
        onChange={handleChange}
      />
      {/* Other form fields */}
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\`

### Data Fetching

Hooks simplify data fetching patterns:

\`\`\`jsx
function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>{/* Render data */}</div>
  );
}
\`\`\`

## Conclusion

React Hooks offer a more direct API to the React concepts you already know: props, state, context, refs, and lifecycle. They provide a way to reuse stateful logic without changing your component hierarchy.

By mastering Hooks, you can write more concise and easier-to-understand React components, leading to more maintainable codebases in real-world applications.
    `,
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "React",
    tags: ["React", "JavaScript", "Web Development", "Hooks"],
    author: {
      id: "1",
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/150?img=11",
      bio: "Senior React Developer with 8 years of experience. Passionate about clean code and user experience."
    },
    publishedAt: "May 2, 2023",
    readTime: "8 min",
    featured: true
  },
  {
    id: "2",
    title: "Building RESTful APIs with Node.js and Express",
    excerpt: "Learn how to create robust and scalable RESTful APIs using Node.js, Express, and best practices.",
    content: `
# Building RESTful APIs with Node.js and Express

REST (Representational State Transfer) has become the standard architectural style for designing networked applications. RESTful APIs provide a simple, uniform interface for systems to communicate over HTTP.

## Setting Up Your Environment

Let's start by setting up a basic Node.js project with Express:

\`\`\`bash
mkdir express-api
cd express-api
npm init -y
npm install express mongoose dotenv cors helmet morgan
\`\`\`

## Creating the Express Server

First, let's create a basic Express server:

\`\`\`javascript
// server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// Start server
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

## Connecting to MongoDB

Let's connect our API to MongoDB using Mongoose:

\`\`\`javascript
// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB Connected...');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
\`\`\`

And import it in our server.js:

\`\`\`javascript
const connectDB = require('./db');
connectDB();
\`\`\`

## Creating Models

Let's create a User model:

\`\`\`javascript
// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
\`\`\`

## Creating RESTful Routes

Let's create CRUD routes for our User model:

\`\`\`javascript
// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get single user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.status(500).send('Server Error');
  }
});

// Create user
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    let user = await User.findOne({ email });
    
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    
    user = new User({
      name,
      email,
      password, // In a real app, hash this password!
    });
    
    await user.save();
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update user
router.put('/:id', async (req, res) => {
  const { name, email } = req.body;
  
  try {
    let user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    user.name = name || user.name;
    user.email = email || user.email;
    
    await user.save();
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.status(500).send('Server Error');
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    await user.remove();
    
    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.status(500).send('Server Error');
  }
});

module.exports = router;
\`\`\`

Then add the routes to our server.js:

\`\`\`javascript
app.use('/api/users', require('./routes/users'));
\`\`\`

## API Authentication

For a real-world API, you'll want to add authentication. Here's a simple JWT implementation:

\`\`\`javascript
// Install required packages
// npm install jsonwebtoken bcryptjs

// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  
  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  
  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
\`\`\`

## API Documentation

Good documentation is crucial for APIs. You can use tools like Swagger or create a simple documentation endpoint:

\`\`\`javascript
app.get('/api/docs', (req, res) => {
  res.json({
    endpoints: {
      users: {
        get: {
          '/api/users': 'Get all users',
          '/api/users/:id': 'Get user by ID',
        },
        post: {
          '/api/users': 'Create a new user',
        },
        put: {
          '/api/users/:id': 'Update user by ID',
        },
        delete: {
          '/api/users/:id': 'Delete user by ID',
        },
      },
      // Other endpoints...
    },
  });
});
\`\`\`

## Conclusion

We've built a basic RESTful API with Node.js and Express, covering:
- Setting up an Express server
- Connecting to MongoDB with Mongoose
- Creating models and CRUD operations
- Implementing API routes
- Adding authentication

This provides a solid foundation for building more complex APIs for your applications. To further improve this API, consider adding:
- Request validation
- Rate limiting
- Pagination
- Advanced authentication features
- More comprehensive error handling
- Logging and monitoring
    `,
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    category: "Backend",
    tags: ["Node.js", "Express", "API", "JavaScript", "REST"],
    author: {
      id: "2",
      name: "Sarah Williams",
      avatar: "https://i.pravatar.cc/150?img=20",
      bio: "Backend Engineer specializing in Node.js and microservices architecture."
    },
    publishedAt: "Apr 18, 2023",
    readTime: "12 min",
    featured: false
  },
  {
    id: "3",
    title: "Modern CSS Techniques You Should Know",
    excerpt: "Explore cutting-edge CSS techniques that will elevate your frontend development skills.",
    content: `
# Modern CSS Techniques You Should Know

CSS has evolved dramatically in recent years, with new features and methodologies that make styling web applications more powerful and efficient than ever. Let's explore some modern CSS techniques every developer should know.

## CSS Custom Properties (Variables)

CSS variables allow you to define reusable values throughout your stylesheet:

\`\`\`css
:root {
  --primary-color: #4a6cf7;
  --secondary-color: #e63946;
  --text-color: #333;
  --spacing-unit: 8px;
}

.button {
  background-color: var(--primary-color);
  color: white;
  padding: calc(var(--spacing-unit) * 2);
  margin: var(--spacing-unit);
}

.alert {
  border: 1px solid var(--secondary-color);
  color: var(--text-color);
}
\`\`\`

The power of CSS variables becomes apparent when you combine them with media queries or JavaScript manipulation:

\`\`\`css
@media (prefers-color-scheme: dark) {
  :root {
    --text-color: #f1f1f1;
    --background-color: #121212;
  }
}
\`\`\`

\`\`\`javascript
// Changing CSS variables with JavaScript
document.documentElement.style.setProperty('--primary-color', '#ff0000');
\`\`\`

## Grid Layout

CSS Grid has revolutionized layout design, making complex layouts easier to implement:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
}
\`\`\`

This creates a responsive grid where items automatically fit based on viewport size.

For more complex layouts:

\`\`\`css
.dashboard {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar content content"
    "footer footer footer";
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer { grid-area: footer; }
\`\`\`

## CSS Flexbox

While Grid is excellent for layouts, Flexbox excels at managing alignment and space distribution:

\`\`\`css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.responsive-layout {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .responsive-layout {
    flex-direction: row;
  }
}
\`\`\`

## Logical Properties

CSS logical properties and values help create layouts that work across different writing modes:

\`\`\`css
/* Traditional properties */
.box {
  margin-left: 10px;
  padding-right: 20px;
}

/* Logical properties */
.box {
  margin-inline-start: 10px; /* left in LTR, right in RTL */
  padding-inline-end: 20px; /* right in LTR, left in RTL */
}
\`\`\`

This is particularly important for internationalization.

## CSS Animation and Transitions

Modern CSS makes animations easier than ever:

\`\`\`css
.button {
  background-color: blue;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.button:hover {
  background-color: darkblue;
  transform: translateY(-2px);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.element {
  animation: fadeIn 1s ease-in-out;
}
\`\`\`

## CSS Functions

CSS now includes powerful functions that add new capabilities:

\`\`\`css
/* calc() for runtime calculations */
.element {
  width: calc(100% - 40px);
}

/* clamp() to set value within a range */
.responsive-text {
  font-size: clamp(16px, 4vw, 24px);
}

/* min() and max() */
.container {
  width: min(90%, 1200px);
  margin-inline: max(20px, 5%);
}
\`\`\`

## Modern Selectors

CSS selectors have become more powerful:

\`\`\`css
/* Select elements that have both classes */
.product.featured { }

/* Select direct children */
.container > .item { }

/* Select siblings */
.element + .element { /* Adjacent sibling */}
.element ~ .element { /* General sibling */}

/* Attribute selectors */
[data-type="primary"] { }
[href^="https"] { } /* Starts with */
[href$=".pdf"] { } /* Ends with */
[href*="example"] { } /* Contains */

/* Pseudo-classes */
:hover, :focus, :active { }
:first-child, :last-child, :nth-child(2n) { }
:not(.excluded) { }
:is(.title, .heading, h1, h2, h3) { } /* Matches any of these */
:where(.card, .panel) { } /* Similar to :is but with 0 specificity */
\`\`\`

## Container Queries

The newest addition to responsive design, container queries allow styles based on the container's size rather than just the viewport:

\`\`\`css
.container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
  }
}
\`\`\`

## Conclusion

Modern CSS has evolved into a powerful language with features that were once only possible with JavaScript or preprocessors. By understanding and implementing these techniques, you can create more maintainable, performant, and responsive web applications.

The best part is that browser support for these features has greatly improved, allowing you to use many of these techniques in production today without heavy polyfills or fallbacks.

As you continue developing, stay updated with new CSS features by following the CSS Working Group's progress and checking resources like MDN Web Docs and caniuse.com.
    `,
    coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    category: "CSS",
    tags: ["CSS", "Frontend", "Web Design", "Styling"],
    author: {
      id: "3",
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?img=12",
      bio: "Frontend Developer and UI Designer with a passion for creating beautiful, responsive web experiences."
    },
    publishedAt: "Mar 15, 2023",
    readTime: "10 min",
    featured: true
  },
  {
    id: "4",
    title: "Introduction to TypeScript for JavaScript Developers",
    excerpt: "Learn how TypeScript can enhance your JavaScript development with static typing and advanced features.",
    content: `
# Introduction to TypeScript for JavaScript Developers

TypeScript has gained enormous popularity in recent years, especially among JavaScript developers looking for more robust tooling and type safety. In this article, we'll explore TypeScript fundamentals and how it can improve your JavaScript code.

## What is TypeScript?

TypeScript is a strongly typed programming language that builds on JavaScript. It's developed and maintained by Microsoft and adds optional static typing to JavaScript. TypeScript code compiles to plain JavaScript, making it compatible with any browser or JavaScript runtime.

## Why Use TypeScript?

1. **Type Safety**: Catch errors during development instead of at runtime
2. **Better IDE Support**: Enhanced autocomplete, navigation, and refactoring
3. **Self-Documenting Code**: Types serve as documentation
4. **Improved Team Collaboration**: Clearer interfaces between components
5. **Advanced JavaScript Features**: Use modern features with backward compatibility

## Getting Started

First, install TypeScript globally:

\`\`\`bash
npm install -g typescript
\`\`\`

Create your first TypeScript file (hello.ts):

\`\`\`typescript
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet("TypeScript"));
\`\`\`

Compile it to JavaScript:

\`\`\`bash
tsc hello.ts
\`\`\`

This creates a hello.js file that you can run with Node.js.

## Basic Types

TypeScript provides several built-in types:

\`\`\`typescript
// Basic types
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";
let list: number[] = [1, 2, 3];
let x: [string, number] = ["hello", 10]; // Tuple

// Enum
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// Any (avoid when possible)
let notSure: any = 4;

// Void
function warnUser(): void {
  console.log("Warning!");
}

// Null and Undefined
let u: undefined = undefined;
let n: null = null;

// Never
function error(message: string): never {
  throw new Error(message);
}
\`\`\`

## Interfaces

Interfaces define contracts in your code:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
  readonly createdAt: Date; // Read-only property
}

function createUser(user: User): void {
  console.log(\`Created user: \${user.name}\`);
}

createUser({
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  createdAt: new Date()
});
\`\`\`

## Functions

TypeScript enhances function declarations:

\`\`\`typescript
// Parameter and return type annotations
function add(x: number, y: number): number {
  return x + y;
}

// Optional and default parameters
function buildName(firstName: string, lastName?: string): string {
  return lastName ? \`\${firstName} \${lastName}\` : firstName;
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((prev, current) => prev + current, 0);
}

// Function types
let combineStrings: (a: string, b: string) => string;
combineStrings = (a, b) => a + b;
\`\`\`

## Classes

TypeScript supports class-based object-oriented programming:

\`\`\`typescript
class Person {
  // Properties
  private name: string;
  protected age: number;
  
  // Constructor
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  
  // Methods
  greet(): string {
    return \`Hello, my name is \${this.name} and I am \${this.age} years old.\`;
  }
}

// Inheritance
class Employee extends Person {
  private department: string;
  
  constructor(name: string, age: number, department: string) {
    super(name, age);
    this.department = department;
  }
  
  public showDetails(): string {
    return \`\${this.greet()} I work in \${this.department}.\`;
  }
}

const john = new Employee("John", 30, "Engineering");
console.log(john.showDetails());
\`\`\`

## Generics

Generics provide a way to create reusable components:

\`\`\`typescript
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");

// Generic interface
interface GenericResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Using the generic interface
interface User {
  id: number;
  name: string;
}

const userResponse: GenericResponse<User> = {
  data: { id: 1, name: "John" },
  status: 200,
  message: "Success"
};

// Generic classes
class DataContainer<T> {
  private data: T;
  
  constructor(data: T) {
    this.data = data;
  }
  
  getData(): T {
    return this.data;
  }
}

const stringContainer = new DataContainer<string>("Hello World");
console.log(stringContainer.getData()); // "Hello World"
\`\`\`

## Type Assertions

Type assertions allow you to tell TypeScript that you know more about a type than it does:

\`\`\`typescript
// Angle bracket syntax
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// As syntax (preferred in JSX)
let otherValue: any = "hello";
let otherLength: number = (otherValue as string).length;
\`\`\`

## Advanced Types

TypeScript offers advanced type features:

\`\`\`typescript
// Union types
function formatInput(input: string | number) {
  if (typeof input === "string") {
    return input.toUpperCase();
  }
  return input.toFixed(2);
}

// Intersection types
interface BusinessPartner {
  name: string;
  credit: number;
}

interface Identity {
  id: number;
  email: string;
}

type Employee = BusinessPartner & Identity;

// Type aliases
type Point = {
  x: number;
  y: number;
};

// Literal types
type Direction = "north" | "east" | "south" | "west";
function move(direction: Direction) {
  // ...
}

// Nullable types
function getLength(text: string | null): number {
  return text ? text.length : 0;
}
\`\`\`

## TypeScript with React

TypeScript works great with React:

\`\`\`tsx
import React, { useState } from 'react';

interface UserProps {
  name: string;
  age: number;
  onProfileUpdate?: () => void;
}

const UserProfile: React.FC<UserProps> = ({ name, age, onProfileUpdate }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  return (
    <div>
      <h1>{name}</h1>
      <p>Age: {age}</p>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Cancel" : "Edit"}
      </button>
      {onProfileUpdate && (
        <button onClick={onProfileUpdate}>Update</button>
      )}
    </div>
  );
}

export default UserProfile;
\`\`\`

## Conclusion

TypeScript offers significant advantages for JavaScript developers, especially on larger projects or when working in teams. It provides type safety, improved tooling, and enhanced code quality without sacrificing the flexibility of JavaScript.

While there is a learning curve, the benefits in terms of catching errors early, improving documentation, and enabling better IDE support make it worth the investment. Start by adding TypeScript to a small project or converting parts of an existing project to gain experience with the language.

Remember, TypeScript is designed to be a superset of JavaScript, so you can always start with minimal typing and progressively add more as you become comfortable with the language.
    `,
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    category: "TypeScript",
    tags: ["TypeScript", "JavaScript", "Web Development", "Programming"],
    author: {
      id: "4",
      name: "Emily Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=23",
      bio: "Full-stack developer specializing in TypeScript and React. Conference speaker and technical writer."
    },
    publishedAt: "Feb 28, 2023",
    readTime: "15 min",
    featured: false
  },
  {
    id: "5",
    title: "Optimizing Web Performance: Strategies for Faster Sites",
    excerpt: "Learn essential techniques to improve your website's loading speed and overall performance.",
    content: `
# Optimizing Web Performance: Strategies for Faster Sites

In today's digital landscape, website performance is critical to success. Users expect websites to load quickly and operate smoothly, with studies showing that users abandon sites that take more than 3 seconds to load. In this article, we'll explore strategies for optimizing your website's performance.

## Why Performance Matters

- **User Experience**: Faster sites create better user experiences
- **SEO Ranking**: Speed is a ranking factor for search engines
- **Conversion Rates**: Faster sites have higher conversion rates
- **Bounce Rate Reduction**: Quicker load times reduce bounce rates

## Performance Metrics to Track

Before optimizing, understand what to measure:

1. **First Contentful Paint (FCP)**: Time until first content is rendered
2. **Largest Contentful Paint (LCP)**: Time until largest content element is visible
3. **First Input Delay (FID)**: Time until page responds to user interaction
4. **Cumulative Layout Shift (CLS)**: Measures visual stability
5. **Time to Interactive (TTI)**: Time until page becomes fully interactive

Tools like Lighthouse, WebPageTest, and Chrome DevTools can help measure these metrics.

## Image Optimization

Images often account for most of the downloaded bytes on a webpage.

### Use Appropriate Image Formats

- **JPEG**: Best for photographs and complex images with many colors
- **PNG**: Ideal for images requiring transparency
- **WebP**: Modern format with superior compression (check browser support)
- **SVG**: Perfect for logos, icons, and simple illustrations
- **AVIF**: Next-gen format with excellent compression (growing support)

### Image Optimization Techniques

\`\`\`html
<!-- Responsive images -->
<img 
  src="image-800w.jpg" 
  srcset="image-400w.jpg 400w, image-800w.jpg 800w, image-1600w.jpg 1600w" 
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1600px"
  alt="Responsive image example" 
  loading="lazy" 
  width="800" 
  height="600"
>

<!-- Using modern formats with fallback -->
<picture>
  <source type="image/avif" srcset="image.avif">
  <source type="image/webp" srcset="image.webp">
  <img src="image.jpg" alt="Image description">
</picture>
\`\`\`
    `,
    coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    category: "Performance",
    tags: ["Web Performance", "Frontend", "Optimization", "Speed"],
    author: {
      id: "5",
      name: "Jason Lee",
      avatar: "https://i.pravatar.cc/150?img=15",
      bio: "Performance engineer focused on making the web faster for everyone. Previously worked at Google and Cloudflare."
    },
    publishedAt: "Jan 10, 2023",
    readTime: "10 min",
    featured: false
  }
];

export const sampleUsers = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "https://i.pravatar.cc/150?img=11",
    bio: "Senior React Developer with 8 years of experience. Passionate about clean code and user experience.",
    role: "author",
    articles: 12,
    joinedAt: "2021-03-15"
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah@example.com",
    avatar: "https://i.pravatar.cc/150?img=20",
    bio: "Backend Engineer specializing in Node.js and microservices architecture.",
    role: "author",
    articles: 8,
    joinedAt: "2022-01-10"
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael@example.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    bio: "Frontend Developer and UI Designer with a passion for creating beautiful, responsive web experiences.",
    role: "author",
    articles: 15,
    joinedAt: "2021-05-22"
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    email: "emily@example.com",
    avatar: "https://i.pravatar.cc/150?img=23",
    bio: "Full-stack developer specializing in TypeScript and React. Conference speaker and technical writer.",
    role: "admin",
    articles: 10,
    joinedAt: "2021-02-14"
  },
  {
    id: "5",
    name: "Jason Lee",
    email: "jason@example.com",
    avatar: "https://i.pravatar.cc/150?img=15",
    bio: "Performance engineer focused on making the web faster for everyone. Previously worked at Google and Cloudflare.",
    role: "author",
    articles: 6,
    joinedAt: "2022-04-30"
  }
];
