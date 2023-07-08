import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { currentUser } from '@clerk/nextjs';

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .middleware(async req => {
      const user = await currentUser();

      if (!user) throw new Error('Unauthorized');

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId);
      console.log('file url', file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
