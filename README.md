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
- [8. Fuentes](#8-fuentes)
- [9. Lighthouse - Reporte](#9-lighthouse---reporte)
- [10. Autores](#10-autores)

---

## 1. WOOW

### 1.1 Project Description

**Woow** 🧁 Woow is a bakery specialized in sugar art that started during the pandemic, and as it has focused on satisfying the needs of its customers with its excellent service and quality artisanal products, it has been well received by its public.
Due to its significant growth, it has become a bit complicated for Woow's staff to keep track of their orders, and that is why they are requesting a system that can facilitate the management of orders for the bakery staff, so they can perform better, so that the waiter can make and send the orders using a tablet and thus send them to the chef so that they are prepared in an orderly and efficient manner.
The administrator will have the possibility to create, edit and deregister (both waiter and chef) employees with accounts, will be able to add, edit and delete products in the inventory and, in addition, will have access to the orders placed to be able to keep track.

### 1.2 Role Description

| Role             | Function                                                                                                                                             |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 💁 Waiter        | In charge of taking notes of food and drink orders, and sending the order to the kitchen for preparation and then serving them at the table.         |
| 👩‍🍳 Chef          | Plans and directs the preparation of food taking into consideration the orders made by the waiter.                                                   |
| 👩‍💼 Administrator | He is in charge of managing the restaurant service, monitors the orders placed and the performance of his employees to ensure customer satisfaction. |

### 1.3 Interaction with the page

| Rol              | Correo           | Contraseña |
| ---------------- | ---------------- | ---------- |
| 💁 Mesero        | waiter@gmail.com | 123456     |
| 👩‍🍳 Chef          | chef@gmail.com   | 123456     |
| 👩‍💼 Administrador | admin@gmail.com  | 123456     |

## 2. User Cases

#### Waiter 💁

You will be able to view the products, add products to the cart, generate, view and send orders to the chef.

#### Chef 👩‍🍳

You will be able to view the orders generated by the waiters, and you will have the option to take the order you want to prepare. Each order will be controlled with a timer.

#### Administrator 👩‍💼

You will be able to manage the menu products, the accounts of the employee users, and keep track of the orders.

## 3. User Story and Minimum Project Acceptance Criteria

<div align=center><img src="https://user-images.githubusercontent.com/91838806/160693453-0415401d-02c9-4587-87b5-6d83eada6256.svg" ></div>

### Product definition

#### [User story 1] Waiter/waitress must be able to take customer orders

As a waiter/waitress, I want to take a customer's order so I don't have to rely on my poor memory,
to know how much to charge, and send it to the kitchen to avoid errors and so that they can be prepared in order.

##### Acceptance criteria

What needs to happen for the user's needs to be met)

✔️ Enter customer name.

✔️ Add products to order.

✔️ Delete products.

✔️ View summary and total purchase.

✔️ Send order to kitchen (save in a database).

✔️ Looks and works fine on a tablet

---

##### Definition of done

What has been agreed upon to happen to say the story is finished.

✔️ You must have received a code review from at least one colleague.

✔️ You do unit tests and have also manually tested your product.

✔️ You have performed usability tests and incorporated user feedback.

✔️ You have deployed your app and tagged your version (git tag).

---

#### [User Story 2] Head Chef needs to see orders

As a head chef, I want to see customer orders in order and
mark which ones are ready so I know what needs to be cooked and let waiters know
that an order is ready to serve a customer.

##### Acceptance Criteria

✔️ See the orders in order as they are made.

✔️ Mark the orders that have been prepared and are ready to be served.

✔️ See the time it took to prepare the order from when it arrived until it was marked as complete.

##### Definition of done

✔️ You must have received a code review from at least one colleague.

✔️ You do unit tests and have also tested your product manually.

✔️ You did usability tests and incorporated user feedback.

✔️ You deployed your application and tagged your version (git tag).

---

#### [User Story 3] Meserx must see orders ready to serve

As a meserx I want to see the orders that are ready to be delivered
quickly to the customers who placed them.

##### Acceptance criteria

✔️ See list of orders ready to serve.

✔️ Mark orders that have been delivered.

---

#### [User Story 4] Meserx must see orders ready to serve

As a meseerx, I want to see orders that are ready to be delivered quickly to the customers who placed them.

##### Acceptance criteria

✔️ View list of orders ready to serve.

✔️ Mark orders that have been delivered.

##### Definition of finished

✔️ You must have received a code review from at least one colleague.

✔️ You do unit tests and have also tested your product manually.

✔️ You did usability tests and incorporated user feedback.

✔️ You deployed your application and tagged your version (git tag).

✔️ Data must be kept intact, even after an order has finished. All this so that we can have statistics in the future.

---

#### [User Story 5] Store Administrator must manage his/her workers (Hacker Edition)

As a store administrator, I want to manage the users of the
platform to keep my workers' information up to date.

##### Acceptance criteria

✔️ View list of workers.

✔️ Add workers.

✔️ Delete workers.

✔️ Update worker data.

##### Definition of finished

✔️ You must have received a _code review_ from at least one colleague.

✔️ You do unit tests and, in addition, you have tested your product manually.

✔️ You did usability tests and incorporated user feedback.

✔️ You have deployed your app and tagged your version (git tag).

---

#### [User Story 6] Store Manager Must Manage Their Products (Hacker Edition)

As a store manager, I want to manage products
to keep the menu up to date.

##### Acceptance Criteria

✔️ View product list.

✔️ Add products.

✔️ Delete products.

✔️ Update product data.

##### Definition of done

✔️ You must have received a code review from at least one colleague.

✔️ You do unit tests and have also manually tested your product.

✔️ You did usability tests and incorporated user feedback.

✔️ You have deployed your app and tagged your version (git tag).

---

##### Definition of done

✔️ You must have received a code review from at least one colleague.

✔️ You do unit tests and have also manually tested your product.

✔️ You have done usability tests and incorporated user feedback.

✔️ You have deployed your app and tagged your version (git tag).

✔️ Data must be kept intact, even after an order has been
finished. All this so that you can have statistics in the future.

## 4. Hacker Edition

The purpose of this project is to carry out the Waiter and Chef module,
however, we are considering pushing ourselves further to complete an extra module so that the Administrator has the possibility of keeping track of the operations carried out by the staff.

## 5. Design Process

The process was carried out in six stages:

#### Analysis

Taking into account the requirements requested for the creation of the system, we defined the public to which it is directed, which is why we created the **Woow** 🧁 bakery, a Fancy-style bakery with excellent quality in products and services, but which presents a current problem: Keeping good control of orders.

#### Strategy design

This project was carried out in 6 Sprints. The strategy we applied was under the agile Scrum methodology, in which we established deadlines per Sprint with the use of Github Projects to ensure that the launch of the system coincides with what was planned, and as a platform for the deployment of our project we defined [Vercel](https://vercel.com/).

#### Web architecture

We created the design ourselves with Figma, inspired by other restaurant systems and applications. In terms of UI - UX design, we kept in mind a range of pastel tones and a minimalist style to generate a sweet and attractive feeling.

The prototype includes 3 modules, one for each role (waiter, chef and administrator).

Throughout the development of the digital product, constant usability tests, code cleaning and some improvements were carried out to guarantee a pleasant experience for the user who navigates through it. Among them we can highlight:

- Creation of a dynamic clock that indicates that the creation time of a product has exceeded a defined time (as a demonstration topic the clock will indicate that it exceeds the 20 second limit).
- More data was added to the orders such as the name of the waiter who sends it and the waiter who accepts the order.
- Extra view for those products that have some specifications
  (variety of sizes per portion or if you want to add a message as an observation, in case the client is allergic to some ingredient).
- Active links in the navigation bar in case the view is the one that matches the route.
- Display of the quantity of orders according to their status.
- Changes in the distribution of elements in case the view is on desktop, such as the buttons to add product or add employee.
- Another view was added to check the products in the cart in detail.
- Implementation of a button to remove all products added to the cart.

#### Content creation

Taking into account that the waiter handles an extensive menu, the content is based on being able to view the products in a card format in which all their information can be shown, including their respective photograph. In addition, the orders will be represented in card format with all the order information (name of the client, the waiter who generated the order, the chef who accepted the order, the duration and a table of products with their prices)

#### Design and programming execution

Once we have everything mentioned above, at the time of creating the design with code
we make sure that all the tools and technologies implemented have been applied the best possible practices, following a quality standard that serves as a reference to build an accessible and efficient website, which can become more robust.

#### Launch and testing

Before making this application available to users, the appropriate quality tests were carried out, as well as retesting the user experience and thus proving that all our functionalities work. In this way we solved some small errors that occurred.

## 6. Resources Used

### Deploy

- [Vercel](https://vercel.com/)

### Other resources

- [Figma](https://figma.com/)
- [Adobe Photoshop](https://www.adobe.com/la/products/photoshop.html/)
- [Adobe Illustrador](https://www.adobe.com/la/products/illustrator.html/)

#### Frameworks / libraries.

- [React JS](https://es.reactjs.org/)

#### Tools

- [npm-scripts](https://docs.npmjs.com/misc/scripts)
- [Babel](https://babeljs.io/)
- [Webpack](https://webpack.js.org/)

#### Code Rules

- Codebase and Commits in English.
- Use of Camel Case for functions (e.g. myFunction)
- CSS - BEM (Block-element-modifier) ​​\* [BEM](http://getbem.com/naming/).
- Name of variables with Pascal Case (e.g. myVariable)
- Components with Pascal Case MyComponent.

## 7. Result

[Woow System](http://getbem.com/naming/).

### Waiter View

#### Login

![giphy](https://user-images.githubusercontent.com/91838806/160939723-809caf75-a5a3-4313-82e7-6fa4d742c7fd.gif)

#### Product filter

![filtro-busqueda-productos](https://user-images.githubusercontent.com/91838806/160939920-62849b86-3a14-4c88-9992-f8024f243f9b.gif)

#### Add product to cart

![add-product-with-detail](https://user-images.githubusercontent.com/91838806/160940106-f186d868-164d-4796-aae9-e480991e833f.gif)

![add-product](https://user-images.githubusercontent.com/91838806/160940418-9edca190-ac72-4b3d-a653-c50283bb8629.gif)

#### Remove product

![delete-product](https://user-images.githubusercontent.com/91838806/160940328-116f8dcc-14fb-4bdc-b5a8-c14c12488857.gif)

#### Send order to chef

![send-order-to-chef](https://user-images.githubusercontent.com/91838806/160940539-b030f6e1-a0bf-4772-a151-c996f6d680ac.gif)

#### Order status

##### status "Pending"

![waiter-order-resume-order-state-pending](https://user-images.githubusercontent.com/91838806/160940963-551624c2-57b4-49f9-986c-ffb9ef035e5f.gif)

##### status "Cancel"

![waiter-order-resume-order-state-canceled](https://user-images.githubusercontent.com/91838806/160942335-f6d7691f-bfda-45fb-954c-323fc0405c19.gif)

##### status "Cooking"

![waiter-order-resume-order-state-cooking](https://user-images.githubusercontent.com/91838806/160942410-15d491b2-8563-4898-ba51-46a8401b2d73.gif)

##### status "Delivered"

![waiter-order-resume-order-state-delivered](https://user-images.githubusercontent.com/91838806/160942536-d8375e64-2ab0-4953-b71e-112faa63543b.gif)

---

### Chef View

#### Login

![chef-login](https://user-images.githubusercontent.com/91838806/160942663-3119ddd1-2e19-48a4-a280-85348fda47ba.gif)

#### Order status

##### status "Pending"

![chef-received-orders](https://user-images.githubusercontent.com/91838806/160942785-8085658f-97b8-469f-be02-4e29de6a7e48.gif)

### Waiter View

[![Woow - App for managing orders in a restaurant - Waiter role](https://res.cloudinary.com/marcomontalbano/image/upload/v1648874873/video_to_markdown/images/youtube--dam9josz84g-c05b58ac6eb4c4700831b2b3070cd403.jpg)](https://www.youtube.com/watch?v=dam9josz84g "Woow - App for managing orders in a restaurant - Waiter role")

### Chef View

[![Woow - Restaurant order management app - Chef role](https://res.cloudinary.com/marcomontalbano/image/upload/v1648875386/video_to_markdown/images/youtube--c9RHvgwpO7A-c05b58ac6eb4c4700831b2b3070cd403.jpg)](https://youtu.be/c9RHvgwpO7A "Woow - Restaurant order management app - Chef role")

### Admin View

[![Woow - App for managing orders in a restaurant - Administrator role](https://res.cloudinary.com/marcomontalbano/image/upload/v1648875727/video_to_markdown/images/youtube--cXvr9y1_NWc-c05b58ac6eb4c4700831b2b3070cd403.jpg)](https://youtu.be/cXvr9y1_NWc "App for managing orders in a restaurant - Administrator role")

## 8. Fonts

[Download Low and High Fidelity Prototypes in PDF](https://github.com/mirianalejandra1996/LIM016-burger-queen/files/8403271/Woow.1.pdf)

[View in slides](https://www.canva.com/design/DAE8w_YadWU/uUWhRE8RcBGOllDDWLqTSw/view?utm_content=DAE8w_YadWU&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

You can also click on the image to view the prototypes

<a target="_blank" href="https://www.canva.com/design/DAE8w_YadWU/uUWhRE8RcBGOllDDWLqTSw/view?utm_content=DAE8w_YadWU&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" rel="some text">![Woow](https://user-images.githubusercontent.com/91838806/161398019-121a84aa-eeb6-45f7-ad7f-c136176abbd4.jpg)</a>

## 9. Lighthouse - Reports

<div align=center><img width="100%" src="https://user-images.githubusercontent.com/91838806/161584645-109e0524-1e7b-4a6e-9898-de1ab0cd0812.jpeg" ></div>

## 10. Authors

[Mirian Alejandra Arévalo 🙋](https://github.com/mirianalejandra1996).

[Lucero Gonzáles Gandolfo 🙋](https://github.com/lucerogoga).
