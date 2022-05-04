import React from 'react';
import NotePreview from '../NotePreview/NotePreview';
import './NoteContainer.css';
export default function NoteContainer() {
  const notes = [
    {
      title: 'Javascript / TypeScript Tips for good performance',
      date: new Date(),
      color: 1,
    },

    {
      title: 'Javascript / TypeScript Tips for good performance',
      date: new Date(),
      color: 2,
    },
    {
      title: 'Javascript / TypeScript Tips for good performance',
      date: new Date(),
      color: 3,
    },
    {
      title: 'Javascript / TypeScript Tips for good performance',
      date: new Date(),
      color: 4,
    },
    {
      title: 'Kinny Zimmer',
      date: new Date(),
      color: 5,
    },
    {
      title: 'Javascript / TypeScript Tips for good performance',
      date: new Date(),
      color: 4,
    },
  ];
  return (
    <div className="noteContainer">
      {notes.map((item) => (
        <NotePreview {...item} />
      ))}
    </div>
  );
}
