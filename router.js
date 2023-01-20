const express = require("express");
const router = express.Router();
const db = require("./dbConnection");
const db2 = require("./dbConnection2");
const { signupValidation, loginValidation } = require("./validation");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", signupValidation, (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
      req.body.email
    )});`,

    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: "User already existed",
        });
      } else {
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err,
            });
          } else {
            // has hashed pw => add to database
            db.query(
              `INSERT INTO users (name, email, password) VALUES ('${
                req.body.name
              }', ${db.escape(req.body.email)}, 
                            ${db.escape(hash)})`,
              (err, result) => {
                if (err) {
                //  throw err;
                  return res.status(400).send({
                    msg: err,
                  });
                }
                return res.status(201).send({
                  msg: "Successfully registered",
                });
              }
            );
          }
        });
      }
    }
  );
});

router.post("/login", loginValidation, (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        //throw err;
        return res.status(400).send({
          msg: err,
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: "Email or password is incorrect!",
        });
      }
      // check password
      bcrypt.compare(req.body.password,result[0]["password"],(bErr, bResult) => {
          // wrong password
          if (bErr) {
            //throw bErr;
            return res.status(401).send({
              msg: "Email or password is incorrect!",
            });
          }
          if (bResult) {
            const token = jwt.sign({ id: result[0].id },"the-super-strong-secrect",{ expiresIn: "1h" });
            db.query(`UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`);
            return res.status(200).send({
              msg: "Logged in!",
              token,
              user: result[0],
            });
          }
          return res.status(401).send({
            msg: "Username or password is incorrect!",
          });
        }
      );
    }
  );
});

router.post("/get-user", signupValidation, (req, res, next) => {
  if (!req.headers.authorization ||!req.headers.authorization.startsWith("Bearer") ||!req.headers.authorization.split(" ")[1]) {
    return res.status(422).json({
      message: "Please provide the token",
    });
  }

  const theToken = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(theToken, "the-super-strong-secrect");
  
    db.query("SELECT * FROM users where id=?",decoded.id,function (error, results, fields) {
      if (error) throw error;
      return res.send({
        data: results,
        message: "Fetch Successfully.",
      });
    });
});

router.get('/runDbDone',(req, res, next)=>{
    db2.query("SELECT * FROM 02_apit_2223_table_01",function (error, results, fields) {
        results.forEach(function(row){
            var sql = "INSERT INTO taxes (start, end, tax) VALUES :params";
            var values = [
                [row['start_one'], row['end_one'], row['tax_one']],
                [row['start_two'], row['end_two'], row['tax_two']],
                [row['start_three'], row['end_three'], row['tax_three']]
            ];
            db2.query(sql, {params:values}, function(err) {
                console.log("inserted "+row['id']+" - "+sql);
            });
        });

        return res.send({
            message: "Fetch Successfully.",
          });

      });
});

router.get('/calculate/:id', function(req, res) {
  

    db2.query("SELECT * FROM taxes where start>="+req.params.id+" order by start LIMIT 1",function (error, results, fields) {
        if (error) throw error;
        return res.send({
          data: results,
          message: "Fetch success"
        });
      });

});

module.exports = router;
