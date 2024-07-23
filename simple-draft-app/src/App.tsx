import { gql, useMutation, useQuery } from '@apollo/client';
import { Route, Link } from 'wouter';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { useEffect, useState } from 'react'
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
  // const [text, setText] = useState('')
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [saveNote] = useMutation(SAVE_NOTE_MUTATION)
  const { data, refetch } = useQuery(GET_NOTES_QUERY)

  const handleChange = (state: EditorState) => {
    setEditorState(state);
  }

  const handleSave = async () => {
    console.log('current v');
    console.log(editorState.getCurrentContent());

    const contentState = editorState.getCurrentContent()
    console.log(`contentState: ${contentState}`)

    const rawContentState = convertToRaw(contentState)
    console.log(`rawContent: ${rawContentState}`)

    const content = JSON.stringify(rawContentState)
    console.log(`content: ${content}`)

    setEditorState(content)

    await saveNote({
      variables: { content },
    });

    localStorage.setItem('draft', editorState)
    console.log(`nota salva! -> ${editorState}`)

    refetch()
  };

  // useEffect(() => {
  //   if (data && data.notes.length > 0) {
  //     const latestNote = data.notes[data.notes.length - 1];
  //     const contentState = convertFromRaw(JSON.parse(latestNote.content));
  //     setEditorState(EditorState.createWithContent(contentState));
  //   }
  // }, [data]);

  return (
    <>
      <h1>Write a Draft</h1>
      <div className="card">
        <Editor
          editorState={editorState}
          onChange={handleChange}
        />
        {/* placeholder="Write something!" */}
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

        {/* {editorState && <p>Sua mensagem: {editorState}</p>} */}
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
