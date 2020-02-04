const sql = require("./db.js");

// constructor
const Comentario = function(comentario) {
  this.contenido = comentario.contenido;
  this.fecha = comentario.fecha;
};


Comentario.create = (newComentario, result) => {
  sql.query("INSERT INTO comentarios SET ?", newComentario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created comentario: ", { id: res.insertId, ...newComentario });
    result(null, { id: res.insertId, ...newComentario });
  });
};

Comentario.findById = (comentarioId, result) => {
  sql.query(`SELECT * FROM comentarios WHERE idcomentarios = ${comentarioId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found comentario: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Comentario.getAll = result => {
  sql.query("SELECT * FROM comentarios", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("comentarios: ", res);
    result(null, res);
  });
};




Comentario.updateById = (idcomentarios, comentarios, result) => {
  sql.query(
    "UPDATE comentarios SET contenido = ?, fecha = ? WHERE idcomentarios = ?",
    [comentarios.contenido, comentarios.fecha, idcomentarios ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated comentarios: ", { idcomentarios: idcomentarios, ...comentarios });
      result(null, { idcomentarios: idcomentarios, ...comentarios });
    }
  );
};

Comentario.remove = (id, result) => {
  sql.query("DELETE FROM comentarios WHERE idcomentarios = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted comentarios with id: ", id);
    result(null, res);
  });
};

Comentario.removeAll = result => {
  sql.query("DELETE FROM comentarios", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} comentarios`);
    result(null, res);
  });
};

module.exports = Comentario;
