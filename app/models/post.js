const db = require('../database');

/**
 * A entity representing a blog post
 * @typedef Post
 * @property {number} id
 * @property {string} slug
 * @property {string} title
 * @property {string} excerpt
 * @property {string} content
 * @property {string} category
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
        // here we use the 'post_with_category' view to add the category name in results (post.category)
        const { rows } = await db.query('SELECT * FROM post_with_category;');
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
        const { rows } = await db.query('SELECT * FROM post_with_category WHERE id = $1;', [id]);
        // we check if a get a result for this post id
        if (rows[0]) {
            // if we get a result, we push it in the class mould
            return new Post(rows[0]);
        } else {
            return null;
        }
    }

    /**
     * Fetches every post with the given category id from the database
     * @param {Number} cid - the category id
     * @returns {Array<Post>} can be empty for unpopular categories
     * @static
     * @async
     */
    static async findByCategory(cid) {
        const { rows } = await db.query('SELECT * FROM post_with_category WHERE category_id = $1;', [cid]);

        return rows.map(row => new Post(row));
    }

    /**
     * Fetches every post with the given category name from the database
     * @param {Number} cname - the category name
     * @returns {Array<Post>} can be empty for unpopular categories
     * @static
     * @async
     */
    static async findByCategoryName(cname) {
        const { rows } = await db.query('SELECT * FROM post_with_category WHERE category = $1;', [cname]);

        return rows.map(row => new Post(row));
    }

    /**
      * Inserts a new post in the DB or updates the database if the record alredy exists.
      * 
      * @async
      * @function save
      * @returns [Array] Instances of the class Post.
      * @throws {Error} a potential SQL error.
      */
    async save() {
        if (this.id) {
            // PUT route
            await db.query('UPDATE "post" SET slug = $1, title = $2, excerpt = $3, content = $4, category_id = $5  WHERE id = $6;', [
                this.slug,
                this.title,
                this.excerpt,
                this.content,
                this.category_id,
                this.id
            ]);
        } else {
            try {
                // POST route
                const { rows } = await db.query('INSERT INTO "post" (slug, title, content, excerpt, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING id;', [
                    this.slug,
                    this.title,
                    this.content,
                    this.excerpt,
                    this.category_id
                ]);

                // Thanks to the RETURNING mention in the SQL query, we can return the newly assigned ID
                this.id = rows[0].id;
                return this.id;
            } catch (err) {
                throw new Error(err.detail);
            }
        }
    }
}


module.exports = Post;