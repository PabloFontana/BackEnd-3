
import supertest from "supertest";
import chai from "chai"; 
const expect = chai.expect; 

const requester = supertest("http://localhost:8080"); 


describe("Testing de la App Web Adoptame", () => {
    describe("Testing de Mascotas: ", () => {
        it("Endpoint POST /api/pets debe crear una mascota correctamente", async () => {
            const mascotaApiPerrito = {
                name: "Api", 
                specie: "Pichicho", 
                birthDate: "2021-03-10"
            }

            const {statusCode, ok, _body} = await requester.post("/api/pets").send(mascotaApiPerrito); 

            console.log(statusCode); 
            console.log(ok); 
            console.log(_body); 

            expect(_body.payload).to.have.property("_id"); 
        })

        it("Al crear una mascota solo con los datos elementales, la mascota creada debe tener la propiedad adopted con el valor false", async () => {

            const nuevaMascota = {
                name: "Rex", 
                specie: "Perro", 
                birthDate: "2021-01-01"
            }; 

            const {statusCode, body} = await requester.post("/api/pets").send(nuevaMascota); 

            expect(statusCode).to.equal(200); 
            expect(body.payload).to.have.property("adopted").that.equals(false); 
        })

        it("Al obtener a las mascotas con el método GET, la respuesta debe tener los campos status y payload. Además, payload debe ser de tipo arreglo", async () => {
            const {statusCode, body} = await requester.get("/api/pets"); 

            expect(statusCode).to.equal(200);
            expect(body).to.have.property("payload").that.is.an("array"); 
        })

        it("Si se desea crear una mascota sin el campo  nombre, el módulo debe responder codigo status 400.", async () => {
            const mascotaSinNombre = {
                specie: "Gato", 
                birthDate: "2020-05-15"
            }

            const {statusCode} = await requester.post("/api/pets").send(mascotaSinNombre); 

            expect(statusCode).to.equal(400);
        })

        it("El método DELETE debe poder borrar la última mascota agregada, ésto se puede alcanzar agregando a la mascota con un POST, tomando el id, borrando la mascota  con el DELETE, y luego corroborar si la mascota existe con un GET", async () => {
            const betun = {
                name: "Betun", 
                specie: "Perro",
                birthDate: "2023-02-20"
            }

            
            const {body: {payload: {_id}}} = await requester.post("/api/pets").send(betun); 

            

            const {statusCode} = await requester.delete(`/api/pets/${_id}`); 

            expect(statusCode).to.equal(200); 
             
        })
    })

    //TEST 2: Registro de Usuarios: 
    //     let cookie; 

    //     it("Debe registrar correctamente a un usuario", async () => {

    //         const mockUsuario = {
    //             first_name: "Pepe", 
    //             last_name: "Argento", 
    //             email: "pepe@zapateriagarmendia.com", 
    //             password: "1234"
    //         }

    //         const {_body} = await requester.post("/api/sessions/register").send(mockUsuario); 

    //         //Validamos que tengamos un payload: 
    //         expect(_body.payload).to.be.ok; 
    //     })

    //     it("Debe loguear correctamente al usuario y recuperar la cookie", async () => {
    //         //Enviamos los mismos datos que registramos en el paso anterior

    //         const mockUsuario = {
    //             email: "pepe@zapateriagarmendia.com", 
    //             password: "1234"
    //         }

    //         const resultado = await requester.post("/api/sessions/login").send(mockUsuario); 

    //         //Me guardo el header de la peticion: 

    //         const cookieResultado = resultado.headers["set-cookie"]["0"]; 

    //         //Verificamos que la cookie recuperada exista
    //         expect(cookieResultado).to.be.ok; 

    //         //Se separa el nombre y el valor de la cookie y se guardan en un objeto: 
    //         cookie = {
    //             name: cookieResultado.split("=")["0"],
    //             value: cookieResultado.split("=")["1"]
    //         }

    //         //Verificamos que el nombre de la cookie sea igual a "coderCookie"

    //         expect(cookie.name).to.be.ok.and.equal("coderCookie"); 
    //         expect(cookie.value).to.be.ok; 
    //     })

    //     //Probamos la ruta current: 
    //     it("Debe enviar la cookie que contiene el usuario", async () => {
    //         //Enviamos: 
    //         const {_body} = await requester.get("/api/sessions/current").set("Cookie", [`${cookie.name}=${cookie.value}`]);

    //         //Verificamos que nos retorne el email: 

    //         expect(_body.payload.email).to.be.equal("pepe@zapateriagarmendia.com");
    //     })
    // })

    //TESTING CON IMAGENES: 

    describe("Testeamos la carga de imagenes", () => {
        it("Tenemos que crear una mascota con una imagen", async () => {
            const mascotaMock = {
                name: "michi", 
                specie: "gatito", 
                birthDate: "2021-06-01"
            }

            
            const resultado = await requester.post("/api/pets/withimage")
                .field("name", mascotaMock.name)
                .field("specie", mascotaMock.specie)
                .field("birthDate", mascotaMock.birthDate)
                .attach("image", "./test/gatito.jpg");

            //Verificacion
            expect(resultado.status).to.be.equal(200); 
            expect(resultado._body.payload).to.have.property("_id"); 
            expect(resultado._body.payload.image).to.be.ok;
        })
    })
})