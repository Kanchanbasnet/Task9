/**
 * @swagger
 * tags:
 *      name: Users
 *      description: Operations regarding Users.
 */


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users with pagination.
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page.
 *     responses:
 *       200:
 *         description: Successful response with a list of users.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Users retrieved
 *               data:
 *                 userQueryResult: [ ]
 *                 totalCount: 20
 *                 pageNumber: 1
 *       404:
 *         description: Users not found.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Users Not Found.
 *               data: null
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided details.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response with the created user and authentication token.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User created successfully.
 *               data:
 *                 user:
 *                   id: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6"
 *                   name: John Doe
 *                   email: john.doe@example.com
 *                   username: john_doe
 *                   address: 123 Main St
 *                 token: "your_generated_jwt_token"
 *       409:
 *         description: Conflict response when a user with the provided email or username already exists.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: User with this email already exists.
 *               data: null
 *       500:
 *         description: Internal Server Error response.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error.
 *               data: null
 */
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user with provided username and password.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response with the authentication token.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: null
 *               data:
 *                 Token: "your_generated_jwt_token"
 *       401:
 *         description: Unauthorized response when the provided username or password is incorrect.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Password or username is incorrect.
 *               data: null
 *       500:
 *         description: Internal Server Error response.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error.
 *               data: null
 */


/**
 * @swagger
 * security: 
 *   - BearerAuth: []
 * /api/users/{id}:
 *   get:
 *     summary: Retrieve the user by ID.
 *     description: Retrieve the user by ID and authorization token.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Id of the user to retrieve.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with the user details
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User with the id retrieved.
 *               data:
 *                 id: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6"
 *                 name: Name
 *                 email: email@email.com
 *                 username: username
 *                 address: address
 *       401:
 *         description: Unauthorized- Invalid Token or missing.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Unauthorized- Invalid Token or missing.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error.
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT   
 */



/**
 * @swagger
 * security: 
 *     - BearerAuth: []
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Update a user with the provided ID and details.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update.
 *     security:
 *       - BearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response with the updated user.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User updated successfully.
 *               data:
 *                 id: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6"
 *                 name: Updated Name
 *                 email: updated.email@example.com
 *                 username: updated_username
 *                 address: Updated Address
 *       404:
 *         description: Not Found response when a user with the provided ID is not found.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: User with the id not found.
 *               data: null
 *       417:
 *         description: Expectation Failed response when the update operation fails.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Failed to update user.
 *               data: null
 *       500:
 *         description: Internal Server Error response.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error.
 *               data: null
 * 
 * components:
 *      securitySchemes:
 *          BearerAuth:
 *            type: http
 *            scheme: bearer
 *            bearerFormat: JWT
 */

/**
 * @swagger
 * security:
 *     - BearerAuth: []
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user with the provided ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response indicating the user was deleted.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User deleted successfully.
 *               data: null
 *       404:
 *         description: Not Found response when a user with the provided ID is not found.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: User with the id not found.
 *               data: null
 *       500:
 *         description: Internal Server Error response.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error.
 *               data: null
 * components:
 *     BearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */

  