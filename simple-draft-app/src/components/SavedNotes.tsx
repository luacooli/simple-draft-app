import { gql, useQuery } from '@apollo/client';

const GET_NOTES_QUERY = gql`
  query GetNotes {
    notes {
      id
      content
    }
  }
`;

function SavedNotes() {
  const { data } = useQuery(GET_NOTES_QUERY)

  return (
    <>
      <h2>Saved Notes</h2>
      {data?.notes.map((note: { id: string; content: string }) => (
        <p key={note.id}>{note.content}</p>
      ))}
    </>
  )
}

export default SavedNotes