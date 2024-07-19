import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { AgendaProps, Contacto, State } from "../types.ts";

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<State, AgendaProps>) => {
    const userId = ctx.state.id;

    const API_URL = Deno.env.get("API_URL");
    if (!API_URL) throw new Error("api_url is not found");

    const response = await fetch("${API_URL}");

    if (response.status == 200) {
      const contactos: Contacto[] = await response.json();

      return (ctx.render({ contactos: contactos, userID: userId }));
    } else {
      return ctx.render();
    }
  },
};

const Page = (props: PageProps<AgendaProps>) => {
  return (
    <div class="contacto-page-container">
      <h1 class="lista-contactos-titulo">Contactos de:</h1>
      <AgendaDisplay
        userID={props.data.userID}
        contactos={props.data.contactos}
      />
    </div>
  );
};

export default Page;
