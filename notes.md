# Qué es un objeto en JavaScript

Un objeto en JavaScript es una colección de propiedades, donde cada propiedad es una asociación entre un nombre (o clave) y un valor. Los valores pueden ser de cualquier tipo, incluyendo otros objetos y funciones.

## Estructura de un objeto

Un objeto se define utilizando llaves {} y puede tener múltiples propiedades. Ejemplo básico:

const persona = {
nombre: "Juan",
edad: 30,
profesion: "Desarrollador",
saludar: function() {
console.log("Hola, me llamo " + this.nombre);
}
};

## Componentes de un objeto

### Propiedades:

Son pares clave-valor.
La clave es una cadena (aunque no siempre necesita comillas) y el valor puede ser de cualquier tipo.

### Métodos:
Son funciones que están asociadas a un objeto.
En el ejemplo anterior, saludar es un método del objeto persona.

## Acceder a las propiedades y métodos

Puedes acceder a las propiedades y métodos de un objeto usando la notación de punto . o la notación de corchetes [].

// Acceder a propiedades
console.log(persona.nombre); // "Juan"
console.log(persona["edad"]); // 30

// Llamar a un método
persona.saludar(); // "Hola, me llamo Juan"

## Crear objetos

Existen varias formas de crear objetos en JavaScript:

1. Literal de objeto: La forma más común y sencilla.

const objeto = {};

2. Usando la palabra clave new Object():

const objeto = new Object();

3. Usando constructores personalizados:

Puedes definir una función constructora para crear múltiples objetos con la misma estructura.

javascript
function Persona(nombre, edad, profesion) {
this.nombre = nombre;
this.edad = edad;
this.profesion = profesion;
this.saludar = function() {
console.log("Hola, me llamo " + this.nombre);
};
}

const juan = new Persona("Juan", 30, "Desarrollador");
juan.saludar(); // "Hola, me llamo Juan"

## Cómo funciona una función constructora con datos de una base de datos

Imagina que tienes una base de datos con información sobre personas. Quieres usar una función constructora para crear objetos de tipo Persona con los datos obtenidos de la base de datos. Aquí te muestro cómo hacerlo:

1. Definir la función constructora(JS)

function Persona(nombre, edad, profesion) {
this.nombre = nombre;
this.edad = edad;
this.profesion = profesion;
this.saludar = function() {
console.log("Hola, me llamo " + this.nombre);
};
}

2. Obtener datos de la base de datos
   Supongamos que usas una base de datos y obtienes un resultado como este:

json
{
"nombre": "Juan",
"edad": 30,
"profesion": "Desarrollador"
}

3. Crear una instancia del objeto usando la función constructora
   Usas los datos obtenidos para crear una nueva instancia del objeto Persona:

javascript
const datosDeBD = {
nombre: "Juan",
edad: 30,
profesion: "Desarrollador"
};

const juan = new Persona(datosDeBD.nombre, datosDeBD.edad, datosDeBD.profesion);
juan.saludar(); // "Hola, me llamo Juan"

──────----------────────────────────────────┐
│ Base de Datos │
│ - Almacena la información de las personas │
└───────────────────────────────┬───────────┘
│
│
▼
┌───────────────────────────────────────────┐
│ JavaScript (Frontend/Backend) │
│ - Obtener datos de la base de datos │
│ - Usar función constructora │
└───────────────────────────────┬───────────┘
│
│
▼
┌───────────────────────────────────────────┐
│ Función Constructora (Persona) │
│ - Crea instancias de objetos Persona │
│ con los datos obtenidos │
└───────────────────────────────────────────┘
│
│
▼
┌───────────────────────────────────────────┐
│ Objeto Persona │
│ - Propiedades: nombre, edad, profesion │
│ - Método: saludar │
└──────────────────────────────────────────
