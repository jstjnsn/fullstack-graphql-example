import {
  graphql,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import fetch from "node-fetch";

const UserType = new GraphQLObjectType({
  name: "User",
  description: "A user with a name",
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: (user) => user.name,
    },
  }),
});

const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "The root of all queries",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve: (_) =>
        fetch("http://localhost:3000/users")
          .then((res) => res.json())
          .then((json) => json.users),
    },
  }),
});

const schema = new GraphQLSchema({
  query: QueryType,
});

graphql({
  schema,
  source: "{ users { name } }",
}).then((response) => {
  console.log(response.data);
});
