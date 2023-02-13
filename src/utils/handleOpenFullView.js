const handleOpenFullView = (setNotesState, noteId) => {
  setNotesState({ showFullView: true });
  setNotesState({ currentId: noteId });
};

export default handleOpenFullView;
