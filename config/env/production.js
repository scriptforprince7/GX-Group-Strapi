export default {
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 1337,
  app: {
    keys: process.env.APP_KEYS?.split(',') || ['Kx9mN2pQ5tR8wV1cJ4hG7dS3yE6fL9oI2uP5zX8qT1rA4bM7kZ0vC3nF6jH9d', 'S5yL8oE2pQ9tR1wV4cJ7kA3mN6fG9dS2xZ5bP8qT1rA4uM7kZ0vC3nF6jH9d'],
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  admin: {
    auth: {
      secret: process.env.JWT_SECRET || 'aB7fK9mP2xQ5tR8wN1zV4cJ6hG3dS7yE9pL2oI5uF0qT8rX3nM6kZ1vC4bA7d',
    },
    url: process.env.STRAPI_URL || '/admin',
  },
  api: {
    rest: {
      defaultLimit: 25,
      maxLimit: 100,
      withCount: true,
    },
  },
};
