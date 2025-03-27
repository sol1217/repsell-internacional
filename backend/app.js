require("dotenv").config();
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const app = express();

const PORT = process.env.PORT || 3001;
const DB_FILE = process.env.DB_FILE || "./repsell.db";
const UPLOAD_DIR = process.env.UPLOAD_DIR || "uploads/";

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 1000, // Limit each IP to 100 requests per window
});

// Middlewares
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json()); // for parsing application/json
app.use(limiter);

// Multer
const multer = require("multer");
const upload = multer({ dest: UPLOAD_DIR });

// DB Connection
const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) console.error("Error connecting to database:", err.message);
  else console.log("Connected to database:", DB_FILE);
});

/**
 * Validation schemas
 */
const SCHEMAS = {
  PRODUCT: [
    "name",
    "description",
    "height",
    "color",
    "category",
    "image",
    "background",
  ],
  BLOG: [
    "title",
    "description",
    "additionalText",
    "subtitle",
    "paragraph",
    "list",
    "phrase",
    "additionalTitle",
    "image",
    "category",
  ],
  ADMIN: ["user", "password"],
  BACKGROUND: ["category", "color"],
};

/**
 * Allowed database tables
 */
const ALLOWED_TABLES = {
  PRODUCTS: ["trophies", "recognitions", "promotional", "medals", "impresion"],
  BLOGS: ["blogs"],
  BACKGROUNDS: ["backgrouds"],
};

/**
 * Validates input data against allowed fields
 * @param {Object} data - Input data to validate
 * @param {Array} allowedFields - Allowed field names
 * @returns {Object} Sanitized data object
 */
const sanitizeInput = (data, allowedFields) => {
  return Object.keys(data)
    .filter((key) => allowedFields.includes(key))
    .reduce((obj, key) => {
      obj[key] = typeof data[key] === "string" ? data[key].trim() : data[key];
      return obj;
    }, {});
};

/**
 * Executes a database query with parameters
 * @param {string} sql - SQL query string
 * @param {Array} params - Query parameters
 * @returns {Promise} Database operation promise
 */
const dbQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

/**
 * Eexecutes a query to get all rows
 * @param {string} sql - SQL query string
 * @param {Array} params - Query parameters
 * @returns {Promise} All rows
 */
const dbAll = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

/**
 * Executes a query to get a single row
 * @param {string} sql - SQL query string
 * @param {Array} params - Query parameters
 * @returns {Promise} Single row
 */
const dbGet = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

/**
 * Product Service Module (updated)
 */
const productService = {
  /**
   * Gets all products from a specific category table
   * @param {string} category - Validated category name
   * @returns {Promise} Database results
   */
  getAll: async (category) => {
    const sql = `SELECT * FROM ${category}`;
    return dbAll(sql);
  },

  /**
   * Gets a single product by ID from specific category
   * @param {string} category - Validated category name
   * @param {number} id - Product ID
   * @returns {Promise} Database result
   */
  getById: async (category, id) => {
    const sql = `SELECT * FROM ${category} WHERE id = ?`;
    return dbGet(sql, [id]);
  },

  /**
   * Creates a new product in specified category
   * @param {string} category - Validated category name
   * @param {Object} data - Sanitized product data
   * @returns {Promise} Insert operation result
   */
  create: async (category, data) => {
    const fields = Object.keys(data);
    const sql = `INSERT INTO ${category} (${fields.join()}) VALUES (${fields.map(() => "?").join()})`;
    return dbQuery(sql, Object.values(data));
  },

  /**
   * Updates an existing product
   * @param {string} category - Validated category name
   * @param {number} id - Product ID
   * @param {Object} data - Sanitized product data
   * @returns {Promise} Update operation result
   */
  update: async (category, id, data) => {
    const fields = Object.keys(data);
    const sql = `UPDATE ${category} SET ${fields.map((f) => `${f} = ?`).join()} WHERE id = ?`;
    return dbQuery(sql, [...Object.values(data), id]);
  },

  /**
   * Deletes a product
   * @param {string} category - Validated category name
   * @param {number} id - Product ID
   * @returns {Promise} Delete operation result
   */
  delete: async (category, id) => {
    const sql = `DELETE FROM ${category} WHERE id = ?`;
    return dbQuery(sql, [id]);
  },
};

