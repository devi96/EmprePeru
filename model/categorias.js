const sql = require("./db.js");

// constructor
const Categoria = function(categoria) {
  this.nombre = categoria.nombre;
};


Categoria.create = (newCategoria, result) => {
  sql.query("INSERT INTO categorias SET ?", newCategoria, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created categorias: ", { id: res.insertId, ...newCategoria });
    result(null, { id: res.insertId, ...newCategoria });
  });
};

Categoria.findById = (categoriasId, result) => {
  sql.query(`SELECT * FROM categorias WHERE idcategorias = ${categoriasId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found categorias: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Categoria.getAll = result => {
  sql.query("SELECT * FROM categorias", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("categorias: ", res);
    result(null, res);
  });
};




Categoria.updateById = (idcategorias, categorias, result) => {
  sql.query(
    "UPDATE categorias SET nombre = ? WHERE idcategorias = ?",
    [categorias.nombre, idcategorias ],
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

      console.log("updated categorias: ", { idcategorias: idcategorias, ...categorias });
      result(null, { idcategorias: idcategorias, ...categorias });
    }
  );
};

Categoria.remove = (id, result) => {
  sql.query("DELETE FROM categorias WHERE idcategorias = ?", id, (err, res) => {
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

    console.log("deleted categorias with id: ", id);
    result(null, res);
  });
};

Categoria.removeAll = result => {
  sql.query("DELETE FROM categorias", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} categorias`);
    result(null, res);
  });
};

module.exports = Categoria;
