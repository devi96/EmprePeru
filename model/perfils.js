const sql = require("./db.js");

// constructor
const Perfil = function(perfil) {
  this.descripcion = perfil.nombre;
  this.imagen = perfil.apellidos;
};


Perfil.create = (newPerfil, result) => {
  sql.query("INSERT INTO perfil SET ?", newPerfil, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created perfiles: ", { id: res.insertId, ...newPerfil });
    result(null, { id: res.insertId, ...newPerfil });
  });
};

Perfil.findById = (perfilId, result) => {
  sql.query(`SELECT * FROM perfil WHERE idperfil = ${perfilId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Perfil.getAll = result => {
  sql.query("SELECT * FROM perfil", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("perfiles: ", res);
    result(null, res);
  });
};




Perfil.updateById = (idperfil, perfil, result) => {
  sql.query(
    "UPDATE perfil SET descripcion = ?, imagen = ? WHERE idperfil = ?",
    [perfil.descripcion, perfil.imagen, idperfil ],
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

      console.log("updated perfil: ", { idperfil: idperfil, ...perfil });
      result(null, { idperfil: idperfil, ...perfil });
    }
  );
};

Perfil.remove = (id, result) => {
  sql.query("DELETE FROM perfil WHERE idperfil = ?", id, (err, res) => {
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

    console.log("deleted perfil with id: ", id);
    result(null, res);
  });
};

Perfil.removeAll = result => {
  sql.query("DELETE FROM perfil", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} perfil`);
    result(null, res);
  });
};

module.exports = Perfil;
