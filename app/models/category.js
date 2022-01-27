const db = require('../database');

class Category {
    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    static async findAll() {
        const { rows } = await db.query('SELECT * FROM category;');

        // for each row we create a new instance of the Category class 
        return rows.map(row => new Category(row));
    }
}

module.exports = Category;