// Product routes
app
  .route("/products/:category")
  .get(async (req, res) => {
    try {
      if (!ALLOWED_TABLES.PRODUCTS.includes(req.params.category)) {
        return res.status(400).json({ error: "Invalid product category" });
      }
      const results = await productService.getAll(req.params.category);

      res.json({ data: results });
    } catch (err) {
      res.status(500).json({ error: "Database error" });
    }
  })
  .post(upload.single("image"), async (req, res) => {
    try {
      if (!ALLOWED_TABLES.PRODUCTS.includes(req.params.category)) {
        return res.status(400).json({ error: "Invalid product category" });
      }

      const cleanData = sanitizeInput(req.body, SCHEMAS.PRODUCT);
      const result = await productService.create(
        req.params.category,
        cleanData
      );
      res.status(201).json({ id: result.lastID, ...cleanData });
    } catch (err) {
      res.status(500).json({ error: "Product creation failed" });
    }
  });

app
  .route("/products/:category/:id")
  .get(async (req, res) => {
    try {
      if (!ALLOWED_TABLES.PRODUCTS.includes(req.params.category)) {
        return res.status(400).json({ error: "Invalid product category" });
      }

      const product = await productService.getById(
        req.params.category,
        req.params.id
      );
      if (!product) return res.status(404).json({ error: "Product not found" });
      res.json({ data: product });
    } catch (err) {
      res.status(500).json({ error: "Database error" });
    }
  })
  .put(upload.single("image"), async (req, res) => {
    try {
      if (!ALLOWED_TABLES.PRODUCTS.includes(req.params.category)) {
        return res.status(400).json({ error: "Invalid product category" });
      }

      const cleanData = sanitizeInput(req.body, SCHEMAS.PRODUCT);
      const result = await productService.update(
        req.params.category,
        req.params.id,
        cleanData
      );

      if (result.changes === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json({ message: "Product updated" });
    } catch (err) {
      res.status(500).json({ error: "Update failed" });
    }
  })
  .delete(async (req, res) => {
    try {
      if (!ALLOWED_TABLES.PRODUCTS.includes(req.params.category)) {
        return res.status(400).json({ error: "Invalid product category" });
      }

      const result = await productService.delete(
        req.params.category,
        req.params.id
      );

      if (result.changes === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json({ message: "Product deleted" });
    } catch (err) {
      res.status(500).json({ error: "Delete operation failed" });
    }
  });

/**
 * Blog Service Module
 */
const blogService = {
  /**
   * Gets all blog posts
   * @returns {Promise} Database results
   */
  getAll: async () => {
    const sql = `SELECT * FROM blogs`;
    return dbAll(sql);
  },

  /**
   * Gets a single blog post by ID
   * @param {number} id - Blog post ID
   * @returns {Promise} Database result
   */
  getById: async (id) => {
    const sql = `SELECT * FROM blogs WHERE id = ?`;
    return dbGet(sql, [id]);
  },

  /**
   * Creates a new blog post
   * @param {Object} data - Sanitized blog data
   * @returns {Promise} Insert operation result
   */
  create: async (data) => {
    const fields = Object.keys(data);
    const sql = `INSERT INTO blogs (${fields.join()}) VALUES (${fields.map(() => "?").join()})`;
    return dbQuery(sql, Object.values(data));
  },

  /**
   * Updates an existing blog post
   * @param {number} id - Blog post ID
   * @param {Object} data - Sanitized blog data
   * @returns {Promise} Update operation result
   */
  update: async (id, data) => {
    const fields = Object.keys(data);
    const sql = `UPDATE blogs SET ${fields.map((f) => `${f} = ?`).join()} WHERE id = ?`;
    return dbQuery(sql, [...Object.values(data), id]);
  },

  /**
   * Deletes a blog post
   * @param {number} id - Blog post ID
   * @returns {Promise} Delete operation result
   */
  delete: async (id) => {
    const sql = `DELETE FROM blogs WHERE id = ?`;
    return dbQuery(sql, [id]);
  },
};

// Blog routes
app
  .route("/blogs")
  .get(async (req, res) => {
    try {
      const results = await blogService.getAll();
      res.json({ data: results });
    } catch (err) {
      res.status(500).json({ error: "Database error" });
    }
  })
  .post(upload.single("image"), async (req, res) => {
    try {
      const cleanData = sanitizeInput(req.body, SCHEMAS.BLOG);
      cleanData.list = JSON.stringify(cleanData.list); // Handle array data
      const result = await blogService.create(cleanData);
      res.status(201).json({ id: result.lastID, ...cleanData });
    } catch (err) {
      res.status(500).json({ error: "Blog creation failed" });
    }
  });

app
  .route("/blogs/:id")
  .get(async (req, res) => {
    try {
      const blog = await blogService.getById(req.params.id);
      if (!blog) return res.status(404).json({ error: "Blog not found" });
      res.json({ data: blog });
    } catch (err) {
      res.status(500).json({ error: "Database error" });
    }
  })
  .put(upload.single("image"), async (req, res) => {
    try {
      const cleanData = sanitizeInput(req.body, SCHEMAS.BLOG);
      cleanData.list = JSON.stringify(cleanData.list); // Handle array data
      const result = await blogService.update(req.params.id, cleanData);

      if (result.changes === 0) {
        return res.status(404).json({ error: "Blog not found" });
      }

      res.json({ message: "Blog updated" });
    } catch (err) {
      res.status(500).json({ error: "Update failed" });
    }
  })
  .delete(async (req, res) => {
    try {
      const result = await blogService.delete(req.params.id);

      if (result.changes === 0) {
        return res.status(404).json({ error: "Blog not found" });
      }

      res.json({ message: "Blog deleted" });
    } catch (err) {
      res.status(500).json({ error: "Delete operation failed" });
    }
  });

/**
 * Background Service Module
 */
const backgroundService = {
  /**
   * Gets all background colors
   * @returns {Promise} Database results
   */
  getAll: async () => {
    const sql = `SELECT * FROM backgrouds`;
    return dbAll(sql);
  },

  /**
   * Gets a single background color by category
   * @param {string} category - Background category
   * @returns {Promise} Database result
   */
  getByCategory: async (category) => {
    const sql = `SELECT * FROM backgrouds WHERE category = ?`;
    return dbGet(sql, [category]);
  },

  /**
   * Updates an existing background color
   * @param {string} category - Background category
   * @param {string} color - Background color
   * @returns {Promise} Update operation result
   */
  update: async (category, color) => {
    const record = await backgroundService.getByCategory(category);
    if (record) {
      const sql = `UPDATE backgrouds SET color = ? WHERE category = ?`;
      return dbQuery(sql, [color, category]);
    } else {
      const sql = `INSERT INTO backgrouds (category, color) VALUES (?, ?)`;
      return dbQuery(sql, [category, color]);
    }
  },
};

// background routes
app.put("/backgrounds/:category", async (req, res) => {
  const category = req.params.category;
  const { color } = req.body;
  if (!color) {
    return res.status(400).json({ error: "Color is required" });
  }
  // Validar que la categoría pertenezca a la lista de productos permitidos
  if (!ALLOWED_TABLES.PRODUCTS.includes(category)) {
    return res.status(400).json({ error: "Invalid category" });
  }
  try {
    const result = await backgroundService.update(category, color);
    res.json({ message: "Background updated successfully", result });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error updating background", details: err.message });
  }
});

app.get("/backgrounds", async (req, res) => {
  try {
    const results = await backgroundService.getAll();
    res.json({ data: results });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching backgrounds", details: err.message });
  }
});

// const blog = {
//   image,
//   category,
//   title,
//   intrudduction,
//   subtitle1,
//   paragraph1,
//   subtitle2,
//   paragraph2,
//   concl,
//   paragraph3,
// };

const updateBlogIntoDatabase = async (table, data) => {
  // Aqui lo diferente es que agregue la columna image y el parametro data.image para q lo pueda insertar en la debe en el get hay como extraerla
  const sql = `UPDATE ${table} SET title= ?,description= ?,additionalText= ?,subtitle= ?,paragraph= ?,list= ?,phrase= ?,additionalTitle= ?,image= ?,category= ? WHERE id = ?`;
  const params = [
    data.title,
    data.description,
    data.additionalText,
    data.subtitle,
    data.paragraph,
    data.list,
    data.phrase,
    data.additionalTitle,
    data.image,
    data.category,
    data.id,
  ];
  console.log(params);
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        console.error("Error al insertar en la base de datos:", err.message);
        reject({ success: false, error: err.message });
      } else {
        console.log(`Insertado en ${table} con ID: ${this.lastID}`);
        resolve({ success: true, id: this.lastID });
      }
    });
  });
};

