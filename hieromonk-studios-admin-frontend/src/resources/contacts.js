import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  Edit,
  Create,
  Show,
  SimpleForm,
  SimpleShowLayout,
  TextInput,
  SelectInput,
  required,
  ReferenceField,
  NumberField,
} from 'react-admin';

export const ContactList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="phone" />
      <TextField source="parish" />
      <TextField source="status" />
      <EditButton />
    </Datagrid>
  </List>
);

export const ContactEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" validate={[required()]} fullWidth />
      <TextInput source="email" type="email" validate={[required()]} fullWidth />
      <TextInput source="phone" fullWidth />
      <TextInput source="parish" fullWidth />
      <SelectInput source="status" choices={[
        { id: 'Active', name: 'Active' },
        { id: 'Prospect', name: 'Prospect' },
        { id: 'Inactive', name: 'Inactive' },
      ]} />
      <TextInput source="notes" multiline rows={4} fullWidth />
    </SimpleForm>
  </Edit>
);

export const ContactCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={[required()]} fullWidth />
      <TextInput source="email" type="email" validate={[required()]} fullWidth />
      <TextInput source="phone" fullWidth />
      <TextInput source="parish" fullWidth />
      <SelectInput source="status" choices={[
        { id: 'Active', name: 'Active' },
        { id: 'Prospect', name: 'Prospect' },
      ]} defaultValue="Prospect" />
      <TextInput source="notes" multiline rows={4} fullWidth />
    </SimpleForm>
  </Create>
);

export const ContactShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="phone" />
      <TextField source="parish" />
      <TextField source="status" />
      <TextField source="notes" />
    </SimpleShowLayout>
  </Show>
);