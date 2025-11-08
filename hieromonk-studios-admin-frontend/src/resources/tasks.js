import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
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
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const TaskList = () => {
  const [events, setEvents] = useState([
    { title: 'Task A', start: '2025-11-04T09:00:00', end: '2025-11-04T10:00:00' },
    { title: 'Task B', start: '2025-11-04T13:00:00', end: '2025-11-04T15:00:00' },
  ])
  const [anchorPoint, setAnchorPoint] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });

  const handleDateSelect = (selectInfo) => {
    const rect = selectInfo.jsEvent.target.getBoundingClientRect();
    setAnchorPoint({ x: rect.left, y: rect.top });
    setNewEvent({
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      title: "",
    });
  };

  const handleAddEvent = () => {
    if (!newEvent.title.trim()) return;
    setEvents((prev) => [...prev, { ...newEvent, id: Date.now().toString() }]);
    setAnchorPoint(null);
  };

  // const handleSelect = (selectInfo) => {
  //   const title = prompt('Enter event title')
  //   const calendarApi = selectInfo.view.calendar;
  //   console.log(calendarApi)
  //   console.log(title)
  
  //   calendarApi.unselect();
  
  //   if (title) {
  //     const newEvent = {
  //       title,
  //       start: selectInfo.startStr,
  //       end: selectInfo.endStr,
  //       allDay: selectInfo.allDay,
  //     }
  
  //     setEvents((prev) => [...prev, newEvent])
  //   }

  //   console.log(events)
  // }


  return (
    <React.Fragment>
      <div class="calendar-bg">
        <FullCalendar
          headerToolbar={{
            start: 'dayGridMonth,timeGridWeek,timeGridDay custom1',
            center: 'title',
            end: 'custom2 prevYear,prev,next,nextYear'
          }}
          footerToolbar={{
            start: 'custom1,custom2 custom3',
            center: '',
            end: 'prev,next'
          }}
          customButtons={{
            custom1: {
              text: 'custom 1',
              click: () => {
                alert('clicked custom button 1!');
              }
            },
            custom2: {
              text: '+',
              click: () => {
                
              }
            },
            custom3: {
              text: 'custom 3',
              click: () => {
                alert('clicked custom button 3!')
              }
            }
          }}
            
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin]}
          themeSystem='bootstrap5'
          initialView="timeGridWeek"
          editable={true}
          selectable={true}
          select={handleDateSelect}
          events={events}
          eventClick={(info) => alert(info.event.title)}
          dateClick={(info) => console.log('Clicked date:', info.dateStr)}
        />

        {anchorPoint && (
          <Popover open onOpenChange={(o) => !o && setAnchorPoint(null)}>
            <PopoverTrigger asChild>
              <div
                style={{
                  position: "absolute",
                  left: anchorPoint.x,
                  top: anchorPoint.y,
                  width: 1,
                  height: 1,
                }}
              />
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4 space-y-2">
              <h3 className="font-semibold">New Event</h3>
              <Input
                placeholder="Title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setAnchorPoint(null)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddEvent}>Add</Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
      
      
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

    </React.Fragment>
  
  );
}
  
  

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