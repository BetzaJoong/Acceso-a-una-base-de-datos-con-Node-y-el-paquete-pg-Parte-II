Primero se crea nuestra
___Base de datos___
CREATE DATABASE likeme;
CREATE TABLE posts (id SERIAL, titulo VARCHAR(25), img VARCHAR(1000),
descripcion VARCHAR(255), likes INT);

*Instala las dependencias:
npm install

*Inicia el servidor de desarrollo:
npm run dev

Ambos codigos se cargaran juntos puesto que estoy usando concurrently:
El puerto http://localhost:3001 es el backend.
Y el puerto es el frontend: http://localhost:5173/


## External libraries

- [react-toastify](https://www.npmjs.com/package/react-toastify)

## Version History

```json
"dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-toastify": "^9.1.1"
},
"devDependencies": {
    "@types/react": "^18.0.27",
    "@types/react-dom": "^18.0.10",
    "@vitejs/plugin-react": "^3.1.0",
    "vite": "^4.1.0"
}
```
