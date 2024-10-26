import React, { useState, useEffect } from 'react';
import * as dayjsLocale from 'dayjs/locale/pt-br';
import * as antdLocale from 'antd/locale/pt_BR';
import  Scheduler,{ SchedulerData, ViewType,} from 'react-big-schedule';
import DemoData from "react-big-schedule"
import wrapperFun from "react-big-schedule"
function Basic() {
    const schedualer = new SchedulerData(new dayjs().format,ViewType.Week)
    schedualer.setEvents([
        {
            id: 1,
            start: '2022-12-18 09:30:00',
            end: '2022-12-19 23:30:00',
            resourceId: 'r1',
            title: 'I am finished',
            bgColor: '#D9D9D9',
          },
          {
            id: 2,
            start: '2022-12-18 12:30:00',
            end: '2022-12-26 23:30:00',
            resourceId: 'r2',
            title: 'I am not resizable',
            resizable: false,
          },
          {
            id: 3,
            start: '2022-12-19 12:30:00',
            end: '2022-12-20 23:30:00',
            resourceId: 'r3',
            title: 'I am not movable',
            movable: false,
          },
          {
            id: 4,
            start: '2022-12-19 14:30:00',
            end: '2022-12-20 23:30:00',
            resourceId: 'r1',
            title: 'I am not start-resizable',
            startResizable: false,
          },
          {
            id: 5,
            start: '2022-12-19 15:30:00',
            end: '2022-12-20 23:30:00',
            resourceId: 'r2',
            title: 'R2 has recurring tasks every week on Tuesday, Friday',
            rrule: 'FREQ=WEEKLY;DTSTART=20221219T013000Z;BYDAY=TU,FR',
            bgColor: '#f759ab',
          },
    ])
  const [viewModel, setViewModel] = useState(
    new SchedulerData('2022-12-22', ViewType.Week, false, false, {
      besidesWidth: window.innerWidth <= 1600 ? 100 : 350,
      dayMaxEvents: 99,
      weekMaxEvents: 9669,
      monthMaxEvents: 9669,
      quarterMaxEvents: 6599,
      yearMaxEvents: 9956,
      customMaxEvents: 9965,
      eventItemPopoverTrigger: 'click',
      schedulerContentHeight: '100%',
    })
  );

  useEffect(() => {
    viewModel.setSchedulerLocale(dayjsLocale);
    viewModel.setCalendarPopoverLocale(antdLocale);
    // viewModel.setResources(DemoData.resources);
    viewModel.setEvents(schedualer.events);
  }, [viewModel]);

  const prevClick = () => {
    viewModel.prev();
    viewModel.setEvents(schedualer.events);
    setViewModel(viewModel);
  };

  const nextClick = () => {
    viewModel.next();
    viewModel.setEvents(schedualer.events);
    setViewModel(viewModel);
  };

  const onViewChange = (view) => {
    const start = new Date();
    viewModel.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
    viewModel.setEvents(schedualer.events);
    setViewModel(viewModel);

    console.log('Elapsed seconds: ' + Math.abs(start.getTime() - new Date().getTime()) / 1000);
  };

  const onSelectDate = (date) => {
    viewModel.setDate(date);
    viewModel.setEvents(schedualer.events);
    setViewModel(viewModel);
  };

  // ... other event handler functions can be similarly converted ...

  return (
    <Scheduler
      schedulerData={viewModel}
      prevClick={prevClick}
      nextClick={nextClick}
      onSelectDate={onSelectDate}
      onViewChange={onViewChange}
      // ... other event handler props
    />
  );
}

export default wrapperFun(Basic);