import { gql, useMutation, useQuery } from '@apollo/client';
import { Route, Link } from 'wouter';
import { Editor, EditorState, convertToRaw } from 'draft-js';
import { useState } from 'react'
import './App.css'

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
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [currentNote, setCurrentNote] = useState(() => EditorState.createEmpty())
  const [saveNote] = useMutation(SAVE_NOTE_MUTATION)
  const { data, refetch } = useQuery(GET_NOTES_QUERY)

  const handleChange = (state: EditorState) => {
    setEditorState(state);
  }

  const handleSave = async () => {
    const contentState = editorState.getCurrentContent()
    const content = contentState.getPlainText()

    setCurrentNote(content)

    await saveNote({
      variables: { content },
    });

    refetch()
  };

  return (
    <>
      <h1>Write a Draft</h1>
      <div className="card">
        <Editor
          editorState={editorState}
          onChange={handleChange}
        />
        {/* placeholder="Write something!" */}
        <br />
        <br />
        <button onClick={handleSave}>Save note</button>

      </div>
      <div>
        <h2>Saved Notes</h2>
        {data?.notes.map((note: { id: string; content: string }) => (
          <p key={note.id}>{note.content}</p>
        ))}
      </div>
    </>
  )
}

export default App
