const sql = require("./db.js");

// constructor
const Usuario = function(usuario) {
  this.idusuarios = usuario.idusuarios;
  this.nombre = usuario.nombre;
  this.apellidos = usuario.apellidos;
  this.password = usuario.password;
  this.tipo = usuario.tipo;
  this.email = usuario.email;
};


Usuario.create = (newUser, result) => {
  console.log("Este es el nuevo usuario a ser creado",newUser);
  sql.query("INSERT INTO usuarios(idusuarios,nombre,apellidos,password,tipo,email) values($1,$2,$3,$4,$5,$6) ", [newUser.idusuarios,newUser.nombre,newUser.apellidos,newUser.password,newUser.tipo,newUser.email], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created usuarios: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

Usuario.find_Email_password = (email, password, result) => {
  sql.query("SELECT * FROM usuarios WHERE email = $1 and password = $2 ", [email,password], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found usuario: ", res[0]);
      result(null, res[0]);
      return;
    }
    console.log("El valor de usuario encontrado es:", res)
    // not found Customer with the id
    result({ kind: "not_found" }, null);

  });
};

Usuario.findById = (userId, result) => {
  sql.query(`SELECT * FROM usuarios WHERE idusuarios = ${userId}`, (err, res) => {
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

Usuario.getAll = result => {
  sql.query("SELECT * FROM usuarios", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    
    JSON.stringify(res);

    console.log("usuarios: ", res.rows);

    result(null, res.rows);
  });
};




Usuario.updateById = (idusuarios, usuario, result) => {
  sql.query(
    "UPDATE usuarios SET email = ?, password = ?, apellidos = ?, nombre = ? WHERE idusuarios = ?",
    [usuario.email, usuario.password, usuario.apellidos, usuario.nombre, idusuarios ],
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

      console.log("updated usuario: ", { idusuarios: idusuarios, ...usuario });
      result(null, { idusuarios: idusuarios, ...usuario });
    }
  );
};

Usuario.remove = (id, result) => {
  sql.query("DELETE FROM usuarios WHERE idusuarios = ?", id, (err, res) => {
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

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

Usuario.removeAll = result => {
  sql.query("DELETE FROM usuarios", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} usuarios`);
    result(null, res);
  });
};

module.exports = Usuario;
