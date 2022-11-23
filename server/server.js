const express = require("express")
const app = express()
const cors = require("cors")
const sqlite3 = require("sqlite3").verbose();
const jwt = require("../src/services/jwt");

app.use(cors())

app.use((req, res, next) => {
    res.setHeader("Acces-Control-Allow-Origin","*");
    next();
});

app.use(express.json({limit:"10mb"}))

let db = new sqlite3.Database("credentials.db", (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log("Conectado a la Base De Datos.");
})

app.get("/", (req,res) => {
    res.send("Inicio")
})

app.post('/Login', (req, res) => {
	const { Rut, password } = req.body
	const values = [Rut, password]
	db.all("SELECT * FROM credentials WHERE Rut = ? AND password = ?", values, (err, result) => {
		if (err) {
			res.status(500).send("Error en la peticion")
		} else {
			if (result.length > 0) {
				res.status(200).send({
					"id": result[0].id,
					"user": result[0].user,
					"Rut": result[0].Rut,
					token: jwt.createToken(result)
				})
			} else {
				res.status(400).send('El usuario no ha podido loguearse')
			}
		}
	})
})

app.get("/", (req,res) => {
    res.send("Inicio")
})

app.get("/TablaUsuarios", (req,res) => {
    db.all("SELECT * FROM credentials", (err, rows) => {
        if (err) {
            res.status(500).send(err)}
            else {
                res.status(200).send(rows)
            }
    })
})

app.post("/Eliminar", (req,res) => {
    const { Id } = req.body
    db.all("Delete FROM  credentials WHERE Id = ?", Id , (err, result) => {
        if (err) {
            res.status(500).send(err)}
            else {
                res.status(200).send({"satus":"success" , "mesage": "Usuario Eliminar"})
            }
    }) 
})

app.post('/Guardar', (req, res) => {
	const {FristName, LastName, Rut, Cargo, username, password } = req.body;
	db.all(`INSERT INTO credentials (FristName, LastName, Rut, Cargo, password) VALUES ('${FristName}', '${LastName}', '${Rut}', '${Cargo}', '${password}')`,(err, result) => {
	  if (err) {
		res.status(500).send("Error al guardar el usuario");
	  } else {
		res.status(200).send({ status: 'success', message: 'Usuario creado' });
      }
    });
  });

app.post('/Editar', (req, res) => {
	const { Id, FristName, LastName, Rut, Cargo, password } = req.body
	db.all(`UPDATE credentials SET FristName = '${FristName}',LastName = '${LastName}', Rut = '${Rut}', Cargo = '${Cargo}', password = '${password}' WHERE Id = '${Id}'`,  (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "Usuario editado" })
		}
	})
})


app.get("/TransferView", (req,res) => {
    db.all("SELECT * FROM TransferView", (err, rows) => {
        if (err) {
            res.status(500).send(err)}
            else {
                res.status(200).send(rows)
            }
    })
})

app.post('/TransferViewEditar', (req, res) => {
	const { Id, Mac, Ip, Dns, Puerto} = req.body
	db.all(`UPDATE TransferView SET Mac = '${Mac}',Ip = '${Ip}', Dns = '${Dns}', Puerto = '${Puerto}' WHERE Id = '${Id}'`,  (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "Servidor Actualizado" })
		}
	})
})


app.get("/MostrarCliente", (req,res) => {
    db.all("SELECT * FROM TablaCliente", (err, rows) => {
        if (err) {
            res.status(500).send(err)}
            else {
                res.status(200).send(rows)
            }
    })
})

app.post('/EditarCliente', (req, res) => {
	const { Id, FechaDeTermino, Empresa, Producto, Masa, VolumenTon,Embarque } = req.body
	db.all(`UPDATE TablaCliente SET FechaDeTermino = '${FechaDeTermino}',Empresa = '${Empresa}', Producto = '${Producto}', Masa = '${Masa}', VolumenTon = '${VolumenTon}', Embarque = '${Embarque}' WHERE Id = '${Id}'`,  (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "Cliente editado" })
		}
	})
})


app.listen(3001 , () => console.log("Listening at port 3001"))

//  cmd gpi-lab/server/ npx nodemon server.js