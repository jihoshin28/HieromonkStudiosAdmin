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
  NumberInput,
  DateInput,
  SelectInput,
  ReferenceInput,
  ReferenceField,
  NumberField,
  DateField,
  required,
} from 'react-admin';

export const ProjectList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <ReferenceField source="contractId" reference="contracts" label="Contract">
        <TextField source="title" />
      </ReferenceField>
      <NumberField source="progress" />
      <TextField source="status" />
      <DateField source="dueDate" />
      <EditButton />
    </Datagrid>
  </List>
);

export const ProjectEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" validate={[required()]} fullWidth />
      <ReferenceInput source="contractId" reference="contracts">
        <SelectInput optionText="title" validate={[required()]} />
      </ReferenceInput>
      <NumberInput source="progress" min={0} max={100} defaultValue={0} />
      <SelectInput source="status" choices={[
        { id: 'Planning', name: 'Planning' },
        { id: 'Active', name: 'Active' },
        { id: 'On Hold', name: 'On Hold' },
        { id: 'Completed', name: 'Completed' },
        { id: 'Cancelled', name: 'Cancelled' },
      ]} validate={[required()]} />
      <DateInput source="dueDate" validate={[required()]} />
      <TextInput source="description" multiline rows={4} fullWidth />
    </SimpleForm>
  </Edit>
);

export const ProjectCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={[required()]} fullWidth />
      <ReferenceInput source="contractId" reference="contracts">
        <SelectInput optionText="title" validate={[required()]} />
      </ReferenceInput>
      <NumberInput source="progress" min={0} max={100} defaultValue={0} />
      <SelectInput source="status" choices={[
        { id: 'Planning', name: 'Planning' },
        { id: 'Active', name: 'Active' },
      ]} defaultValue="Planning" validate={[required()]} />
      <DateInput source="dueDate" validate={[required()]} />
      <TextInput source="description" multiline rows={4} fullWidth />
    </SimpleForm>
  </Create>
);