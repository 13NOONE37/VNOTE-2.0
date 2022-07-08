import React, { useContext, useReducer } from 'react';
import AppContext from 'store/AppContext';
import Header from 'components/header/Header';
import './Main.css';
import Footer from 'components/Footer/Footer';
import useWindowSize from 'utils/useWindowSize';
import SearchBar from 'components/header/SearchBar/SearchBar';
import TagsSlider from 'components/TagsSlider/TagsSlider';
import NoteContainer from 'components/Note/NoteContainer/NoteContainer';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { useParams } from 'react-router-dom';
import DeleteFooter from 'components/DeleteFooter/DeleteFooter';
import ActionHeader from 'components/ActionHeader/ActionHeader';
import NoteFooter from 'components/Note/NoteFullView/NoteFooter/NoteFooter';
import MultiActionFooter from 'components/MultiActionFooter/MultiActionFooter';

export default function Main() {
  const { category } = useParams();

  const { theme } = useContext(AppContext);

  //TODO Every element should be focusable and accesable by tab nad css'ed
  const size = useWindowSize();
  injectStyle(); //! temp, we have to use own styles for notify

  const [notesState, setNotesState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      selectedNotes: {},
      showTagView: false,
      showFullView: false,
      currentId: undefined,
    },
  );
  return (
    <div className="container">
      {Object.keys(notesState.selectedNotes).length > 0 ? (
        <ActionHeader notesState={notesState} setNotesState={setNotesState} />
      ) : (
        <Header />
      )}
      {size.width < 750 && <SearchBar variant2={true} />}
      <TagsSlider />
      <ToastContainer position="bottom-right" newestOnTop theme={theme} />
      <NoteContainer notesState={notesState} setNotesState={setNotesState} />
      {Object.keys(notesState.selectedNotes).length > 0 ? (
        <MultiActionFooter notesState={notesState} />
      ) : category === 'trash' ? (
        <DeleteFooter />
      ) : (
        <Footer setNotesState={setNotesState} />
      )}
    </div>
  );
}
