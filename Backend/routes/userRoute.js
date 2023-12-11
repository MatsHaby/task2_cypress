const {getUser, createUserPost, updateUserPassword, authenticateUser, deleteUser} = require('../controllers/userController.js');

const getUserOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          password: { type: 'string' },
          email: { type: 'string' }
        },
      },
    },
  },
  handler: getUser
};

const createUserOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'password', 'email'],
      properties: {
        name: { type: 'string' },
        password: { type: 'string' },
        email: { type: 'string' }
      }
    },
    response: {
      201: {
        type: 'object',
        properties: {
          msg: { type: 'string' }
        }
      }
    }
  },
  handler: createUserPost
}

const updateUserPasswordOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['password'],
      properties: {
        email: { type: 'string' },
      }
    },
    response: {
      201: {
        type: 'object',
        properties: {
          msg: { type: 'string' }
        }
      }
    }
  },
  handler: updateUserPassword
}

const authenticateUserOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['password', 'email'],
      properties: {
        password: { type: 'string' },
        email: { type: 'string' },
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          data: {
            id: { type: 'string' },
            name: { type: 'string' },
            password: { type: 'string' },
            email: { type: 'string' }
          }
        },
      },
    },
  },
  handler: authenticateUser
};

const deleteUserOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          msg: { type: 'string' }
        }
      }
    }
  },
  handler: deleteUser
}

const authRoutes = (fastify, options, done) => {

  fastify.post('/api/v1/user', createUserOpts)
  fastify.get('/api/v1/user/:id', getUserOpts)
  fastify.patch('/api/v1/user/:id', updateUserPasswordOpts)
  fastify.post('/api/v1/user/login', authenticateUserOpts)
  fastify.delete('/api/v1/user/:id', deleteUserOpts)

  done()
}

module.exports = authRoutes