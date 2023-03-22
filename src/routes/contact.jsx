//!==============================================
import { FaBeer } from "react-icons/fa";
import { SlEnvolope } from "react-icons/sl";
import { useLoaderData, Form, useFetcher } from "react-router-dom";
import { getContact, updateContact } from "../contacts";
import { AiFillHeart } from "react-icons/ai"; //?lleno======
import { AiOutlineHeart } from "react-icons/ai"; //?vacio======

import { BsGithub } from "react-icons/bs";
import { BsFillEnvelopeAtFill } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsDiscord } from "react-icons/bs";

export async function action({ request, params }) {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { contact };
}
export default function Contact() {
  const { contact } = useLoaderData();

  return (
    <div id="contact">
      <div id="contact__avatar__and_edits">
        <img
          id="contact__avatar__image"
          key={contact.avatar}
          src={contact.avatar || null}
        />
        <div id="Contact__Edit__AND__Delete">
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Confirme que desea eliminar este registro.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
      <div id="contact__dates">
        <h1 className="name__contact">
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        <div id="contact__links__navegation__media__social">
          {contact.twitter && (
            <p
              className="links__contactos__contact"
              id="contact__link__Twitter"
            >
              <a
                className="contact__links"
                target="_blank"
                href={`https://twitter.com/${contact.twitter}`}
              >
                <p className="icon__pacleholder__orems">
                  <BsTwitter />
                </p>
                <div>{contact.twitter}</div>
              </a>
            </p>
          )}
          {contact.Github && (
            <p className="links__contactos__contact" id="contact__link__Github">
              <a
                className="contact__links"
                target="_blank"
                href={`https://github.com/${contact.Github}`}
              >
                <p className="icon__pacleholder__orems">
                  <BsGithub />
                </p>
                <div>{contact.Github}</div>
              </a>
            </p>
          )}
          {contact.Gmail && (
            <p className="links__contactos__contact" id="contact__link__Gmail">
              <a
                className="contact__links"
                target="_blank"
                href={`{contact.Gmail}`}
              >
                <p className="icon__pacleholder__orems">
                  <BsFillEnvelopeAtFill />
                </p>
                <div>{contact.Gmail}</div>
              </a>
            </p>
          )}
          {contact.Discord && (
            <p
              className="links__contactos__contact"
              id="contact__link__Discordr"
            >
              <a
                className="contact__links"
                target="_blank"
                href={`{contact.Discord}`}
              >
                <p className="icon__pacleholder__orems">
                  <BsDiscord />
                </p>
                <div>{contact.Discord}</div>
              </a>
            </p>
          )}
        </div>
      </div>
      <div id="contact__lorem__and__tasks">
        <div id="Contact__Text__Lorem">
          {contact.notes && <p className="parrafo__contact">{contact.notes}</p>}
        </div>
        <div id="Contact__Text__Task">
          <div className="text__task__contact">
            <h2>tareas</h2>
          </div>
          <ul>
            {contact.task && <li className="contact__tasks">{contact.task}</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  const fetcher = useFetcher();
  // yes, this is a `let` for later
  let favorite = contact.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }
  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "⭐" : "⭐"}
      </button>
    </fetcher.Form>
  );
}
