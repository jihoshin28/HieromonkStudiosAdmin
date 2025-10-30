// ============================================
// INSTALLATION & SETUP
// ============================================

// 1. Create React App with react-admin
// Run these commands in your terminal:

/*
npx create-react-app hieromonk-admin
cd hieromonk-admin
npm install react-admin ra-data-simple-rest
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material

*/

// ============================================
// FILE: src/App.js
// ============================================

import React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';

// Components (we'll create these below)
import { ContactList, ContactEdit, ContactCreate, ContactShow } from './resources/contacts';
import { ContractList, ContractEdit, ContractCreate, ContractShow } from './resources/contracts';
import { ProjectList, ProjectEdit, ProjectCreate, ProjectShow } from './resources/projects';
import { TaskList, TaskEdit, TaskCreate } from './resources/tasks';
import Dashboard from './Dashboard';
import authProvider from './authProvider';

// Update this to your API URL
const dataProvider = simpleRestProvider('http://localhost:3001/api');

const App = () => (
  <Admin 
    dataProvider={dataProvider}
    authProvider={authProvider}
    dashboard={Dashboard}
  >
    <Resource 
      name="contacts" 
      list={ContactList}
      edit={ContactEdit}
      create={ContactCreate}
      show={ContactShow}
      icon={PersonIcon}
    />
    <Resource 
      name="contracts" 
      list={ContractList}
      edit={ContractEdit}
      create={ContractCreate}
      show={ContractShow}
      icon={DescriptionIcon}
    />
    <Resource 
      name="projects" 
      list={ProjectList}
      edit={ProjectEdit}
      create={ProjectCreate}
      icon={WorkIcon}
    />
    <Resource 
      name="tasks" 
      list={TaskList}
      edit={TaskEdit}
      create={TaskCreate}
      icon={AssignmentIcon}
    />
  </Admin>
);

export default App;


// ============================================
// BACKEND API STRUCTURE (Express.js example)
// ============================================

/*
Create a separate backend folder with this structure:

backend/
├── server.js
├── routes/
│   ├── contacts.js
│   ├── contracts.js
│   ├── projects.js
│   └── tasks.js
├── models/
│   └── database.js
└── package.json

Install dependencies:
npm install express cors pg prisma @prisma/client

Your API needs to follow this REST format for react-admin:
- GET    /api/contacts?_start=0&_end=10&_sort=id&_order=DESC
- GET    /api/contacts/:id
- POST   /api/contacts
- PUT    /api/contacts/:id
- DELETE /api/contacts/:id

React-admin expects:
- Total count in Content-Range header: "contacts 0-10/50"
- JSON response with array for lists, object for single items
*/