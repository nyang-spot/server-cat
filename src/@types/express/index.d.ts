/* eslint-disable @typescript-eslint/no-empty-interface */
import { Users } from "@prisma/client";

export {};

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface AuthInfo {}
    export interface Request {
      id: string;
    }
    export interface User extends Users {
      accessToken?: string;
    }

    // namespace Multer {
    //   interface File extends Multer.File {
    //     bucket: string;
    //     key: string;
    //     acl: string;
    //     contentType: string;
    //     contentDisposition: null;
    //     storageClass: string;
    //     serverSideEncryption: null;
    //     metadata: any;
    //     location: string;
    //     etag: string;
    //   }
    // }
  }
}
