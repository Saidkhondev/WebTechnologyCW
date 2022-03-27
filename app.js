const express = require("express");
const app = express();
const PORT = 8000;
const fs = require("fs");
const db = "./data/notes.json";

app.set("view engine", "pug");
app.use("/static", express.static("assets"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("Intro");
});


app.get("/home", (req, res) => {
  fs.readFile(db, (err, data) => {
    if (err) throw err;

    const notes = JSON.parse(data);

    res.render("home", { notes: notes });
  });
});

app.post("/add", (req, res) => {
  const formData = req.body;

  if (formData.note.trim() === "") {
    fs.readFile(db, (err, data) => {
      if (err) throw err;

      const notes = JSON.parse(data);

      res.render("home", { error: true, notes: notes });
    });
  } else {
    fs.readFile(db, (err, data) => {
      if (err) throw err;

      const notes = JSON.parse(data);
      const note = {
        id: id(),
        desc: formData.note,
        crossed: false,
      };

      notes.push(note);

      fs.writeFile(db, JSON.stringify(notes), (err) => {
        if (err) throw err;

        fs.readFile(db, (err, data) => {
          if (err) throw err;

          const notes = JSON.parse(data);

          res.render("home", { success: true, notes: notes });
        });
      });

      // res.redirect("/");
    });
  }
});



app.get("/:id/delete", (req, res) => {
  const id = req.params.id;
  fs.readFile(db, (err, data) => {
    if (err) throw err;

    const Notes = JSON.parse(data);
    const filteredData = Notes.filter((e) => e.id != id);

    fs.writeFile(db, JSON.stringify(filteredData), (err) => {
      if (err) throw err;

      if (filteredData.length == 0) res.redirect("/home");
      else res.render("home", { deleted: true, notes: filteredData });
    });
  });
});


app.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  fs.readFile(db, (err, data) => {
    if (err) throw err;

    const notesToEdit = JSON.parse(data);

    const NoteToEdit = notesToEdit.filter((e) => e.id == id)[0];

    const IndexOfslicedNote = notesToEdit.indexOf(NoteToEdit);
    const slicedNote = notesToEdit.splice(IndexOfslicedNote, 1)[0];

    fs.writeFile(db, JSON.stringify(notesToEdit), (err) => {
      if (err) throw err;

      res.render("Edit", {
        notes: notesToEdit,
        NoteToBeEdite: slicedNote,
        Id: id,
      });
    });
  });
});




app.post("/edit", (req, res) => {
  const formData = req.body;

  if (formData.note.trim() === "") {
    fs.readFile(db, (err, data) => {
      if (err) throw err;

      const notes = JSON.parse(data);

      res.render("home", { error: true, notes: notes });
    });
  } else {
    fs.readFile(db, (err, data) => {
      if (err) throw err;

      const notes = JSON.parse(data);
      const note = {
        id: id(),
        desc: formData.note,
        crossed: false,
      };

      notes.push(note);

      fs.writeFile(db, JSON.stringify(notes), (err) => {
        if (err) throw err;

        fs.readFile(db, (err, data) => {
          if (err) throw err;

          const notes = JSON.parse(data);

          res.render("home", { updated: true, notes: notes });
        });
      });
    })
  }
  })

app.get("/:id/crossed", (req, res) => {
  const id = req.params.id;
  fs.readFile(db, (err, data) => {
    if (err) throw err;

    const datas = JSON.parse(data);

    const noteToBeCrossed = datas.filter((e) => e.id == id)[0];
    const indexOfNote = datas.indexOf(noteToBeCrossed);

    const splicedNote = datas.splice(indexOfNote, 1)[0];
    if (splicedNote.crossed) splicedNote.crossed = false;
    else splicedNote.crossed = true;

    datas.unshift(splicedNote);
    fs.writeFile(db, JSON.stringify(datas), (err) => {
      if (err) throw err;

      // res.render("home", { notes: datas });
      res.redirect("/home");
    });
  });
});
      

      // res.redirect("/");
  

app.listen(PORT, () => {
  console.log("App is running on the Port : " + PORT);
});
var id = function () {
  return "_" + Math.random().toString(36);
};
