import { useState } from "react";
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DateSelectArg } from "@fullcalendar/core";

export default function Calendar() {
  const [events, setEvents] = useState([
      { title: 'Task A', start: '2025-11-11T09:00:00', end: '2025-11-11T10:00:00' },
      { title: 'Task B', start: '2025-11-11T13:00:00', end: '2025-11-11T15:00:00' },
    ])
  const [anchorPoint, setAnchorPoint] = useState<AnchorPoint | null>(null);
  const [newEvent, setNewEvent] = useState<CalendarEvent>({ title: "", start: "", end: "" });

  interface AnchorPoint {
    x: number;
    y: number;
  }

  interface CalendarEvent {
    title: string;
    start: string;
    end: string;
    id?: string;
  }

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    if (!selectInfo.jsEvent || !selectInfo.jsEvent.target) return;
    const rect = (selectInfo.jsEvent.target as HTMLElement).getBoundingClientRect();
    setAnchorPoint({ x: rect.left, y: rect.top });
    console.log(selectInfo.jsEvent, rect.left)
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

  console.log(anchorPoint)

  return (
    <div className="relative">
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
        selectable
        select={handleDateSelect}
        events={events}
        height="auto"
        eventClick={(info) => alert(info.event.title)}
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
  );
}
