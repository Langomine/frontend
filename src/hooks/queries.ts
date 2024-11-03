import {useMutation, useQuery} from "@tanstack/react-query";
import {api} from "../lib/api/client.ts";

export const useListQuestions = () => {
    return useQuery({
        queryKey: ['questions'],
        queryFn: async () => {
            const {data, error} = await api.GET("/api/questions/")
            if (data) {
                return data;
            }
            throw new Error(error);
        },
    })
}

export const useGetProcessedVoice = (uuid: string) => {
    return useQuery({
        queryKey: ['processed-voice', uuid],
        queryFn: async () => {
            const {data, error} = await api.GET('/api/voices/{uuid}/', {
                params: {
                    path: {
                        uuid: uuid
                    }
                }
            })
            if (data) {
                return data;
            }
            throw new Error(error);
        },
    })
}

export const useCreateVoice = () => {
    return useMutation({
        mutationFn: async (file: File) => {
            const {data, error} = await api.POST("/api/voices/", {
                body: {
                    file: file
                },
                bodySerializer: (body) => {
                    const formData = new FormData();
                    formData.set('file', body.file);
                    return formData;
                }
            })

            if (data) {
                return data;
            }
            throw new Error(error);
        },
    })
}
