import { gql, useMutation, useQuery } from '@apollo/client';
import { Route, Link } from 'wouter';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { useState } from 'react'
import './App.css'

if (typeof global === 'undefined') {
  window.global = window
}

const SAVE_NOTE_MUTATION = gql`
  mutation SaveNote($content: String!) {
    saveNote(content: $content) {
      id
      content
    }
  }
`;

const GET_NOTES_QUERY = gql`
  query GetNotes {
    notes {
      id
      content
    }
  }
`;

function App() {
  const [text, setText] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [saveNote] = useMutation(SAVE_NOTE_MUTATION);
  const { data, refetch } = useQuery(GET_NOTES_QUERY);

  const handleChange = (event) => {
    // setText(event.target.value);
    setEditorState(event);
  };
  console.log(editorState);

  const handleSave = async () => {
    // await saveNote({
    //   variables: { content: text },
    // });
    // refetch();
    localStorage.setItem('draft', editorState)
    console.log(`nota salva! -> ${editorState}`);
  };

  return (
    <>
      <h1>Write a Draft</h1>
      <div className="card">
        <Editor
          editorState={editorState}
          onChange={handleChange}
          placeholder="Write something!"
        />
        {/* <textarea
          value={text}
          onChange={handleChange}
          placeholder="Write something!"
          rows={10}
          cols={50}
        /> */}
        <br />
        <br />
        <button onClick={handleSave}>Save note</button>

        {text && <p>Sua mensagem: {text}</p>}
      </div>
      {/* <div>
        <h2>Saved Notes</h2>
        {data?.notes.map((note: { id: string; content: string }) => (
          <p key={note.id}>{note.content}</p>
        ))}
      </div> */}
    </>
  )
}

export default App
