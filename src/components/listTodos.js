import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

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
  return (
    <Query query={LIST_TODOS_QUERY}>
      {({ data, error, loading }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error.message}</p>;
        console.log("TODOS", data);
        return (
          <ul>
            {data.listTodos.items &&
              data.listTodos.items.map(todo => {
                console.log("todo", todo);
                return (
                  <li key={todo.id}>
                    {todo.name} - {todo.description}
                  </li>
                );
              })}
          </ul>
        );
      }}
    </Query>
  );
};

export default ListTodos;
export { LIST_TODOS_QUERY };
