# Comienzo con --> REPO y --> DTO (si hace falta)

Aquí creo:

## repository.type.ts

Esta interfaz es un contrato que describe las operaciones básicas de un repositorio genérico.
El tipo genérico T permite que la interfaz sea reutilizable para diferentes tipos de datos (por ejemplo, User, Product, Category...)

- Creamos una interfaz ODM genérica que recibe el nombre de la colección como el conjunto de datos que se va a leer y escribir del conjunto total de datos

export interface Repository<T> {}

## categories.repository.ts

import type { Request, Response, NextFunction } from 'express';

// Clase que implementa la interfaz para la entidad Category
class CategoryRepo implements Repository<Category> {

y las funciones para:
async read(): Promise<Category[]> {}
async readById(id: string): Promise<Category> {}
async create(data: Omit<Category, 'id'>): Promise<Category> {}
async update(id: string, data: Partial<Omit<Category, 'id'>>, ): Promise<Category> {}
async delete(id: string): Promise<Category> {}

# --> CONTROLLER

El controlador CategoriesController se encarga de manejar las solicitudes relacionadas con las categorías (Category).
Esto asegura que CategoryRepo tiene los métodos necesarios para interactuar con la base de datos para la entidad Category.

// El constructor de CategoriesController recibe repoCategories para poder usar sus métodos en las operaciones CRUD relacionadas con las categorías:

## categories.controller.ts

export class CategoriesController {}
constructor(private repoCategories: Repository<Category>) {}

Esta vez mi categoría sólo tiene 2 campos en la tabla: id, name

# --> ROUTER

Es una pieza fundamental en una aplicación Express que define cómo se manejan las rutas HTTP. Este código crea un router para manejar las rutas relacionadas con las categorías (categories).

## está llamando a MIDDLEWARE:

auth.interceptor.ts

define la clase AuthInterceptor, que proporciona varios métodos para autenticar y autorizar a los usuarios.
AuthService: Servicio utilizado para verificar tokens de autenticación.

## categories.router.ts

Le digo qué rol tiene que tener para poder crear, actualizar o borrar una categoría. Dijimos que serían EDITOR
Le digo porqué rutas se van a poder realizar el create
createCategoriesRouter:
--> get
GET /categories: Cuando se recibe una solicitud GET en la ruta base (/), se llama al método getAll del CategoriesController para obtener todas las categorías.
--> post
POST /categories: Cuando se recibe una solicitud POST en la ruta base (/), se aplica una serie de middlewares:

a) authInterceptor.authenticate: Verifica que el usuario esté autenticado.

b) authInterceptor.hasRole(Role.EDITOR): Verifica que el usuario tenga el rol EDITOR.

c) categoriesController.create: Finalmente, si las validaciones anteriores pasan, se llama al método create del CategoriesController para crear una nueva categoría.

# --> APP
