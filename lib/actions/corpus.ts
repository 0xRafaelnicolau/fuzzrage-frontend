'use server'

import { request } from "@/lib/helpers";
import { Error } from "@/lib/types";

export type Corpus = {
    content: string;
    created_at: string;
    name: string;
    project_id: number;
    corpus_id: string;
    updated_at: string;
}

export type GetCorpusRequest = {
    project_id: string;
    page?: number;
    size?: number;
    sort?: string;
    id?: string;
    name_like?: string;
    created_at_gte?: string;
    created_at_lte?: string;
}

export type GetCorpusResponse = {
    data: Array<{
        attributes: {
            content: string;
            created_at: string;
            name: string;
            project_id: number;
            updated_at: string;
        };
        id: string;
        type: string;
    }>;
    meta: {
        current_page: number,
        per_page: number,
        total: number,
        total_pages: number
    }
}

export async function getCorpus(req: GetCorpusRequest): Promise<{ success: boolean; corpus?: Corpus[]; meta?: GetCorpusResponse['meta']; error?: Error }> {
    const queryParams = new URLSearchParams();

    if (req?.page !== undefined) {
        queryParams.append('page', req.page.toString());
    }
    if (req?.size !== undefined) {
        queryParams.append('size', req.size.toString());
    }
    if (req?.sort) {
        queryParams.append('sort', req.sort);
    }
    if (req?.id) {
        queryParams.append('id', req.id);
    }
    if (req?.name_like) {
        queryParams.append('name_like', req.name_like);
    }
    if (req?.created_at_gte) {
        queryParams.append('created_at_gte', req.created_at_gte);
    }
    if (req?.created_at_lte) {
        queryParams.append('created_at_lte', req.created_at_lte);
    }

    const result = await request(`/v1/projects/${req.project_id}/corpus${queryParams.toString() ? `?${queryParams.toString()}` : ''}`, {
        method: 'GET',
    });

    if (result.success && result.response) {
        try {
            const data: GetCorpusResponse = await result.response.json();

            const corpus: Corpus[] = data.data.map((item) => ({
                content: item.attributes.content,
                created_at: item.attributes.created_at,
                name: item.attributes.name,
                project_id: item.attributes.project_id,
                corpus_id: item.id,
                updated_at: item.attributes.updated_at,
            }));

            return { success: true, corpus, meta: data.meta };
        } catch (error) {
            return { success: false, error: { message: 'Failed to parse corpus response' } };
        }
    }

    return { success: false, error: { message: 'Failed to get corpus' } };
}

export type DeleteCorpusRequest = {
    project_id: string;
    corpus_id: string;
}