export default ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET') || 'aB7fK9mP2xQ5tR8wN1zV4cJ6hG3dS7yE9pL2oI5uF0qT8rX3nM6kZ1vC4bA7d',
    },
  },
});
