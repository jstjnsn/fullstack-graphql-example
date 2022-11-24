import express from "express";

const app = express();

app.get("/users", (_, res) => {
  res.json({
    users: [
      {
        name: "Joost",
      },
      {
        name: "Laura",
      },
    ],
  });
});

app.listen(3000, () =>
  console.log("Express server running on http://localhost:3000 🚀")
);
