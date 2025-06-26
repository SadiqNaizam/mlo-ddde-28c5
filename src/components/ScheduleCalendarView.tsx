import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, getDay, isSameMonth, isSameDay, addMonths, subMonths, addWeeks, subWeeks, set } from 'date-fns';

// Mock Data for demonstration
interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description: string;
  recipe?: string;
  status: 'planned' | 'in-progress' | 'completed';
  color: 'blue' | 'green' | 'red' | 'purple';
}

const mockEvents: CalendarEvent[] = [
  { id: '1', title: 'Prepare Sourdough Starter', start: set(new Date(), { hours: 8, minutes: 0 }), end: set(new Date(), { hours: 9, minutes: 0 }), description: 'Feed the mother starter and prepare levain for tomorrow\'s bake.', recipe: 'Classic Sourdough', status: 'planned', color: 'blue' },
  { id: '2', title: 'Bake Croissants', start: set(new Date(), { hours: 6, minutes: 0 }), end: set(new Date(), { hours: 11, minutes: 0 }), description: 'Lamination, proofing, and baking of 50 butter croissants.', recipe: 'Butter Croissant', status: 'in-progress', color: 'green' },
  { id: '3', title: 'Client Cake Tasting', start: set(addWeeks(new Date(), 1), { hours: 14, minutes: 0 }), end: set(addWeeks(new Date(), 1), { hours: 15, minutes: 0 }), description: 'Tasting session for the wedding cake order #1024.', status: 'planned', color: 'purple' },
  { id: '4', title: 'Deep Clean Ovens', start: set(subWeeks(new Date(), 1), { hours: 16, minutes: 0 }), end: set(subWeeks(new Date(), 1), { hours: 18, minutes: 0 }), description: 'Scheduled bi-weekly deep cleaning of all baking ovens.', status: 'completed', color: 'red' },
];

const eventColorClasses = {
  blue: 'bg-blue-100 border-blue-300 text-blue-800',
  green: 'bg-green-100 border-green-300 text-green-800',
  red: 'bg-red-100 border-red-300 text-red-800',
  purple: 'bg-purple-100 border-purple-300 text-purple-800',
};


const ScheduleCalendarView: React.FC = () => {
  console.log('ScheduleCalendarView loaded');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const handlePrev = () => {
    setCurrentDate(viewMode === 'month' ? subMonths(currentDate, 1) : subWeeks(currentDate, 1));
  };

  const handleNext = () => {
    setCurrentDate(viewMode === 'month' ? addMonths(currentDate, 1) : addWeeks(currentDate, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday start
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });
    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [currentDate]);

  const weekDays = useMemo(() => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
    return eachDayOfInterval({ start: weekStart, end: weekEnd });
  }, [currentDate]);


  const renderMonthView = () => (
    <>
      <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-500 border-b">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="py-2">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 grid-rows-5">
        {calendarDays.map((day) => {
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isToday = isSameDay(day, new Date());
          return (
            <div key={day.toString()} className={`relative border-t border-r p-2 min-h-[120px] ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'}`}>
              <time dateTime={format(day, 'yyyy-MM-dd')} className={`text-sm ${isToday ? 'bg-blue-600 text-white rounded-full h-6 w-6 flex items-center justify-center font-bold' : ''} ${!isCurrentMonth ? 'text-gray-400' : ''}`}>
                {format(day, 'd')}
              </time>
              <div className="mt-1 space-y-1">
                {events.filter(e => isSameDay(e.start, day)).map(event => (
                  <button key={event.id} onClick={() => handleEventClick(event)} className={`w-full text-left p-1 rounded-md text-xs border cursor-grab ${eventColorClasses[event.color]}`}>
                    {event.title}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );

  const renderWeekView = () => (
     <div className="flex flex-col">
      <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-500 border-b">
        {weekDays.map(day => (
          <div key={day.toString()} className="py-2 border-r">
            <div>{format(day, 'EEE')}</div>
            <div className={`text-lg font-bold ${isSameDay(day, new Date()) ? 'text-blue-600' : ''}`}>{format(day, 'd')}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 flex-grow">
        {weekDays.map(day => (
          <div key={day.toString()} className="relative border-r p-2 min-h-[300px]">
             {events.filter(e => isSameDay(e.start, day)).map(event => (
              <button key={event.id} onClick={() => handleEventClick(event)} className={`w-full text-left p-2 mb-2 rounded-md text-xs border cursor-grab ${eventColorClasses[event.color]}`}>
                <p className="font-semibold">{event.title}</p>
                <p className="text-xs">{format(event.start, 'p')} - {format(event.end, 'p')}</p>
              </button>
             ))}
          </div>
        ))}
      </div>
    </div>
  );


  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={handlePrev}><ChevronLeft className="h-4 w-4" /></Button>
          <CardTitle className="text-xl font-bold">{format(currentDate, viewMode === 'month' ? 'MMMM yyyy' : 'MMMM d, yyyy')}</CardTitle>
          <Button variant="outline" size="icon" onClick={handleNext}><ChevronRight className="h-4 w-4" /></Button>
          <Button variant="outline" onClick={handleToday}>Today</Button>
        </div>
        <div className="flex items-center gap-2">
          <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as 'month' | 'week')}>
            <ToggleGroupItem value="month">Month</ToggleGroupItem>
            <ToggleGroupItem value="week">Week</ToggleGroupItem>
          </ToggleGroup>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-grow overflow-auto">
        {viewMode === 'month' ? renderMonthView() : renderWeekView()}
      </CardContent>

      <Dialog open={!!selectedEvent} onOpenChange={(isOpen) => !isOpen && setSelectedEvent(null)}>
        <DialogContent>
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedEvent.title} 
                  <Badge variant="secondary">{selectedEvent.status}</Badge>
                </DialogTitle>
                <DialogDescription>
                  {format(selectedEvent.start, 'MMMM d, yyyy')} from {format(selectedEvent.start, 'p')} to {format(selectedEvent.end, 'p')}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-2">
                <p><span className="font-semibold">Description:</span> {selectedEvent.description}</p>
                {selectedEvent.recipe && <p><span className="font-semibold">Associated Recipe:</span> {selectedEvent.recipe}</p>}
              </div>
              <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedEvent(null)}>Close</Button>
                  <Button>Edit Event</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ScheduleCalendarView;