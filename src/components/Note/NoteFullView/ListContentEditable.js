import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';

export default function ListContentEditable() {
  const [content, setContent] = useState(['6']);
  const [focusIndex, setFocusIndex] = useState(0);
  const [forceUpdate, setForceUpdate] = useState(1);
  const listedRef = useRef(null);

  const handleKeyDown = (e, index) => {
    console.log('HandleKeyDown🎋');
    let temp = content;
    console.log(temp);
    if (e.keyCode === 13) {
      temp.splice(index, 0, '');
    }
    console.log(temp);
    setContent(temp);
    setForceUpdate(forceUpdate + 1);
  };

  return (
    <div className="noteListedContent" ref={listedRef}>
      {/* 
    // ? każda linia będzie osobnym contenteditable
    //? każda linia zawiera event onInput który:
    //? waliduje na wypadek znaków które mogą dostarczyć js (zamienia je na entencje)
    //? na strzałki zmienia focus
    //? na enter tworzy nowy task lub rozdziela task i focusuje do nowej lini
        //!work ok but i think that it's will crashed when we split into seprate
        editable content
    */}
      {forceUpdate &&
        content.map((line, index) => (
          <ContentEditable
            key={index}
            className="noteContent"
            spellCheck={false}
            html={line}
            tagName="span"
            // onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            // onFocus={() => setFocusIndex(index)}
          />
          // <span
          //   className="noteContent"
          //   contentEditable={true}
          //   suppressContentEditableWarning={true}
          //   dangerouslySetInnerHTML={{ __html: line }}
          //   onKeyDown={(e) => handleKeyDown(e, index)}
          //   onInput={(e) => console.log(e)}
          //   onFocus={() => setFocusIndex(index)}
          // />
        ))}
    </div>
  );
}
