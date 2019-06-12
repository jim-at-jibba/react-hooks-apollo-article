import React from "react";
import gql from "graphql-tag";
import { LIST_TODOS_QUERY } from "./listTodos";
import { useMutation } from "react-apollo-hooks";
// Mutation
const CREATE_TODO_MUTATION = gql`
  mutation CREATE_TODO_MUTATION($name: String!, $description: String!) {
    createTodo(input: { name: $name, description: $description }) {
      name
      id
    }
  }
`;

const CreateTodo = () => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const createTodoMutation = useMutation(CREATE_TODO_MUTATION);

  return (
    <div style={{ flex: 1, width: "100%" }}>
      <div style={{ paddingBottom: 20 }}>
        <input
          placeholder="name"
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1
          }}
          onChange={e => setName(e.target.value)}
          value={name}
        />
      </div>
      <div style={{ paddingBottom: 20 }}>
        <input
          placeholder="description"
          style={{
            paddingTop: 20,
            height: 40,
            borderColor: "gray",
            borderWidth: 1
          }}
          onChange={e => setDescription(e.target.value)}
          value={description}
        />
      </div>
      <button
        disabled={name === "" || description === "" ? true : false}
        onClick={() => {
          createTodoMutation({
            variables: {
              name,
              description
            },
            refetchQueries: [{ query: LIST_TODOS_QUERY }]
          });
          setName("");
          setDescription("");
        }}>
        Create Todo
      </button>
    </div>
  );
};

export default CreateTodo;
