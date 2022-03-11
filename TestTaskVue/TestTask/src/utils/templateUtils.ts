import type { Guid } from "guid-typescript";

export function getUniqueItemIdentifier(itemId: "string", identifier: Guid): string{
    return itemId + identifier;
}