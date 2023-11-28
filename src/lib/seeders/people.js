import bcrypt from "bcrypt";

const people = [
    {
        name: "Haziel",
        email: "hazielortiz04@gmail.com",
        password: bcrypt.hashSync('12345678',10),
    },
    {
        name: "Irving",
        email: "irving@gmail.com",
        password: bcrypt.hashSync('12345678',10),
    },
    {
        name: "Alex",
        email: "amuriii@gmail.com",
        password: bcrypt.hashSync('12345678',10),
    },
    {
        name: "Romero",
        email: "romero@gmail.com",
        password: bcrypt.hashSync('12345678',10),
    },
    {
        name: "Carballo",
        email: "carba@gmail.com",
        password: bcrypt.hashSync('12345678',10),
    },
    {
        name: "Raul",
        email: "raulo@gmail.com",
        password: bcrypt.hashSync('12345678',10),
    },
    {
        name: "Ulises",
        email: "ulises@gmail.com",
        password: bcrypt.hashSync('12345678',10),
    },
    {
        name: "Uriel",
        email: "ueriel@gmail.com",
        password: bcrypt.hashSync('12345678',10),
    },
    {
        name: "Edgar",
        email: "ergarin@gmail.com",
        password: bcrypt.hashSync('12345678',10),
    },
    {
        name: "Jesus",
        email: "tonito@gmail.com",
        password: bcrypt.hashSync('12345678',10),
    },
]

export default people;