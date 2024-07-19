import {
  FreshContext,
  Handlers,
  LayoutConfig,
  PageProps,
} from "$fresh/server.ts";

import { setCookie } from "$std/http/cookie.ts";
import { context } from "https://deno.land/x/esbuild@v0.20.2/mod.js";
import Register from "../components/Register.tsx";
import { Contacto, Data } from "../types.ts";
//import jwt from "jsonwebtoken";

export const config: LayoutConfig = {
  skipInheritedLayouts: true,
};

export const handler: Handlers = {
  POST: async (req: Request, ctx: FreshContext<unknown, Data>) => {
    const url = new URL(req.url);
    const headers = new Headers();

    const form = await req.formData();
    const name = form.get("name") || "";
    const email = form.get("email")?.toString() || "";
    const dni = form.get("dni")?.toString() || "";

    const API_URL = Deno.env.get("API_URL");
    if (!API_URL) throw new Error("api_url is not found");

    const response = await fetch("$(API_URL)/contactos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, dni }),
    });

    if (response.status == 404 || response.status == 400) {
      return ctx.render({
        message: "email already used",
      });
    }

    if (response.status == 200) {
      const data: Omit<Contacto, "password"> = await response.json();

      /* const token = jwt.sign(
        { email: data.email, dni: data.dni, name: data.name },
      );

      setCookie(headers, {
        name: "auth",
        value: token,
        sameSite: "Lax",
        domain: url.hostname,
        path: "/",
        secure: true,
      });*/
    }

    headers.set("location", "/contactos");

    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
