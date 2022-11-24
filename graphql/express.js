import cors from "cors";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const schema = buildSchema(`
  type Query {
    users: [User]
  }

  type User {
    name: String
  }
`);

const root = {
  users: () => {
    return [
      {
        name: "Joost",
      },
      {
        name: "Laura",
      },
    ];
  },
};

const app = express();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () =>
  console.log("Running a GraphQL API server at http://localhost:4000/graphql")
);
