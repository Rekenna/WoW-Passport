import * as contentful from "contentful";

export const client = contentful.createClient({
  space: process.env.REACT_APP_SPACEID,
  accessToken: process.env.REACT_APP_ACCESSTOKEN
});
