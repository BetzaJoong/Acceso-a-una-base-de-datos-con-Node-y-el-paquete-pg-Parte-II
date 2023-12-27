// // server/posts.js
// const express = require('express');
// const router = express.Router();
// const pool = require('./database');
// const { handleErrors } = require('./errors');

// //__Ruta para obtener todos los posts__
// router.get('/', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM posts');
//     res.json(result.rows);
//   } catch (error) {
//     const errorResponse = handleErrors(error.code);
//     res.status(errorResponse.status).json({ error: errorResponse.message });
//   }
// });

// //__Ruta para obtener un post por ID__
// router.get('/:id', async (req, res) => {
//   const { id } = req.params;

//   if (isNaN(id)) {
//     return res.status(400).json({ error: 'El parámetro id debe ser un número válido' });
//   }

//   try {
//     const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Post no encontrado' });
//     }

//     res.json(result.rows[0]);
//   } catch (error) {
//     const errorResponse = handleErrors(error.code);
//     res.status(errorResponse.status).json({ error: errorResponse.message });
//   }
// });

// //__Ruta para agregar un nuevo post__
// router.post('/', async (req, res) => {
//   const { titulo, img, descripcion } = req.body;

//   if (!titulo || !img || !descripcion) {
//     return res.status(400).json({ error: 'Se requieren todos los campos (titulo, img, descripcion)' });
//   }

//   try {
//     const result = await pool.query('INSERT INTO posts (titulo, img, descripcion) VALUES ($1, $2, $3) RETURNING *', [titulo, img, descripcion]);
//     res.json(result.rows[0]);
//   } catch (error) {
//     const errorResponse = handleErrors(error.code);
//     res.status(errorResponse.status).json({ error: errorResponse.message });
//   }
// });

// //__Ruta para actualizar un post por ID__
// router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { titulo, img, descripcion } = req.body;

//   if (isNaN(id) || !titulo || !img || !descripcion) {
//     return res.status(400).json({ error: 'Se requieren todos los campos (id, titulo, img, descripcion)' });
//   }

//   try {
//     const result = await pool.query('UPDATE posts SET titulo=$1, img=$2, descripcion=$3 WHERE id=$4 RETURNING *', [titulo, img, descripcion, id]);
//     res.json(result.rows[0]);
//   } catch (error) {
//     const errorResponse = handleErrors(error.code);
//     res.status(errorResponse.status).json({ error: errorResponse.message });
//   }
// });

// //__Ruta para incrementar likes por ID__
// router.put('/like/:id', async (req, res) => {
//   const { id } = req.params;

//   if (isNaN(id)) {
//     return res.status(400).json({ error: 'El parámetro id debe ser un número válido' });
//   }

//   try {
//     const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Post no encontrado' });
//     }

//     const post = result.rows[0];
//     const updatedLikes = post.likes + 1;

//     const updateResult = await pool.query('UPDATE posts SET likes=$1 WHERE id=$2 RETURNING *', [updatedLikes, id]);
//     res.json(updateResult.rows[0]);
//   } catch (error) {
//     const errorResponse = handleErrors(error.code);
//     res.status(errorResponse.status).json({ error: errorResponse.message });
//   }
// });

// //__Ruta para eliminar un post por ID__
// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;

//   if (isNaN(id)) {
//     return res.status(400).json({ error: 'El parámetro id debe ser un número válido' });
//   }

//   try {
//     await pool.query('DELETE FROM posts WHERE id=$1', [id]);
//     res.json({ message: 'Post eliminado correctamente' });
//   } catch (error) {
//     const errorResponse = handleErrors(error.code);
//     res.status(errorResponse.status).json({ error: errorResponse.message });
//   }
// });

// module.exports = router;

// server/posts.js
const express = require('express');
const router = express.Router();
const pool = require('./database');
const { handleErrors } = require('./errors');

// Ruta para obtener todos los posts
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts');
    res.json(result.rows);
  } catch (error) {
    const errorResponse = handleErrors(error.code);
    res.status(errorResponse.status).json({ error: errorResponse.message });
  }
});

// Ruta para obtener un post por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: 'El parámetro id debe ser un número válido' });
  }

  try {
    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    const errorResponse = handleErrors(error.code);
    res.status(errorResponse.status).json({ error: errorResponse.message });
  }
});

// Ruta para agregar un nuevo post
router.post('/', async (req, res) => {
  const { titulo, img, descripcion, likes = 0 } = req.body;

  if (!titulo || !img || !descripcion) {
    return res.status(400).json({ error: 'Se requieren todos los campos (titulo, img, descripcion)' });
  }

  try {
    const result = await pool.query('INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *', [titulo, img, descripcion, likes]);
    res.json(result.rows[0]);
  } catch (error) {
    const errorResponse = handleErrors(error.code);
    res.status(errorResponse.status).json({ error: errorResponse.message });
  }
});

// Ruta para actualizar un post por ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, img, descripcion } = req.body;

  if (isNaN(id) || !titulo || !img || !descripcion) {
    return res.status(400).json({ error: 'Se requieren todos los campos (id, titulo, img, descripcion)' });
  }

  try {
    const result = await pool.query('UPDATE posts SET titulo=$1, img=$2, descripcion=$3 WHERE id=$4 RETURNING *', [titulo, img, descripcion, id]);
    res.json(result.rows[0]);
  } catch (error) {
    const errorResponse = handleErrors(error.code);
    res.status(errorResponse.status).json({ error: errorResponse.message });
  }
});

// Ruta para incrementar likes por ID
router.put('/like/:id', async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: 'El parámetro id debe ser un número válido' });
  }

  try {
    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    const post = result.rows[0];
    const updatedLikes = post.likes + 1;

    const updateResult = await pool.query('UPDATE posts SET likes=$1 WHERE id=$2 RETURNING *', [updatedLikes, id]);
    res.json(updateResult.rows[0]);
  } catch (error) {
    const errorResponse = handleErrors(error.code);
    res.status(errorResponse.status).json({ error: errorResponse.message });
  }
});

// Ruta para eliminar un post por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: 'El parámetro id debe ser un número válido' });
  }

  try {
    await pool.query('DELETE FROM posts WHERE id=$1', [id]);
    res.json({ message: 'Post eliminado correctamente' });
  } catch (error) {
    const errorResponse = handleErrors(error.code);
    res.status(errorResponse.status).json({ error: errorResponse.message });
  }
});

module.exports = router;
