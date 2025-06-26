import React from 'react';

// Import Layout Components
import Header from '@/components/layout/Header';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import Footer from '@/components/layout/Footer';

// Import Page-Specific Components
import ScheduleCalendarView from '@/components/ScheduleCalendarView';

const BakingSchedule = () => {
  console.log('BakingSchedule page loaded');

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <CollapsibleSidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Baking Schedule</h1>
            <p className="text-muted-foreground mt-2">
              Plan your production schedule. Click on a day or an event to see details, or use the "Add Event" button to plan a new bake.
            </p>
          </div>
          {/* The calendar view is designed to be flexible in height and will grow to fill the container. */}
          <div className="flex-1 -mx-4 -mb-4 sm:-mx-6 lg:-mx-8 sm:-mb-6 lg:-mb-8">
             <ScheduleCalendarView />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default BakingSchedule;