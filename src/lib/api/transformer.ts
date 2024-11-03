import openapiTS, {astToString} from "openapi-typescript";
import * as path from "node:path";
import {fileURLToPath} from "node:url";
import * as fs from "node:fs";
import { factory } from 'typescript';

const baseDir = path.dirname(fileURLToPath(import.meta.url));

const localPath = new URL(path.resolve(baseDir, './schema.yml'), import.meta.url);

const output = await openapiTS(localPath, {
    transform({ format, nullable }, { path }) {
        if (format !== 'binary' || !path) {
            return;
        }

        // TODO: We're explicitly setting File type - even for json streams
        return nullable
            ? factory.createUnionTypeNode([
                factory.createTypeReferenceNode('File'),
                factory.createTypeReferenceNode('null')
            ])
            : factory.createTypeReferenceNode('File');

        /*

        const typeName = path.includes('multipart~1form-data')
            ? 'File'
            : path.includes('application~1octet-stream')
                ? 'Blob'
                : null;

        if (!typeName) {
            return;
        }

        const node = factory.createTypeReferenceNode(typeName);

        return nullable
            ? factory.createUnionTypeNode([
                node,
                factory.createTypeReferenceNode('null')
            ])
            : node;

         */
    }
});

await fs.promises.writeFile(path.resolve(baseDir, './schema.d.ts'), astToString(output));
