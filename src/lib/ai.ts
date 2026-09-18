import { DEFAULT_REPLY } from './processing';
export interface AIService { generateReply(input:{content:string; configuredReply:string}):Promise<string>; classify?(content:string):Promise<{priority:'low'|'normal'|'high'; spam:boolean}>; }
export const fixedReplyService:AIService={async generateReply({configuredReply}){return configuredReply||DEFAULT_REPLY;}};
