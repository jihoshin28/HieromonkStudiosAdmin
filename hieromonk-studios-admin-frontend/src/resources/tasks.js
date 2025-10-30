import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  SelectInput,
  ReferenceInput,
  ReferenceField,
  DateField,
  BooleanInput,
  BooleanField,
  required,
} from 'react-admin';

export const TaskList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <ReferenceField source="projectId" reference="projects" label="Project">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="status" />
      <TextField source="priority" />
      <DateField source="dueDate" />
      <BooleanField source="completed" />
      <EditButton />
    </Datagrid>
  </List>
);

export const TaskEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" validate={[required()]} fullWidth />
      <ReferenceInput source="projectId" reference="projects">
        <SelectInput optionText="name" validate={[required()]} />
      </ReferenceInput>
      <SelectInput source="status" choices={[
        { id: 'Pending', name: 'Pending' },
        { id: 'In Progress', name: 'In Progress' },
        { id: 'Blocked', name: 'Blocked' },
        { id: 'Completed', name: 'Completed' },
      ]} validate={[required()]} />
      <SelectInput source="priority" choices={[
        { id: 'Low', name: 'Low' },
        { id: 'Medium', name: 'Medium' },
        { id: 'High', name: 'High' },
        { id: 'Urgent', name: 'Urgent' },
      ]} validate={[required()]} />
      <DateInput source="dueDate" />
      <TextInput source="assignee" />
      <BooleanInput source="completed" />
      <TextInput source="notes" multiline rows={4} fullWidth />
    </SimpleForm>
  </Edit>
);

export const TaskCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" validate={[required()]} fullWidth />
      <ReferenceInput source="projectId" reference="projects">
        <SelectInput optionText="name" validate={[required()]} />
      </ReferenceInput>
      <SelectInput source="status" choices={[
        { id: 'Pending', name: 'Pending' },
        { id: 'In Progress', name: 'In Progress' },
      ]} defaultValue="Pending" validate={[required()]} />
      <SelectInput source="priority" choices={[
        { id: 'Low', name: 'Low' },
        { id: 'Medium', name: 'Medium' },
        { id: 'High', name: 'High' },
        { id: 'Urgent', name: 'Urgent' },
      ]} defaultValue="Medium" validate={[required()]} />
      <DateInput source="dueDate" />
      <TextInput source="assignee" defaultValue="You" />
      <BooleanInput source="completed" defaultValue={false} />
      <TextInput source="notes" multiline rows={4} fullWidth />
    </SimpleForm>
  </Create>
);