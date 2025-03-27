import type { APIRoute } from "astro";
import fs from "node:fs";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
    const metas = fs.readdirSync("out")
        .filter(file => file.endsWith(".json"))
        .map((name) => fs.readFileSync(`out/${name}`, 'utf-8'))
        .map((raw) => JSON.parse(raw));

    return new Response(JSON.stringify([
        ...metas
    ]), { status: 200 });
};