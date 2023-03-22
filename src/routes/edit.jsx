import {
  Form,
  useFetcher,
  useLoaderData,
  redirect,
  useNavigate,
} from "react-router-dom";

import { updateContact } from "../contacts";
import { BsGithub } from "react-icons/bs";
import { BsFillEnvelopeAtFill } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsDiscord } from "react-icons/bs";

export async function action({ request, params }) {
  const formData = await request.formData();
  const firstName = formData.get("first");
  const lastName = formData.get("last");
  const updates = Object.fromEntries(formData);
  updates.first; // "Some"
  updates.last; // "Name"
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact() {
  const { contact } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div id="container__contact__form">
      <Form method="post" id="contact-form">
        <p>
          <span>Name</span>
          <input
            placeholder="Nombre"
            aria-label="First name"
            type="text"
            name="first"
            defaultValue={contact.first}
          />
          <input
            placeholder="Apellido"
            aria-label="Last name"
            type="text"
            name="last"
            defaultValue={contact.last}
          />
        </p>
        <label>
          <span>
            <BsTwitter />
            Twitter
          </span>
          <input
            type="text"
            name="twitter"
            placeholder="@example"
            defaultValue={contact.twitter}
          />
        </label>
        <label>
          <span>
            <BsGithub />
            Github
          </span>
          <input
            type="text"
            name="Github"
            placeholder="Name_example"
            defaultValue={contact.Github}
          />
        </label>
        <label>
          <span>
            <BsFillEnvelopeAtFill />
            Gmail
          </span>
          <input
            type="text"
            name="Gmail"
            placeholder="https://gmail.com/example"
            defaultValue={contact.Gmail}
          />
        </label>
        <label>
          <span>
            <BsDiscord />
            Discord
          </span>
          <input
            type="text"
            name="Discord"
            placeholder="https://discord.com/example"
            defaultValue={contact.Discord}
          />
        </label>
        <label>
          <span>Avatar URL</span>
          <input
            placeholder="https://example.com/avatar.jpg"
            aria-label="Avatar URL"
            type="text"
            name="avatar"
            defaultValue={contact.avatar}
          />
        </label>
        <label>
          <span>Notes</span>
          <textarea name="notes" defaultValue={contact.notes} rows={6} />
        </label>

        <p>
          <button type="submit">Save</button>
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </button>
        </p>
      </Form>
    </div>
  );
}
