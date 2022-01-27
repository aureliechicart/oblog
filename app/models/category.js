const db = require('../database');

/**
 * An entity representing a blog post category
 * @typedef Category
 * @property {Number} id
 * @property {string} route
 * @property {string} label
 */

/**
 * A model representing a blog post category
 * @class
 */
class Category {
    /**
     * The Category constructor
     * @param {Object} data - a litteral object with properties that will be copied into the instance
     */
    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    /**
     * Fetches every category in the database
     * @returns {Array<Category>}
     * @async
     * @static
     */
    static async findAll() {
        const { rows } = await db.query('SELECT * FROM category;');

        // for each row we create a new instance of the Category class 
        return rows.map(row => new Category(row));
    }
}

module.exports = Category;