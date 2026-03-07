import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        s3Options: {
          credentials: {
            accessKeyId: env('MINIO_ACCESS_KEY', 'minioadmin'),
            secretAccessKey: env('MINIO_SECRET_KEY', 'minioadmin'),
          },
          region: env('MINIO_REGION', 'us-east-1'),
          params: {
            Bucket: env('MINIO_BUCKET', 'strapi-uploads'),
          },
          endpoint: env('MINIO_ENDPOINT', 'http://minio:9000'),
          forcePathStyle: true,
        },
        baseUrl: `${env('MINIO_PUBLIC_URL', 'http://localhost:9200')}/${env('MINIO_BUCKET', 'strapi-uploads')}`,
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});

export default config;
