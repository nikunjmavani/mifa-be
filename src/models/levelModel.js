const { isEmpty } = require("lodash");
const { structuredWhere } = require("../helpers/commonFunction");
exports.create = async data => {
  let level = [];
  for (var i in data) {
    level.push({ [i]: data[i] });
  }
  // console.log(level);
  return await db.query(`INSERT INTO levels SET ? `, data);
};

exports.find = async (
  where = {},
  orderBy = "order by created_at asc",
  gropuBy = ""
) => {
  let filterdWhere = "";
  let condition = [];

  if (!isEmpty(where)) {
    filterdWhere = "where ";

    for (let i in Object.keys(where)) {
      condition.push(` ${Object.keys(where)[i]}="${Object.values(where)[i]}" `);
    }
  }
  filterdWhere += condition.length > 0 ? condition.join("and") : filterdWhere;
  // console.log(">>>>>>", filterdWhere);
  // let query;
  return await db.query(
    `SELECT * FROM levels ${filterdWhere} ${orderBy} ${gropuBy}`
  );
};

exports.findOne = async (
  where,
  orderBy = "order by created_at desc",
  gropuBy = ""
) => {
  let condition = [];
  let filterdWhere = "";
  for (let i in Object.keys(where)) {
    condition.push(` ${Object.keys(where)[i]}="${Object.values(where)[i]}" `);
  }
  filterdWhere = condition.length > 0 ? condition.join("and") : filterdWhere;
  return await db.query(
    `SELECT * FROM levels where ${filterdWhere} ${gropuBy} ${gropuBy}`
  );
};

exports.update = async (where, data) => {
  let condition = [];
  let filterdWhere = "";
  for (let i in Object.keys(where)) {
    condition.push(` ${Object.keys(where)[i]}="${Object.values(where)[i]}" `);
  }
  filterdWhere = condition.length > 0 ? condition.join("and") : filterdWhere;
  let level = [];
  for (var i in data) {
    level.push(`${i}="${data[i]}"`);
  }
  data = level.join();
  return await db.query(`UPDATE levels SET ${data} where ${filterdWhere}`);
};

exports.remove = async id => {
  // let filterdWhere = structuredWhere(where);

  return await db.query(`DELETE FROM levels where id = ${id}`);
};
