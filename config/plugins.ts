export default ({ env }) => ({
  // Users & Permissions Plugin
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET') || 'aB7fK9mP2xQ5tR8wN1zV4cJ6hG3dS7yE9pL2oI5uF0qT8rX3nM6kZ1vC4bA7d',
      // Add other possible users-permissions configs
      register: {
        allowedRoles: ['public'],
        default_role: 'public',
      },
      email: {
        confirmation_required: false,
      },
    },
  },
  
  // Documentation Plugin (if installed)
  documentation: {
    config: {
      openapi: {
        enabled: false,
      },
    },
  },
  
  // SEO Plugin (if installed)
  seo: {
    config: {
      // Add SEO configs if needed
    },
  },
  
  // Cloud Plugin (if installed)
  'cloud': {
    config: {
      // Add cloud configs if needed
    },
  },
});
