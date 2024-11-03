export interface paths {
    "/api/questions/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["questions_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/schema/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description OpenApi3 schema for this API. Format can be selected via content negotiation.
         *
         *     - YAML: application/vnd.oai.openapi
         *     - JSON: application/vnd.oai.openapi+json */
        get: operations["schema_retrieve"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/stats/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["stats_retrieve"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/voices/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["voices_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/voices/{uuid}/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["voices_retrieve"];
        put?: never;
        post?: never;
        delete: operations["voices_destroy"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Analysed: {
            fluency_and_coherence: components["schemas"]["FluencyAndCoherence"];
            lexical_resource: components["schemas"]["LexicalResource"];
            grammatical_range_and_accuracy: components["schemas"]["GrammaticalRange"];
            pronunciation: components["schemas"]["Pronunciation"];
            overall_assessment: components["schemas"]["OverallAssessment"];
        };
        FluencyAndCoherence: {
            /** Format: double */
            band_score: number;
            strengths: string[];
            areas_for_improvement: string[];
            detailed_feedback: string;
        };
        GrammaticalRange: {
            /** Format: double */
            band_score: number;
            structure_analysis: components["schemas"]["StructureAnalysis"];
            detailed_feedback: string;
        };
        LexicalResource: {
            /** Format: double */
            band_score: number;
            vocabulary_analysis: components["schemas"]["VocabularyAnalysis"];
            detailed_feedback: string;
        };
        MainStats: {
            total_duration_s: number;
        };
        OverallAssessment: {
            /** Format: double */
            band_score: number;
            key_strengths: string[];
            priority_improvements: string[];
            summary: string;
        };
        PhoneticAnalysis: {
            /** Format: double */
            clarity_score: number;
            problem_sounds: string[];
            intonation_patterns: string[];
        };
        ProcessedVoice: {
            /** Format: uuid */
            readonly uuid: string;
            /** Format: int64 */
            duration_s?: number;
            text?: string | null;
            /** Format: uri */
            file?: string | null;
            language?: string | null;
            /** Format: date-time */
            readonly created_at: string;
            analysed: components["schemas"]["Analysed"];
        };
        Pronunciation: {
            /** Format: double */
            band_score: number;
            phonetic_analysis: components["schemas"]["PhoneticAnalysis"];
            detailed_feedback: string;
        };
        Question: {
            readonly id: number;
            text: string;
        };
        StructureAnalysis: {
            complex_structures: string[];
            errors: string[];
        };
        VocabularyAnalysis: {
            sophisticated_terms: string[];
            collocations: string[];
            idiomatic_expressions: string[];
        };
        VoiceUploadRequest: {
            /** Format: binary */
            file: File;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    questions_list: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Question"][];
                };
            };
        };
    };
    schema_retrieve: {
        parameters: {
            query?: {
                format?: "json" | "yaml";
                lang?: "af" | "ar" | "ar-dz" | "ast" | "az" | "be" | "bg" | "bn" | "br" | "bs" | "ca" | "ckb" | "cs" | "cy" | "da" | "de" | "dsb" | "el" | "en" | "en-au" | "en-gb" | "eo" | "es" | "es-ar" | "es-co" | "es-mx" | "es-ni" | "es-ve" | "et" | "eu" | "fa" | "fi" | "fr" | "fy" | "ga" | "gd" | "gl" | "he" | "hi" | "hr" | "hsb" | "hu" | "hy" | "ia" | "id" | "ig" | "io" | "is" | "it" | "ja" | "ka" | "kab" | "kk" | "km" | "kn" | "ko" | "ky" | "lb" | "lt" | "lv" | "mk" | "ml" | "mn" | "mr" | "ms" | "my" | "nb" | "ne" | "nl" | "nn" | "os" | "pa" | "pl" | "pt" | "pt-br" | "ro" | "ru" | "sk" | "sl" | "sq" | "sr" | "sr-latn" | "sv" | "sw" | "ta" | "te" | "tg" | "th" | "tk" | "tr" | "tt" | "udm" | "ug" | "uk" | "ur" | "uz" | "vi" | "zh-hans" | "zh-hant";
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/vnd.oai.openapi": {
                        [key: string]: unknown;
                    };
                    "application/yaml": {
                        [key: string]: unknown;
                    };
                    "application/vnd.oai.openapi+json": {
                        [key: string]: unknown;
                    };
                    "application/json": {
                        [key: string]: unknown;
                    };
                };
            };
        };
    };
    stats_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MainStats"];
                };
            };
        };
    };
    voices_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": components["schemas"]["VoiceUploadRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["VoiceUploadRequest"];
                "*/*": components["schemas"]["VoiceUploadRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProcessedVoice"];
                };
            };
        };
    };
    voices_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                uuid: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProcessedVoice"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    voices_destroy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                uuid: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Item deleted */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
