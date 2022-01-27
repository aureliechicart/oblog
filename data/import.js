require('dotenv').config();

const posts = require('./posts.json');
const categories = require('./routes.json');

const db = require('../app/database');

// IIFE
// Immediately Invoked Function Expression
(async () => {
    // deleting preexisting data to avoid conflicts
    await db.query('DELETE FROM post;');
    await db.query('DELETE FROM category;');

    const categoryIds = {};

    // inserting categories
    for (const category of categories) {
        const { rows } = await db.query('INSERT INTO category (route, label) VALUES ($1, $2) RETURNING id;', [category.route, category.label]);
        categoryIds[category.label] = rows[0].id;
    }

    for (const post of posts) {
        post.categoryId = categoryIds[post.category];

        await db.query(`
        INSERT INTO post (title, slug, content, excerpt, category_id)
        VALUES ($1, $2, $3, $4, $5);
        `, [
            post.title,
            post.slug,
            post.content,
            post.excerpt,
            post.categoryId
        ]);
    }

    console.log('done!');

})();