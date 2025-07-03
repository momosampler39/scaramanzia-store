# 🎸 Scaramanzia Store

**Scaramanzia Store** es una aplicación web de e-commerce enfocada en la venta de álbumes musicales digitales. 
Está desarrollada como proyecto final para el curso de JAVA y tiene como objetivo poner en práctica una arquitectura moderna full stack.

---

## 🧩 Tecnologías Utilizadas

| Capa         | Tecnología                         |
|--------------|-------------------------------------|
| Frontend     | [Next.js](https://nextjs.org/) + [Tailwind CSS](https://tailwindcss.com/) |
| Backend      | [Spring Boot](https://spring.io/projects/spring-boot) (Java) |
| Base de datos| [MySQL 8](https://www.mysql.com/)  |
| ORM          | JPA (Hibernate)                    |
| IDE          | IntelliJ IDEA                      |

---

## 🗂️ Estructura del Proyecto

### Backend (Spring Boot)

- `albums/`: lógica relacionada con los álbumes (CRUD, filtros, paginación).
- `pedidos/`: incluye todo lo relacionado a pedidos e ítems de pedidos.
- `dto/`: objetos que transportan información entre cliente y servidor.
- `config/`: configuraciones globales del backend (CORS, seguridad, manejo de errores).
- `ScaramanziaStoreApplication.java`: clase principal que inicia la aplicación.

### Frontend (Next.js)

- Páginas dinámicas para explorar álbumes, ver detalles y gestionar el carrito.
- Componentes reutilizables para el layout y funcionalidad.
- Comunicación con la API del backend vía fetch/Axios usando variables de entorno.

---

## 🚀 ¿Cómo levantar el proyecto localmente?

### 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/scaramanzia-store.git
cd scaramanzia-store
```

---

## ⚙️ Levantar el Frontend

```bash
cd frontend
npm install
```


### Ejecutar servidor de desarrollo

```bash
npm run dev
```

Esto iniciará la app en:

👉 [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Levantar el Backend

### Variables de entorno del backend

Crear un archivo `.env` en la raíz del backend con:

```env
DB_PASSWORD=tu_contraseña
```

### Configuración del `application.properties`

```properties
spring.datasource.password=${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

### Crear la base de datos

En tu cliente SQL:

```sql
CREATE DATABASE scaramanzia_db;
```

### Ejecutar el backend

Desde IntelliJ IDEA o con Maven:

```bash
./mvnw spring-boot:run
```

El backend estará disponible en:

👉 [http://localhost:8081](http://localhost:8081)

---

## 🧪 Funcionalidades del proyecto

- 🔎 Búsqueda y filtrado de álbumes por título, género y precio.
- 🛒 Carrito de compras con visualización dinámica.
- 🧾 Registro de pedidos y sus ítems asociados.
- 📦 Administración del estado de los pedidos.

---

## 🧑‍💻 Autor

Desarrollado por **Nicolas Falabella**  
Proyecto final – Curso Full Stack Java
