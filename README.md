# Woow 🧁

<div align=center><img width="400px" src="https://user-images.githubusercontent.com/91838806/160679159-e098da1b-b47b-434e-8ad4-0b9f22ad9512.svg" ></div>


## Índice

- [1. Woow](#1-woow)
- [2. Estudio del Usuario](#2-estudio-del-usuario)
- [3. Historia de Usuarios y Criterios de aceptación mínimos del proyecto](#3-historia-de-usuarios-y-criterios-de-aceptación-mínimos-del-proyecto)
- [4. Hacker Edition](#4-hacker-edition)
- [5. Desing Process](#5-desing-process)
- [6. Recursos Utilizados](#6-recursos-utilizados)
- [7. Resultado Final](#7-pistas-tips-y-lecturas-complementarias)
- [8. Fuente](#8-fuente)
- [9. Autores](#9-autores)

---

## 1. WOOW

### 1.1 Descripcion del Proyecto

**Woow** 🧁 es una pastelería especializada en el arte en azúcar que se inició durante la pandemia, y como se ha enfocado en satisfacer las necesidades de sus clientes con su excelente atención y productos artesanales de calidad ha sido bien recibida por su público.

Dado a su significativo crecimiento, se le ha complicado un poco al personal de Woow el llevar el control de sus pedidos, y es por esto que están solicitando un sistema que pueda facilitar la gestión de comandas para el personal de la pastelería, asi podrán desempeñarse mejor, de manera que el mesero pueda realizar y enviar los pedidos usando una tablet y así enviarle al chef para que se preparen ordenada y eficientemente.

Por parte del administrador tendrá la posibilidad de crear, editar y dar de baja (tanto de mesero como chef) a los empleados con cuentas, podrá agregar, editar y eliminar productos en el inventario y, además, tendrá acceso a las ordenes realizadas para poder llevar un seguimiento.

### 1.2 Descripcion de Roles


| Rol | Función  |  
|---|---|
| 💁 Mesero  | Se encarga de tomar nota de los pedidos de alimentos y bebidas, y enviar la comanda en la cocina para su preparación para luego servirlos en la mesa.  |
| 👩‍🍳 Chef        |  Planifica y dirige la preparación de alimentos tomando en consideración las ordenes realizadas por el mesero. |  
| 👩‍💼 Administrador |  Está a cargo de administrar el servicio del restaurante, realiza el seguimiento de los pedidos efectuados y del rendimiento de sus empleados para asegurar la satisfacción del cliente. | 

### 1.3 Interaccion con la página

| Rol | Correo  |  Contraseña |
|---|---|---|
| 💁 Mesero   | waiter@gmail.com  | 123456
| 👩‍🍳 Chef             |  chef@gmail.com | 123456  
| 👩‍💼 Administrador  |  admin@gmail.com | 123456 


## 2. Estudio del Usuario

#### Mesero 💁 

Podrá visualizar los productos, añadir productos al carrito, generar, visualizar y enviar órdenes al chef.


#### Chef 👩‍🍳 

Podrá visualizar los pedidos generados por los meseros, y tendrá la opción de tomar la orden que desea preparar. Cada orden se controlará con un temporizador.

#### Administrador 👩‍💼

Podrá gestionar los productos del menú, las cuentas de los usuarios empleados, y llevar seguimiento de las órdenes.



## 3. Historia de Usuarios y Criterios de aceptación mínimos del proyecto

<div align=center><img src="https://user-images.githubusercontent.com/91838806/160693453-0415401d-02c9-4587-87b5-6d83eada6256.svg" ></div>

### Definición del producto

#### [Historia de usuario 1] Mesero/a debe poder tomar pedido de cliente

Yo como meserx quiero tomar el pedido de un cliente para no depender de mi mala
memoria, para saber cuánto cobrar, y enviarlo a la cocina para evitar errores y
que se puedan ir preparando en orden.

##### Criterios de aceptación

Lo que debe ocurrir para que se satisfagan las necesidades del usuario)

✔️ Anotar nombre de cliente.

✔️ Agregar productos al pedido.

✔️ Eliminar productos.

✔️ Ver resumen y el total de la compra.

✔️ Enviar pedido a cocina (guardar en alguna base de datos).

✔️ Se ve y funciona bien en una _tablet_

---

##### Definición de terminado

Lo acordado que debe ocurrir para decir que la historia está terminada.

✔️ Debes haber recibido _code review_ de al menos una compañera.

✔️ Haces _test_ unitarios y, además, has testeado tu producto manualmente.

✔️ Hiciste _tests_ de usabilidad e incorporaste el _feedback_ del usuario.

✔️ Desplegaste tu aplicación y has etiquetado tu versión (git tag).



#### [Historia de usuario 2] Jefe de cocina debe ver los pedidos

Yo como jefx de cocina quiero ver los pedidos de los clientes en orden y
marcar cuáles están listos para saber qué se debe cocinar y avisar a lxs meserxs
que un pedido está listo para servirlo a un cliente.

##### Criterios de aceptación

✔️ Ver los pedidos ordenados según se van haciendo.

✔️ Marcar los pedidos que se han preparado y están listos para servirse.

✔️ Ver el tiempo que tomó prepara el pedido desde que llegó hasta que se marcó como completado.

##### Definición de terminado

✔️ Debes haber recibido _code review_ de al menos una compañera.

✔️ Haces _test_ unitarios y, además, has testeado tu producto manualmente.

✔️ Hiciste _tests_ de usabilidad e incorporaste el _feedback_ del usuario.

✔️ Desplegaste tu aplicación y has etiquetado tu versión (git tag).


---

#### [Historia de usuario 3] Meserx debe ver pedidos listos para servir

Yo como meserx quiero ver los pedidos que están preparados para entregarlos
rápidamente a los clientes que las hicieron.

##### Criterios de aceptación

✔️ Ver listado de pedido listos para servir.

✔️ Marcar pedidos que han sido entregados.

---

***

#### [Historia de usuario 4] Meserx debe ver pedidos listos para servir

Yo como meserx quiero ver los pedidos que están preparados para entregarlos
rápidamente a lxs clientxs que las hicieron.

##### Criterios de aceptación

✔️ Ver listado de pedido listos para servir.

✔️ Marcar pedidos que han sido entregados.

##### Definición de terminado

✔️ Debes haber recibido _code review_ de al menos una compañera.

✔️ Haces _test_ unitarios y, además, has testeado tu producto manualmente.

✔️ Hiciste _tests_ de usabilidad e incorporaste el _feedback_ del usuario.

✔️ Desplegaste tu aplicación y has etiquetado tu versión (git tag).

✔️ Los datos se deben mantener íntegros, incluso después de que un pedido ha terminado. Todo esto para poder tener estadísticas en el futuro.

***

#### [Historia de usuario 5] Administrador(a) de tienda debe administrar a sus trabajadorxs (Hacker Edition)

Yo como administrador(a) de tienda quiero gestionar a los usuarios de
la plataforma para mantener actualizado la informacion de mis trabajadorxs.

##### Criterios de aceptación

✔️ Ver listado de trabajadorxs.

✔️ Agregar trabajadorxs.

✔️ Eliminar trabajadoxs.

✔️ Actualizar datos de trabajadorxs.

##### Definición de terminado

✔️ Debes haber recibido _code review_ de al menos una compañera.

✔️ Haces _test_ unitarios y, además, has testeado tu producto manualmente.

✔️ Hiciste _tests_ de usabilidad e incorporaste el _feedback_ del usuario.

✔️ Desplegaste tu aplicación y has etiquetado tu versión (git tag).

***

#### [Historia de usuario 6] Administrador(a) de tienda debe administrar a sus productos (Hacker Edition)

Yo como administrador(a) de tienda quiero gestionar los productos
para mantener actualizado el menú.

##### Criterios de aceptación

✔️ Ver listado de productos.

✔️ Agregar productos.

✔️ Eliminar productos.

✔️ Actualizar datos de productos.

##### Definición de terminado

✔️ Debes haber recibido _code review_ de al menos una compañera.

✔️ Haces _test_ unitarios y, además, has testeado tu producto manualmente.

✔️ Hiciste _tests_ de usabilidad e incorporaste el _feedback_ del usuario.

✔️ Desplegaste tu aplicación y has etiquetado tu versión (git tag).

***

##### Definición de terminado

✔️ Debes haber recibido _code review_ de al menos una compañera.

✔️ Haces _test_ unitarios y, además, has testeado tu producto manualmente.

✔️ Hiciste _tests_ de usabilidad e incorporaste el _feedback_ del usuario.

✔️ Desplegaste tu aplicación y has etiquetado tu versión (git tag).

✔️ Los datos se deben mantener íntegros, incluso después de que un pedido ha
  terminado. Todo esto para poder tener estadísticas en el futuro.

## 4. Hacker Edition

La finalidad de este proyecto es llevar a cabo el módulo de Mesero y Chef,
sin embargo, nos planteamos exigirnos más para completar un módulo extra para que el Administrador tenga la posibilidad de llevar un control de las operaciones realizadas por el personal. 

## 5. Proceso de Diseño

El proceso se realizó mediante seis etapas:

#### Análisis

Tomando en cuenta los requerimientos solicitados para la creación del sistema, definimos el público al que va dirigido, es por esto que creamos la pastelería **Woow**  🧁 , una pastelería al estilo Fancy con una excelente calidad en productos y servicios, pero que presenta una problemática actual: Llevar un buen control de pedidos.

#### Diseño de la estrategia

Este projecto se llevó a cabo en 6 Sprints. La estrategia que aplicamos fue bajo la metodología agil de Scrum, en el que secon el uso del Github Projects establecimos plazos por Sprints para asegurarnos que el lanzamiento del sistema coincida con lo planificado, y como plataforma para despliegue de nuestro proyecto definimos [Vercel](https://vercel.com/). 

#### Arquitectura web

El diseño lo creamos nosotras con Figma inspirándonos en otros sistemas y aplicaciones de restaurantes. En el tema del diseño UI - UX mantuvimos presente una gama de tonos pasteles y un estilo minimalista para generar una sensación dulce y atractiva.

El prototipo contempla 3 módulos, uno para cada rol (mesero, chef y administrador). 

A lo largo del desarrollo del producto digital, se hicieron constantes pruebas de usabilidad, limpieza del código y algunas mejoras para garantizar una agradable experiencia al usuario que navega en ella. Entre ellas podemos destacar.

- Creación de reloj dinámico que indique que el tiempo de creación de un producto ha excedido el tiempo aceptable
- b
- c
- d

#### Creación del contenido

Tomando en cuenta que el mesero maneja un menú exteso, el contenido se basa en que se pueda visualizar los productos en un formato de tarjeta en el que pueda mostrar toda su información incluyendo su respectiva fotografía, además, las ordenes se representarán en formato de tarjeta con toda la información del pedido (nombre del cliente, del mesero que generó la orden, del chef que aceptó la orden, la duración y una tabla de productos con sus precios)

A continuación, el flujo y las vistas por módulo del sistema se presentará a través del siguiente [documento PDF](https://vercel.com/). 


5. EJECUCIÓN DEL DISEÑO Y LA PROGRAMACIÓN
Una vez que está todo claro, es el momento de diseñar y programar. Muchas veces el diseño se hará pensando en un estándar, pero otras habrá que realizar pruebas, estudiar diferentes modelos de web y realizar un test A/B para ver cuál recibe mejores resultados y cumple mejor con tus objetivos.

En la fase de diseño y programación, tanto si usamos un CMS, como si desarrollamos la web desde cero, debemos asegurarnos de que todo se ajusta a unos parámetros, que seguimos un estándar de calidad y que la web cumple realmente lo que promete.

6. LANZAMIENTO Y PRUEBAS
Cuando desarrollamos un sitio web desde cero, no podemos simplemente ponerlo a disposición de los usuarios sin haber realizado antes los convenientes tests de calidad. Es conveniente probar que todo funciona, analizar el archivo logs para ver qué errores se producen en la web, así como ver la respuesta de la web ante un alto número de solicitudes y operaciones.

De esta forma, podemos resolver algunos de los errores más comunes que puedan surgir antes de poner la web a disposición de los usuarios y empezar a difundirla.

Esperamos que este artículo te haya ayudado a aclarar las fases del diseño de un sitio web. Si quieres crear una página web para tu negocio, contacta con nosotros aquí.

Si necesitas contenido para tu web, echa un vistazo a nuestros servicios de posicionamiento.
## 6. Recursos Utilizados

### Despliegue

- [Vercel](https://vercel.com/)

### Otros recursos

    
#### Frameworks / libraries

- [React JS](https://es.reactjs.org/)

#### Herramientas

- [npm-scripts](https://docs.npmjs.com/misc/scripts)
- [Babel](https://babeljs.io/)
- [Webpack](https://webpack.js.org/)

#### Reglas para un buen código

Al inicio del proyecto, hemos establecido algunas reglas para trabajar colaborativamente y lograr mantener un flujo de trabajo. Estas reglas son las siguientes: 

- Codebase y Commits en inglés.
- Uso de Camel Case para funciones (ej. miFunción)
- CSS - BEM(Bloque-elemento-modificador)  \*  [BEM](http://getbem.com/naming/).
- Nombre de las variables Pascal Case (ej. miVariable)
- Componentes con Pascal Case MyComponent.

## 7. Resultado Final

## 8. Fuente

## 9. Autores

[Mirian Alejandra Arévalo 🙋](https://github.com/mirianalejandra1996).
[Lucero Gonzáles 🙋](https://github.com/mirianalejandra1996).
