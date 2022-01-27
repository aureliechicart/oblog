const db = require('../database');

class Post {
    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    static async findAll() {
        const { rows } = await db.query('SELECT * FROM post;');
        // for each row we create a new instance of class Post
        return rows.map(row => new Post(row));
    }

    static async findOne(id) {
        const { rows } = await db.query('SELECT * FROM post WHERE id = $1;', [id]);
        // we check if a get a result for this post id
        if (rows[0]) {
            // if we get a result, we push it in the class mould
            return new Post(rows[0]);
        } else {
            return null;
        }
    }

    static async findByCategory(cid) {
        const { rows } = await db.query('SELECT * FROM post WHERE category_id = $1;', [cid]);

        return rows.map(row => new Post(row));
    }

    async save() { }

    async delete() { }
}

module.exports = Post;