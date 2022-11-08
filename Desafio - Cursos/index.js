
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(3000, () => console.log("http://localhost:3000"));

const { nuevoCurso, getCursos, editarCurso, eliminarCurso } = require("./consultas");


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

app.post("/curso", async (req, res) => {
  
  const curso = req.body;
 
  const respuesta = await nuevoCurso(curso);
 
  res.send(respuesta);
});


app.get("/cursos", async (req, res) => {

  const respuesta = await getCursos();
 
  res.send(respuesta);
});


app.put("/curso", async (req, res) => {

  const curso = req.body;

  const respuesta = await editarCurso(curso.id, curso)

  res.send(respuesta);
});


app.delete("/curso/:id", async (req, res) => {

  const { id } = req.params;
 
  const respuesta = await eliminarCurso(id);
  
  respuesta > 0
    ? res.send(`El curso de id ${id} fue eliminado con éxito`)
    : res.send("No exiun curso registrado con ese id");
});