import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET: () => {
    return new Response(null, {
      status: 303,
      headers: { location: "/contactos" },
    });
  },
};
