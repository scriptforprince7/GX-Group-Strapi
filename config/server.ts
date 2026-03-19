export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS') || ['Kx9mN2pQ5tR8wV1cJ4hG7dS3yE6fL9oI2uP5zX8qT1rA4bM7kZ0vC3nF6jH9d', 'S5yL8oE2pQ9tR1wV4cJ7kA3mN6fG9dS2xZ5bP8qT1rA4uM7kZ0vC3nF6jH9d'],
  },
});
