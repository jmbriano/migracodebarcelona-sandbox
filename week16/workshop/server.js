const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});

const albumsData = [
  {
    albumId: "10",
    artistName: "Beyoncé",
    collectionName: "Lemonade",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
    releaseDate: "2016-04-25T07:00:00Z",
    primaryGenreName: "Pop",
    url:
      "https://www.youtube.com/embed/PeonBmeFR8o?rel=0&amp;controls=0&amp;showinfo=0"
  },
  {
    albumId: "11",
    artistName: "Beyoncé",
    collectionName: "Dangerously In Love",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
    releaseDate: "2003-06-24T07:00:00Z",
    primaryGenreName: "Pop",
    url:
      "https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0"
  },
  {
    albumId: "12",
    artistName: "Beyoncé",
    collectionName: "Dangerously In Love Bis",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
    releaseDate: "2003-06-24T07:00:00Z",
    primaryGenreName: "Rock",
    url:
      "https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0"
  }
];

app.get("/albums", function (req, res) {
  if (req.query.genre){
    res.send(albumsData.filter( album => album.primaryGenreName == req.query.genre ))
  } else {
    res.send(albumsData);
  }
});

app.get("/albums/:albumId", (req, res) => {
  let found = false;
  albumsData.forEach((album, item) => {
    if (album.albumId == req.params.albumId) {
      res.send(album);
      found = true;
      return;
    };
  }
  );
  if (!found) {
    res.send("Not found");
  }

});

app.post("/albums", function (req, res) {
  console.log("POST /albums route");
  console.log(req.body);
  albumsData.push(req.body)
  res.send(albumsData)

});

app.delete("/albums/:albumId", (req, res) => {
  albumsData.forEach((album, index) => {
    if (album.albumId == req.params.albumId) {
      albumsData.splice(index, 1)
      res.send(albumsData);
    };
  }
  );
});


app.put("/albums/:albumId", (req, res) => {
  let found = false;
  albumsData.forEach((album, index) => {
    if (album.albumId == req.params.albumId) {
      albumsData[index] = req.body
      found = true;
      res.send(album);
      return;
    };
  }
  );
  if (!found) {
    res.send("Not found");
  }
});
