import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";

const LIST_TODOS_QUERY = gql`
  query LIST_TODOS_QUERY {
    listTodos {
      items {
        id
        name
        description
      }
    }
  }
`;

const ListTodos = () => {
  const {
    data: { listTodos }
  } = useQuery(LIST_TODOS_QUERY);

  return (
    <ul>
      {listTodos &&
        listTodos.items.map(todo => {
          console.log("todo", todo);
          return (
            <li key={todo.id}>
              {todo.name} - {todo.description}
            </li>
          );
        })}
    </ul>
  );
};

export default ListTodos;
export { LIST_TODOS_QUERY };
