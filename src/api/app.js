const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");

// 数据库连接配置
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "jack12345",
  database: "htglxm",
};

let pool;

async function initDB() {
  pool = await mysql.createPool(dbConfig);
  console.log("Database connected");
}

initDB().catch(console.error);

// 中间件
app.use(cors());
app.use(express.json());
// 使用 body-parser 中间件来解析 JSON 格式的请求体
app.use(bodyParser.json());

// 路由处理
app.get("/users", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM people");
    res.json({
      statusCode: 200, // HTTP状态码
      status: "success", // 自定义状态消息
      data: rows, // 返回的数据
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/users/create", async (req, res) => {
  try {
    const { name, age, gender, birthdate, address } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO people (name, age, gender, birthdate, address) VALUES (?, ?, ?, ?, ?)",
      [name, age, gender, birthdate, address]
    );

    // res.send({ id: rows.insertId, ...req.body }); // 注意：实际项目中不应直接返回用户输入的敏感信息
    res.json({
      statusCode: 200, // HTTP状态码
      status: "success", // 自定义状态消息
      data: rows, // 返回的数据
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// 更新数据
app.post("/users/updata", async (req, res) => {
  const { id, name, age, gender, birthdate, address } = req.body;
  if (!id || !name || !age || !gender || !birthdate || !address) {
    return res.status(400).send("Missing required fields");
  }
  try {
    await pool.query(
      "UPDATE people SET name = ?, age = ?, gender = ?, birthdate = ?, address = ? WHERE id = ?",
      [name, age, gender, birthdate, address, id]
    );
    // res.sendStatus(204);
    res.json({
      statusCode: 200, // HTTP状态码
      status: "success", // 自定义状态消息
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/users/delete", async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send("Missing required field: id");
  }
  try {
    await pool.query("DELETE FROM people WHERE id = ?", [id]);
    // res.sendStatus(204);
    res.json({
      statusCode: 200, // HTTP状态码
      status: "success", // 自定义状态消息
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// app.get('/user/:id', (req, res) => {
//   const { id } = req.params; // 从路由参数中获取id
//   // 使用id进行数据库查询等操作
//   res.send(`User ID: ${id}`);
// });
// 如果你发送请求到/user/123，req.params.id将会是123

// 搜索用户接口
app.get("/users/search", async (req, res) => {
  try {
    const { name } = req.query; // 从查询参数中获取username
    const [rows] = await pool.query("SELECT * FROM people WHERE name LIKE ?", [
      `%${name}%`,
    ]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// 登录接口
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ success: false, message: "用户名和密码不能为空" });
  }

  try {
    // 执行查询以获取用户信息
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (rows.length === 0) {
      return res.status(401).send({ success: false, message: "用户名不存在" });
    }

    const user = rows[0];

    // 验证密码 这里使用简单比较法，因为现在还没有注册接口
    const isMatch = password === user.password ? true : false;
    // const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ success: false, message: "密码错误" });
    }

    // // 登录成功，返回用户信息（实际中可能返回JWT令牌等）
    // res.send({
    //   success: true,
    //   message: "登录成功",
    //   user: { id: user.id, username: user.username },
    // });
    // 如果密码匹配，生成JWT并返回
    const token = jwt.sign({ userId: user.id }, "your_secret_key", {
      expiresIn: "1h",
    });
    res.json({
      success: true,
      message: "登录成功",
      user: { id: user.id, username: user.username },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "服务器错误" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
