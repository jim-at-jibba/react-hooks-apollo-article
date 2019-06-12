import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { LIST_TODOS_QUERY } from "./listTodos";

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

  return (
    <Mutation
      mutation={CREATE_TODO_MUTATION}
      variables={{ name, description }}
      refetchQueries={[{ query: LIST_TODOS_QUERY }]}>
      {(createTodo, { data, error }) => {
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
              onClick={() => {
                createTodo();
                setName("");
                setDescription("");
              }}>
              Create Todo
            </button>
          </div>
        );
      }}
    </Mutation>
  );
};

export default CreateTodo;
