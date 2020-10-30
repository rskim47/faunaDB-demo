const app = require('express')();
const faunadb = require('faunadb');

const client = new faunadb.Client({ secret: "fnAD5cBtftACCQe5s9-ddyRBgEap-O3GB4mVW1ih" });

const {
  Paginate,
  Get,
  Select,
  Match,
  Index,
  Create,
  Collection,
  Lambda,
  Var,
  Join,
  Ref
} = faunadb.query;

app.listen(3000, () => console.log("Server running on Port 3000"));

// Getting tweets
app.get('/tweet/:id', async (req, res) => {
  try {
    const doc = await client.query(
      Get(
        Ref(
          Collection('tweets'),
          req.params.id
        )
      )
    )
    res.send(doc);
  } catch (err) {
    console.error(err);
    res.status(401).json({
      error: err.toString()
    })
  }
})

// Posting Tweet
app.post('/tweet', async (req, res) => {
  try {

    // Reading user data is
    const data = {
      user: Select('ref', Get(Match(Index('users_by_name'), "Rick Kim"))),
      text: "Hello this is my second tweet!"
    }

    const doc = await client.query(
      Create(
        Collection('tweets'),
        { data }
      )
    )

    res.send(doc)

  } catch (err) {
    console.error(err);
    res.status(401).json({
      error: err.toString()
    })
  }
})

// ACID compliant => consistency is maintained with a write to a single node.