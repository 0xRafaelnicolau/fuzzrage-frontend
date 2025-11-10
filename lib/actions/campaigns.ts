'use server'

import { request } from "@/lib/helpers";
import { Error } from "@/lib/types";
import { revalidatePath } from "next/cache";


export type Campaign = {
    id: string;
    type: string;
    attributes: {
        created_at: string;
        project_id: number;
        result: {
            cov_percentage: number;
            props_failed: string;
            props_failed_count: number;
            props_passed: string;
            props_passed_count: number;
            props_tested: string;
            props_tested_count: number;
            status: string;
            total_duration: number;
        },
        settings: {
            corpus: {
                dst_id: string;
                reused: boolean;
                saved: boolean;
                src_id: string;
            },
            execution: {
                branch: string;
                config: string;
                contract_name: string;
                duration: number;
                entry_point: string;
            }
        },
        state: string;
        updated_at: string;
    },
}

export type CreateCampaignRequest = {
    project_id: string;
    branch: string;
    config_id: number;
    contract_name: string;
    duration: number;
    entry_point: string;
    corpus_reused?: boolean;
    corpus_saved?: boolean;
    src_corpus_id?: string;
    dst_corpus_name?: string
}

export type CreateCampaignResponse = {
    data: {
        attributes: {
            created_at: string;
            project_id: number;
            result: {
                cov_percentage: number;
                props_failed: string;
                props_failed_count: number;
                props_passed: string;
                props_passed_count: number;
                props_tested: string;
                props_tested_count: number;
                status: string;
                total_duration: number;
            },
            settings: {
                corpus: {
                    dst_id: string;
                    reused: boolean;
                    saved: boolean;
                    src_id: string;
                },
                execution: {
                    branch: string;
                    config: string;
                    contract_name: string;
                    duration: number;
                    entry_point: string;
                }
            },
            state: string;
            updated_at: string;
        },
        id: string;
        type: string;
    }
}

export async function createCampaign(req: CreateCampaignRequest): Promise<{ success: boolean; campaign?: Campaign; error?: Error }> {
    const result = await request(`/v1/projects/${req.project_id}/campaigns`, {
        method: 'POST',
        body: JSON.stringify({
            data: {
                attributes: {
                    branch: req.branch,
                    config_id: req.config_id,
                    contract_name: req.contract_name,
                    duration: req.duration,
                    entry_point: req.entry_point,
                    corpus_reused: req.corpus_reused,
                    corpus_saved: req.corpus_saved,
                    src_corpus_id: req.src_corpus_id,
                    dst_corpus_name: req.dst_corpus_name
                }
            }
        })
    })


    if (result.success && result.response) {
        try {
            const data: CreateCampaignResponse = await result.response.json()

            const campaign: Campaign = {
                id: data.data.id,
                type: data.data.type,
                attributes: {
                    created_at: data.data.attributes.created_at,
                    project_id: data.data.attributes.project_id,
                    result: data.data.attributes.result,
                    settings: data.data.attributes.settings,
                    state: data.data.attributes.state,
                    updated_at: data.data.attributes.updated_at
                }
            }

            return { success: true, campaign }
        } catch {
            return { success: false, error: { message: 'Failed to parse create campaign data' } }
        }
    }

    return { success: false, error: result.error }
}

export type GetCampaignsRequest = {
    project_id: string;
    page?: number;
    size?: number;
    sort?: string;
    state_in?: string;
    created_at_gte?: string;
    created_at_lte?: string;
}

export type GetCampaignsResponse = {
    data: Array<{
        attributes: {
            created_at: string;
            project_id: number;
            result: {
                cov_percentage: number;
                props_failed: string;
                props_failed_count: number;
                props_passed: string;
                props_passed_count: number;
                props_tested: string;
                props_tested_count: number;
                status: string;
                total_duration: number;
            },
            settings: {
                corpus: {
                    dst_id: string;
                    reused: boolean;
                    saved: boolean;
                    src_id: string;
                },
                execution: {
                    branch: string;
                    config: string;
                    contract_name: string;
                    duration: number;
                    entry_point: string;
                }
            },
            state: string;
            updated_at: string;
        },
        id: string;
        type: string;
    }>
    meta: {
        current_page: number;
        per_page: number;
        total: number;
        total_pages: number;
    }
}

