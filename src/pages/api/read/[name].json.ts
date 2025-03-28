import type { APIRoute } from "astro";
import fs from "node:fs";

export const prerender = false;

export const GET: APIRoute = async ({ params, request, props }) => {
    const name = params.name;

    const contentPath = `out/${name}.html`;
    const metaPath = contentPath + ".json";

    if (!fs.existsSync(metaPath)) {
        console.log(metaPath);
        return new Response(null, { status: 404 });
    }

    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    const content = fs.readFileSync(contentPath, 'utf8');

    return new Response(JSON.stringify({
        meta: meta, content: content
    }), { status: 200 });
};