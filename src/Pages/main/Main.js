import React, { useContext, useReducer } from 'react';
import AppContext from 'store/AppContext';
import Header from 'components/header/Header';
import './Main.css';
import Footer from 'components/Footer/Footer';
import SearchBar from 'components/header/SearchBar/SearchBar';
import TagsSlider from 'components/TagsSlider/TagsSlider';
import NoteContainer from 'components/Note/NoteContainer/NoteContainer';
import { ToastContainer } from 'react-toastify';
// import { injectStyle } from 'react-toastify/dist/inject-style';
import { useParams } from 'react-router-dom';
import DeleteFooter from 'components/DeleteFooter/DeleteFooter';
import ActionHeader from 'components/ActionHeader/ActionHeader';
import MultiActionFooter from 'components/MultiActionFooter/MultiActionFooter';
import NewRecord from 'components/Note/NoteAssets/Record/NewRecord/NewRecord';
import NewImage from 'components/Note/NoteAssets/Image/NewImage/NewImage';
import NewDraw from 'components/Note/NoteAssets/Draw/NewDraw/NewDraw';

export default function Main() {
  const { category } = useParams();

  const { theme, isDataFetched } = useContext(AppContext);

  // injectStyle();

  const [notesState, setNotesState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      selectedNotes: {},
      showTagView: false,
      showFullView: false,
      currentId: undefined,

      showRecordModal: false,
      showImageModal: false,
      showFullViewImage: false,
      showDrawModal: false,
      showAttachmentModal: false,
    },
  );
  return (
    <div className="container">
      {Object.keys(notesState.selectedNotes).length > 0 ? (
        <ActionHeader notesState={notesState} setNotesState={setNotesState} />
      ) : (
        <Header />
      )}
      <div className="test">
        <SearchBar variant2={true} />
      </div>
      <TagsSlider />
      <ToastContainer position="bottom-right" newestOnTop theme={theme} />
      <NoteContainer notesState={notesState} setNotesState={setNotesState} />
      {Object.keys(notesState.selectedNotes).length > 0 && isDataFetched ? (
        <MultiActionFooter
          notesState={notesState}
          setNotesState={setNotesState}
        />
      ) : category === 'trash' && isDataFetched ? (
        <DeleteFooter />
      ) : (
        isDataFetched && <Footer setNotesState={setNotesState} />
      )}
      {!notesState.showAttachmentModal && notesState.showRecordModal && (
        <NewRecord
          noteId={notesState.showRecordModal}
          setNotesState={setNotesState}
        />
      )}
      {!notesState.showAttachmentModal && notesState.showImageModal && (
        <NewImage
          noteId={notesState.showImageModal}
          setNotesState={setNotesState}
        />
      )}

      {!notesState.showAttachmentModal && notesState.showDrawModal && (
        <NewDraw
          noteId={notesState.showDrawModal}
          setNotesState={setNotesState}
        />
      )}
    </div>
  );
}
