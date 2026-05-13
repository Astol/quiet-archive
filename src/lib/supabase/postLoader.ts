import type { Loader } from 'astro/loaders';
import { z } from 'astro/zod';
import { supabaseBuild } from '~/lib/supabase/build';

type SupabasePostRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body_markdown: string | null;
  status: 'draft' | 'private' | 'published' | 'archived';
  published_at: string | null;
  updated_at: string | null;
  cover_image_url: string | null;
  category: string | null;
  tags: string[] | null;
};

export const supabasePostSchema = z.object({
  publishDate: z.date().optional(),
  updateDate: z.date().optional(),
  draft: z.boolean().optional(),
  title: z.string(),
  excerpt: z.string().optional(),
  cover_image_url: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  slug: z.string(),
  status: z.enum(['draft', 'private', 'published', 'archived']),
});

function toDate(value: string | null): Date | undefined {
  return value ? new Date(value) : undefined;
}

export function supabasePostsLoader(): Loader {
  return {
    name: 'supabase-posts',

    async load({ store, parseData, renderMarkdown, logger }) {
      logger.info('Loading posts from Supabase');

      const { data, error } = await supabaseBuild
        .from('posts')
        .select(
          [
            'id',
            'title',
            'slug',
            'excerpt',
            'body_markdown',
            'status',
            'published_at',
            'updated_at',
            'cover_image_url',
            'category',
            'tags',
          ].join(',')
        )
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) {
        throw new Error(`Could not load Supabase posts: ${error.message}`);
      }

      store.clear();

      for (const post of (data ?? []) as SupabasePostRow[]) {
        const entryId = post.slug;
        console.log(`Processing post -----> ${post.tags?.join(', ') || 'No tags'} (ID: ${entryId})`);
        const parsedData = await parseData({
          id: entryId,
          data: {
            title: post.title,
            slug: post.slug,
            status: post.status,
            excerpt: post.excerpt ?? undefined,
            cover_image_url: post.cover_image_url ?? undefined,
            category: post.category ?? undefined,
            tags: post.tags ?? [],
            publishDate: toDate(post.published_at),
            updateDate: toDate(post.updated_at),
            draft: post.status !== 'published',
          },
        });

        store.set({
          id: entryId,
          data: parsedData,
          rendered: await renderMarkdown(post.body_markdown ?? ''),
        });
      }

      logger.info(`Loaded ${data?.length ?? 0} published posts from Supabase`);
    },
  } satisfies Loader;
}
