import React from 'react';
import NotePreview from '../NotePreview/NotePreview';
import './NoteContainer.css';
import Masonry from 'react-masonry-css';

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
      title: 'Bomba na banie',
      date: new Date(),
      color: 4,
    },
    {
      title: 'Kinny Zimmer',
      date: new Date(),
      color: 5,
    },
    {
      title: 'Marcin Dubiel vs Alberto',
      date: new Date(),
      color: 4,
    },
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
      title: 'Bomba na banie',
      date: new Date(),
      color: 4,
    },
    {
      title: 'Kinny Zimmer',
      date: new Date(),
      color: 5,
    },
    {
      title: 'Marcin Dubiel vs Alberto',
      date: new Date(),
      color: 4,
    },
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
      title: 'Bomba na banie',
      date: new Date(),
      color: 4,
    },
    {
      title: 'Kinny Zimmer',
      date: new Date(),
      color: 5,
    },
    {
      title: 'Marcin Dubiel vs Alberto',
      date: new Date(),
      color: 4,
    },
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
      title: 'Bomba na banie',
      date: new Date(),
      color: 4,
    },
    {
      title: 'Kinny Zimmer',
      date: new Date(),
      color: 5,
    },
    {
      title: 'Marcin Dubiel vs Alberto',
      date: new Date(),
      color: 4,
    },
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
      title: 'Bomba na banie',
      date: new Date(),
      color: 4,
    },
    {
      title: 'Kinny Zimmer',
      date: new Date(),
      color: 5,
    },
    {
      title: 'Marcin Dubiel vs Alberto',
      date: new Date(),
      color: 4,
    },
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
      title: 'Bomba na banie',
      date: new Date(),
      color: 4,
    },
    {
      title: 'Kinny Zimmer',
      date: new Date(),
      color: 5,
    },
    {
      title: 'Marcin Dubiel vs Alberto',
      date: new Date(),
      color: 4,
    },
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
      title: 'Bomba na banie',
      date: new Date(),
      color: 4,
    },
    {
      title: 'Kinny Zimmer',
      date: new Date(),
      color: 5,
    },
    {
      title: 'Marcin Dubiel vs Alberto',
      date: new Date(),
      color: 4,
    },
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
      title: 'Bomba na banie',
      date: new Date(),
      color: 4,
    },
    {
      title: 'Kinny Zimmer',
      date: new Date(),
      color: 5,
    },
    {
      title: 'Marcin Dubiel vs Alberto',
      date: new Date(),
      color: 4,
    },
  ];

  const breakpointColumnsObj = {
    default: Math.max(6, Math.floor(window.innerWidth / 190) - 2),
    1550: 5,
    1300: 4,
    905: 3,
    520: 2,
    300: 2,
  };
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="noteContainer"
      columnClassName="my-masonry-grid_column"
    >
      {notes.map((item) => (
        <NotePreview {...item} />
      ))}
      <NotePreview className="noteBlank" />
      <NotePreview className="noteBlank" />
      <NotePreview className="noteBlank" />
    </Masonry>
  );
}
