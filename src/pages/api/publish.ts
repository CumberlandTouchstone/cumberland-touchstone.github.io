import type { APIRoute } from "astro";
import fs from "node:fs";
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const contentType = request.headers.get("Content-Type");
  const fail = () => new Response("Missing fields.", { status: 400 });

  if (contentType !== "application/x-www-form-urlencoded")
    return fail();

  const form = await request.formData();

  const title = form.get("title");
  const content = form.get("content");

  if (!title || !content)
    return fail();

  return createPost(title.toString(), content.toString(), redirect);
};

async function createPost(title: string, rawContent: string, redirect: (path: string, status?: any) => Response): Promise<Response> {
  const fileName = title.replace(/[\/|\\:*?"<>\s]/g, "-");
  
  const content = DOMPurify.sanitize(await marked.parse(rawContent));
  const filePath = `out/${fileName}.html`;

  if (fs.existsSync(filePath)) {
    return new Response("Post already exists.", { status: 409 })
  }

  fs.writeFile(filePath, content, err => {
    if (err) {
      console.error(err);
    }
  });

  const metadata = {
    title: title,
  };

  fs.writeFile(filePath + ".json", JSON.stringify(metadata), err => {
    if (err) {
      console.error(err);
    }
  });

  return redirect(`/posts/${fileName}`, 307);
}