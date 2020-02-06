const sql = require("./db.js");

// constructor
const Historia = function(historia) {
  this.titulo = historia.nombre;
  this.contenido = historia.apellidos;
  this.fecha = historia.apellidos;
};


Historia.create = (newHistoria, result) => {
  sql.query("INSERT INTO historias(titulo ,contenido ,fecha ,idcategorias) values($1,$2,$3,$4)", newHistoria.titulo,newHistoria.contenido,newHistoria.fecha,1, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created historias: ", { id: res.insertId, ...newHistoria });
    result(null, { id: res.insertId, ...newHistoria });
  });
};

Historia.findById = (historiaId, result) => {
  sql.query(`SELECT * FROM historias WHERE idhistorias = ${historiaId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found historia: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Historia.getAll = result => {
  sql.query("SELECT * FROM historias", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("historias: ", res);
    result(null, res);
  });
};




Historia.updateById = (idhistorias, historias, result) => {
  sql.query(
    "UPDATE historias SET titulo = ?, contenido = ?, fecha = ? WHERE idhistorias = ?",
    [historias.titulo, historias.contenido, historias.fecha, idhistorias ],
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

      console.log("updated historias: ", { idperfil: idhistorias, ...historias });
      result(null, { idperfil: idhistorias, ...historias });
    }
  );
};

Historia.remove = (id, result) => {
  sql.query("DELETE FROM historias WHERE idhistorias = ?", id, (err, res) => {
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

    console.log("deleted historia with id: ", id);
    result(null, res);
  });
};

Historia.removeAll = result => {
  sql.query("DELETE FROM historias", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} historias`);
    result(null, res);
  });
};

module.exports = Historia;
