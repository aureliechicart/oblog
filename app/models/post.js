const db = require('../database');

/**
 * A entity representing a blog post
 * @typedef {Object} Post
 * @property {number} id
 * @property {string} slug
 * @property {string} title
 * @property {string} excerpt
 * @property {string} content
 * @property {number} categoryId
 */

/**
 * A model representing a blog post
 * @class
 */
class Post {
    /**
     * The Post constructor
     * @param {Object} data - a litteral object with properties that will be copied into the instance
     */
    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

     /**
     * Fetches every post in the database
     * @returns {Array<Post>}
     * @async
     * @static
     */
    static async findAll() {
        const { rows } = await db.query('SELECT * FROM post;');
        // for each row we create a new instance of class Post
        return rows.map(row => new Post(row));
    }

    /**
     * Fetches a single post from the database
     * @param {Number} id 
     * @returns {Post|null} null if no post in the database has this id
     * @async
     * @static
     */
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

    /**
     * Fetches every post with the given category from the database
     * @param {Number} cid - the category id
     * @returns {Array<Post>} can be empty for unpopular categories
     * @static
     * @async
     */
    static async findByCategory(cid) {
        const { rows } = await db.query('SELECT * FROM post WHERE category_id = $1;', [cid]);

        return rows.map(row => new Post(row));
    }


}

module.exports = Post;