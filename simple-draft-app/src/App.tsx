import { gql, useMutation, useQuery } from '@apollo/client';
import { Route, Link } from 'wouter';
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
  const [text, setText] = useState('');
  const [saveNote] = useMutation(SAVE_NOTE_MUTATION);
  const { data, refetch } = useQuery(GET_NOTES_QUERY);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSave = async () => {
    await saveNote({
      variables: { content: text },
    });
    refetch();
  };

  return (
    <>
      <h1>Write a Draft</h1>
      <div className="card">
        <textarea
          value={text}
          onChange={handleChange}
          placeholder="Write something!"
          rows={10}
          cols={50}
        />
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