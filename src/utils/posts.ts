export function fixPost(post: any): any {
    post.publishDate = new Date(post.publishDate);

    if (post.updatedDate) post.updatedDate = new Date(post.updatedDate);
    return post;
}

export async function fetchAllPosts(origin: string): Promise<any> {
    const request = await fetch(new URL(`api/read/all.json`, origin), {
        method: "GET",
    });
    
    if (!request.ok)
        return { posts: null, response: request.status }

    const allPosts: any[] = await request.json();
    
    allPosts.forEach((value) => fixPost(value));
    return { posts: allPosts, response: null };
}

export async function fetchPost(ref: string, origin: string): Promise<any | Response> {
    const md = await fetch(new URL(`api/read/${ref}.json`, origin), {
        method: "GET",
    });
    
    if (!md.ok)
        return new Response(null, { status: md.status })
    
    const data = await md.json();
    return fixPost(data);
}