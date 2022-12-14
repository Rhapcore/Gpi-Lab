const express = require("express")
const app = express()
const cors = require("cors")
const sqlite3 = require("sqlite3").verbose();
const jwt = require("../src/services/jwt");
const { SECRET } = require('./consts');

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
	const { Rut, password } = req.body;
	const values = [Rut, password]
	db.all("SELECT * FROM credentials WHERE Rut = ? AND password = ?", values, (err, result) => {
		if (err) {
			res.status(500).send("Error en la peticion")
		} else {
			if (result.length > 0) {
				const user = result[0];
				res.status(200).send({
					"Rut": user.Rut,
					"Cargo": user.Cargo,
					"Nombre": `${user.FristName} ${user.LastName}`,
					token: jwt.createToken(result, SECRET),
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
	const {FristName, LastName, Rut, Cargo, password } = req.body;
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
	const { Id, FechaTerminoEntrega, Empresa, Producto, MasaTon, VolumenM3,Embarque } = req.body
	db.all(`UPDATE TablaCliente SET FechaTerminoEntrega = '${FechaTerminoEntrega}',Empresa = '${Empresa}', Producto = '${Producto}', MasaTon = '${MasaTon}', VolumenM3 = '${VolumenM3}', Embarque = '${Embarque}' WHERE Id = '${Id}'`,  (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "Cliente editado" })
		}
	})
})

app.get("/MostrarAcuerdoComercial", (req,res) => {
    db.all("SELECT * FROM AcuerdoComercial", (err, rows) => {
        if (err) {
            res.status(500).send(err)}
            else {
                res.status(200).send(rows)
            }
    })
})

app.post('/EditarAcuerdoComercial', (req, res) => {
	const { Id,NombreEmpresa, Producto, MesAño, TMProgramaPorAcuerdos, TMRecepcionada, TMDiferencia,Recepcionado,Tolerancia,MinimoTolerancia,MaximaTolerancia } = req.body
	db.all(`UPDATE AcuerdoComercial SET NombreEmpresa = '${NombreEmpresa}',Producto = '${Producto}', MesAño = '${MesAño}', TMProgramaPorAcuerdos = '${TMProgramaPorAcuerdos}', TMRecepcionada = '${TMRecepcionada}', TMDiferencia = '${TMDiferencia}', Recepcionado = '${Recepcionado}', Tolerancia = '${Tolerancia}', MinimoTolerancia = '${MinimoTolerancia}', MaximaTolerancia = '${MaximaTolerancia}' WHERE Id = '${Id}'`,  (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "Acuerdo Comercial editado" })
		}
	})
})

app.post('/GuardarHistorial', (req, res) => {
	const {id, Fecha, Nombre, Rut, CambioRealizado, Modulo } = req.body;
	db.all(`INSERT INTO HistorialLog (id, Fecha, Nombre,Rut ,CambioRealizado, Modulo) VALUES ('${id}', '${Fecha}', '${Nombre}','${Rut}', '${CambioRealizado}', '${Modulo}')`,(err, result) => {
	if (err) {
		res.status(500).send("Error al guardar el Historial");
	  	} else {
		res.status(200).send({ status: 'success', message: 'Historial creado'});
  		}
  	});
  });

app.get("/TablaHistorial", (req,res) => {
    db.all("SELECT * FROM HistorialLog", (err, rows) => {
        if (err) {
            res.status(500).send(err)}
            else {
                res.status(200).send(rows)
            }
    })
})

app.listen(3001 , () => console.log("Listening at port 3001"))

//  cmd gpi-lab/server/ npx nodemon server.js