app.put("/blog/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  if (!id) {
    return res.status(400).json({ error: "ID y categoría son requeridos" });
  }
  data.id = id;
  const result = await updateBlogIntoDatabase("blogs", data);

  if (result.success) {
    res.status(201).json({ message: "Product Updated" });
  } else {
    res.status(500).json({ message: "Error in update product" });
  }
});

app.delete("/blog/:id", async (req, res) => {
  const { id } = req.params;

  if (!id)
    return res.status(400).json({ error: "ID y categoría son requeridos" });

  db.run("DELETE FROM blogs WHERE id = ?", [id], function (err) {
    if (err) {
      console.error("Error eliminando el producto:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    if (this.changes > 0) {
      res.status(200).json({ message: "Producto eliminado correctamente" });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  });
});

//  Endpoint para verificar las credenciales de admin
app.post("/admin", (req, res) => {
  const { User, password } = req.body;

  if (!User || !password) {
    return res
      .status(400)
      .json({ message: "El usuario y el password son necesarios." });
  }

  const query = "SELECT * FROM admin WHERE user = ?";
  db.get(query, [User], (err, user) => {
    if (err) {
      console.error("Error en la consulta:", err);
      return res.status(500).json({ message: "Error en el servidor" });
    }

    if (!user) {
      return res.status(404).json({ message: "El usuario no existe." });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Credenciales incorrectas." });
    }

    res.json({ message: "Inicio de sesión correcto" });
  });
});

// Endpoint para verificar las credenciales blog
app.post("/blogs", upload.single("image"), (req, res) => {
  const {
    image, // imagen base64
    category, //categoria
    title, // titulo del blog
    description, // introduccion del blog
    additionalTitle, // subtitulo 1
    paragraph, // parrafo 1
    additionalText,
    subtitle,
    list,
    phrase,
  } = req.body;

  const data = {
    title: req.body.title ? req.body.title.trim() : null,
    description: req.body.description ? req.body.description.trim() : null,
    additionalTitle: req.body.additionalText
      ? req.body.additionalText.trim()
      : null,
    additionalText: req.body.additionalText
      ? req.body.additionalText.trim()
      : null,
    phrase: req.body.phrase ? req.body.phrase.trim() : null,
    paragraph: req.body.paragraph ? req.body.paragraph.trim() : null,
    subtitle: req.body.subtitle ? req.body.subtitle.trim() : null,
    list: req.body.list ? req.body.list.trim() : null,
    category: req.body.category ? req.body.category.trim() : null,
    image: req.body.image ? req.body.image : null,
  };
  console.log(data);

  const sql = `INSERT INTO blogs (title, description, additionalTitle,  additionalText, subtitle, paragraph, category, list, phrase, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.run(
    sql,
    [
      title,
      description,
      additionalTitle,
      additionalText,
      subtitle,
      paragraph,
      category,
      JSON.stringify(list),
      phrase,
      image,
    ],
    function (err) {
      if (err) {
        console.error("Error al crear el blog:", err.message);
        return res.status(500).json({ message: "Error al crear el blog" });
      }

      res.status(201).json({
        id: this.lastID,
        title,
        description,
        additionalTitle,
        additionalText,
        subtitle,
        paragraph,
        list,
        phrase,
        category,
        image,
      });
    }
  );
});

app.get("/blogs", (req, res) => {
  const sql =
    "SELECT title, description, additionalTitle, id, additionalText, category, list,subtitle, paragraph, phrase, image FROM blogs";

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(
        "Error al obtener los registros de la tabla blogs:",
        err.message
      );
      res.status(400).json({ error: err.message });
      return;
    }

    if (rows.length === 0) {
      res
        .status(404)
        .json({ message: "No se encontraron registros en la tabla blogs" });
    } else {
      // console.log('Registros de la tabla blogs:', rows);
      res.json({
        message: "success",
        data: rows,
      });
    }
  });
});

app.put("/update-background", async (req, res) => {
  const { category, background } = req.body;

  if (!category || !background) {
    return res.status(400).json({ error: "Categoría y color son requeridos" });
  }

  let sql;
  switch (category) {
    case "trophies":
      sql = "UPDATE trophies SET background = ?";
      break;
    case "recognitions":
      sql = "UPDATE recognitions SET background = ?";
      break;
    case "promotional":
      sql = "UPDATE promotional SET background = ?";
      break;
    case "medals":
      sql = "UPDATE medals SET background = ?";
      break;
    case "impresion":
      sql = "UPDATE impresion SET background = ?";
      break;
    default:
      return res.status(400).json({ error: "Categoría no válida" });
  }

  db.run(sql, [background], function (err) {
    if (err) {
      console.error("Error actualizando el color de fondo:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.status(200).json({ message: "Color actualizado correctamente" });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
