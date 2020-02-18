const sql = require("./db.js");

// constructor
const Historia = function(historia) {
      this.idusuarios= historia.idusuarios,
      this.idcategorias= historia.idcategorias,
      this.titulo= historia.titulo,
      this.contenido= historia.contenido,
      this.image= historia.image
};


Historia.create = async (newHistoria, result) => {
  console.log("esta la historia a ser creada",newHistoria);
  console.log("idusuarios",newHistoria.idusuarios);
  console.log("idcategorias",newHistoria.idcategorias);
  console.log("titulo",newHistoria.titulo);
  console.log("image",newHistoria.image);

  await sql.query("INSERT INTO historias(idusuarios, idcategorias, titulo, contenido, image) values($1,$2,$3,$4,$5)", [newHistoria.idusuarios,newHistoria.idcategorias,newHistoria.titulo, newHistoria.contenido,newHistoria.image], (err, res) => {
    console.log("aqui empieza el error");
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created historias: ", { id: res.idhistorias, ...newHistoria });
    result(null, { id: res.idhistorias, ...newHistoria });
  });
};

Historia.findById = (historiaId, result) => {
  sql.query("SELECT * FROM historias WHERE idhistorias = $1",[historiaId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.rows.length) {
      console.log("found historia: ", res);
      result(null, res.rows);
      return;
    }

    console.log("esto se encontro",res);
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


Historia.getCategory = async (idcategoria, result) => {
  await sql.query("SELECT * FROM historias where idcategorias = $1",[idcategoria], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("historias: ", res);
    console.log("imprimir solo rows",res.rows);
    result(null,res.rows);
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
