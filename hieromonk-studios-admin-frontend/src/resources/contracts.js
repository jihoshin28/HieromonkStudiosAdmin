import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  Edit,
  Create,
  Show,
  SimpleForm,
  SimpleShowLayout,
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

export const ContractList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="title" />
      <ReferenceField source="contactId" reference="contacts" label="Contact">
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="amount" options={{ style: 'currency', currency: 'USD' }} />
      <TextField source="status" />
      <DateField source="startDate" />
      <DateField source="endDate" />
      <EditButton />
    </Datagrid>
  </List>
);

export const ContractEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" validate={[required()]} fullWidth />
      <ReferenceInput source="contactId" reference="contacts">
        <SelectInput optionText="name" validate={[required()]} />
      </ReferenceInput>
      <NumberInput source="amount" validate={[required()]} />
      <SelectInput source="status" choices={[
        { id: 'Draft', name: 'Draft' },
        { id: 'Sent', name: 'Sent' },
        { id: 'Signed', name: 'Signed' },
        { id: 'In Progress', name: 'In Progress' },
        { id: 'Completed', name: 'Completed' },
        { id: 'Cancelled', name: 'Cancelled' },
      ]} validate={[required()]} />
      <DateInput source="startDate" validate={[required()]} />
      <DateInput source="endDate" validate={[required()]} />
      <TextInput source="pandaDocId" label="PandaDoc ID" fullWidth />
      <TextInput source="notes" multiline rows={4} fullWidth />
    </SimpleForm>
  </Edit>
);

export const ContractCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" validate={[required()]} fullWidth />
      <ReferenceInput source="contactId" reference="contacts">
        <SelectInput optionText="name" validate={[required()]} />
      </ReferenceInput>
      <NumberInput source="amount" validate={[required()]} />
      <SelectInput source="status" choices={[
        { id: 'Draft', name: 'Draft' },
        { id: 'Sent', name: 'Sent' },
        { id: 'Signed', name: 'Signed' },
      ]} defaultValue="Draft" validate={[required()]} />
      <DateInput source="startDate" validate={[required()]} />
      <DateInput source="endDate" validate={[required()]} />
      <TextInput source="notes" multiline rows={4} fullWidth />
    </SimpleForm>
  </Create>
);

export const ContractShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" />
      <ReferenceField source="contactId" reference="contacts">
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="amount" options={{ style: 'currency', currency: 'USD' }} />
      <TextField source="status" />
      <DateField source="startDate" />
      <DateField source="endDate" />
      <TextField source="pandaDocId" label="PandaDoc ID" />
      <TextField source="notes" />
    </SimpleShowLayout>
  </Show>
);
