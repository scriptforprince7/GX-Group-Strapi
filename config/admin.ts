const getPreviewPathname = (uid, { locale, document }): string | null => {
  const { slug } = document;

  switch (uid) {
    case 'api::page.page': {
      if (slug === 'homepage') {
        return '/';
      }
      return `/${slug}`;
    }
    case 'api::product.product':
      return `/products/${slug}`;
    case 'api::product-page.product-page':
      return '/products';
    case 'api::article.article':
      return `/blog/${slug}`;
    case 'api::blog-page.blog-page':
      return '/blog';
    default:
      return null;
  }
};

export default ({ env }) => {
  const clientUrl = env('CLIENT_URL');
  const previewSecret = env('PREVIEW_SECRET');

  return {
    auth: {
      secret: env('ADMIN_JWT_SECRET') || env('JWT_SECRET') || 'aB7fK9mP2xQ5tR8wN1zV4cJ6hG3dS7yE9pL2oI5uF0qT8rX3nM6kZ1vC4bA7d',
    },
    apiToken: {
      salt: env('API_TOKEN_SALT') || 'bX7fK9mP2xQ5tR8wN1zV4cJ6hG3dS7yE9pL2oI5uF0qT8rX3nM6kZ1vC4bA7d',
    },
    transfer: {
      token: {
        salt: env('TRANSFER_TOKEN_SALT') || 'cY8fL9mP3xQ6tR9wN2zV5cJ7hG4dS8yE0pL3oI6uF1qT9rX4nM7kZ2vC5bA8e',
      },
    },
    flags: {
      nps: env.bool('FLAG_NPS', true),
      promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    },
    preview: {
      enabled: true,
      config: {
        allowedOrigins: [clientUrl],
        async handler(uid, { documentId, locale, status }) {
          const document = await strapi
            .documents(uid)
            .findOne({ documentId, locale, status });
          const pathname = getPreviewPathname(uid, { locale, document });

          // Disable preview if the pathname is not found
          if (!pathname) {
            return null;
          }

          // Use Next.js draft mode
          const urlSearchParams = new URLSearchParams({
            url: `/${locale ?? 'en'}${pathname}`,
            secret: previewSecret,
            status,
          });

          return `${clientUrl}/api/preview?${urlSearchParams}`;
        },
      },
    },
  };
};