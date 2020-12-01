import { Application } from 'express';
import * as cors from 'cors';

export async function setCors(app: Application) {
  const whitelist = ['https://bonairecovidmonitor.azurewebsites.net'];

  const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };

  app.use(cors(corsOptions));
}