export async function getCampaigns(req: GetCampaignsRequest): Promise<{ success: boolean; campaigns?: Campaign[]; meta?: GetCampaignsResponse['meta']; error?: Error }> {
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
    if (req?.state_in) {
        queryParams.append('state_in', req.state_in);
    }
    if (req?.created_at_gte) {
        queryParams.append('created_at_gte', req.created_at_gte);
    }
    if (req?.created_at_lte) {
        queryParams.append('created_at_lte', req.created_at_lte);
    }

    const result = await request(`/v1/projects/${req.project_id}/campaigns${queryParams.toString() ? `?${queryParams.toString()}` : ''}`, {
        method: 'GET',
    })

    if (result.success && result.response) {
        try {
            const data: GetCampaignsResponse = await result.response.json()

            const campaigns: Campaign[] = data.data.map(item => ({
                id: item.id,
                type: item.type,
                attributes: {
                    created_at: item.attributes.created_at,
                    project_id: item.attributes.project_id,
                    result: item.attributes.result,
                    settings: item.attributes.settings,
                    state: item.attributes.state,
                    updated_at: item.attributes.updated_at
                }
            }))

            return { success: true, campaigns, meta: data.meta }
        } catch {
            return { success: false, error: { message: 'Failed to parse get campaigns data' } }
        }
    }

    return { success: false, error: result.error }
}

export type GetCampaignRequest = {
    project_id: string;
    campaign_id: string;
}

export type GetCampaignResponse = {
    data: {
        attributes: {
            created_at: string;
            project_id: number;
            result: {
                cov_percentage: number;
                props_failed: string;
                props_failed_count: number;
                props_passed: string;
                props_passed_count: number;
                props_tested: string;
                props_tested_count: number;
                status: string;
                total_duration: number;
            },
            settings: {
                corpus: {
                    dst_id: string;
                    reused: boolean;
                    saved: boolean;
                    src_id: string;
                },
                execution: {
                    branch: string;
                    config: string;
                    contract_name: string;
                    duration: number;
                    entry_point: string;
                }
            },
            state: string;
            updated_at: string;
        },
        id: string;
        type: string;
    }
}

export async function getCampaign(req: GetCampaignRequest): Promise<{ success: boolean; campaign?: Campaign; error?: Error }> {
    const result = await request(`/v1/projects/${req.project_id}/campaigns/${req.campaign_id}`, {
        method: 'GET',
    })

    if (result.success && result.response) {
        try {
            const data: GetCampaignResponse = await result.response.json()

            const campaign: Campaign = {
                id: data.data.id,
                type: data.data.type,
                attributes: {
                    created_at: data.data.attributes.created_at,
                    project_id: data.data.attributes.project_id,
                    result: data.data.attributes.result,
                    settings: data.data.attributes.settings,
                    state: data.data.attributes.state,
                    updated_at: data.data.attributes.updated_at
                }
            }

            return { success: true, campaign }

        } catch {
            return { success: false, error: { message: 'Failed to parse get campaign data' } }
        }
    }

    return { success: false, error: result.error }
}

export type CancelCampaignRequest = {
    project_id: string;
    campaign_id: string;
}

export async function cancelCampaign(req: CancelCampaignRequest): Promise<{ success: boolean; error?: Error }> {
    const result = await request(`/v1/projects/${req.project_id}/campaigns/${req.campaign_id}/cancel`, {
        method: 'POST',
    })

    if (result.success && result.response) {
        revalidatePath(`/project/${req.project_id}/campaigns`)
        revalidatePath(`/project/${req.project_id}/campaign/${req.campaign_id}`)

        return { success: true }
    }

    return { success: false, error: result.error }
}